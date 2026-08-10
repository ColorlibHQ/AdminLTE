/*!
 * AdminLTE v4.3.1 (https://adminlte.io)
 * Copyright 2014-2026 Colorlib <https://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.adminlte = {}));
})(this, (function (exports) { 'use strict';

    const lifecycleCallbacks = [];
    const lifecycleState = {
        controller: new AbortController(),
        hasInitialized: false,
        isReplaying: false
    };
    const getLifecycleSignal = () => lifecycleState.controller.signal;
    const runLifecycleCallbacks = () => {
        if (lifecycleState.hasInitialized) {
            return;
        }
        lifecycleState.hasInitialized = true;
        lifecycleState.isReplaying = true;
        try {
            for (const callback of lifecycleCallbacks) {
                callback();
            }
        }
        finally {
            lifecycleState.isReplaying = false;
        }
    };
    const onDOMContentLoaded = (callback) => {
        lifecycleCallbacks.push(callback);
        if (lifecycleState.hasInitialized) {
            callback();
        }
    };
    const teardown = () => {
        lifecycleState.controller.abort();
        lifecycleState.controller = new AbortController();
        lifecycleState.hasInitialized = false;
    };
    const initialize = () => {
        if (lifecycleState.isReplaying) {
            return;
        }
        teardown();
        runLifecycleCallbacks();
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    }
    else {
        runLifecycleCallbacks();
    }
    document.addEventListener('turbo:before-render', teardown);
    document.addEventListener('turbo:load', runLifecycleCallbacks);
    const slideTimers = new WeakMap();
    const cancelSlide = (target) => {
        const timers = slideTimers.get(target) ?? [];
        for (const timer of timers) {
            globalThis.clearTimeout(timer);
        }
        slideTimers.delete(target);
    };
    const clearSlideStyles = (target) => {
        for (const property of ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom', 'overflow', 'transition-duration', 'transition-property']) {
            target.style.removeProperty(property);
        }
    };
    const slideUp = (target, duration = 500) => {
        cancelSlide(target);
        if (duration <= 1) {
            target.style.display = 'none';
            clearSlideStyles(target);
            return;
        }
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = `${duration}ms`;
        target.style.boxSizing = 'border-box';
        target.style.height = `${target.offsetHeight}px`;
        target.style.overflow = 'hidden';
        const stepTimer = globalThis.setTimeout(() => {
            target.style.height = '0';
            target.style.paddingTop = '0';
            target.style.paddingBottom = '0';
            target.style.marginTop = '0';
            target.style.marginBottom = '0';
        }, 1);
        const cleanupTimer = globalThis.setTimeout(() => {
            target.style.display = 'none';
            clearSlideStyles(target);
            slideTimers.delete(target);
        }, duration);
        slideTimers.set(target, [stepTimer, cleanupTimer]);
    };
    const slideDown = (target, duration = 500) => {
        cancelSlide(target);
        clearSlideStyles(target);
        target.style.removeProperty('display');
        let { display } = globalThis.getComputedStyle(target);
        if (display === 'none') {
            display = 'block';
        }
        target.style.display = display;
        if (duration <= 1) {
            return;
        }
        const height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = '0';
        target.style.paddingTop = '0';
        target.style.paddingBottom = '0';
        target.style.marginTop = '0';
        target.style.marginBottom = '0';
        const stepTimer = globalThis.setTimeout(() => {
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = `${duration}ms`;
            target.style.height = `${height}px`;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
        }, 1);
        const cleanupTimer = globalThis.setTimeout(() => {
            clearSlideStyles(target);
            slideTimers.delete(target);
        }, duration);
        slideTimers.set(target, [stepTimer, cleanupTimer]);
    };

    const CLASS_NAME_HOLD_TRANSITIONS = 'hold-transition';
    const CLASS_NAME_APP_LOADED = 'app-loaded';
    class Layout {
        _element;
        _holdTransitionTimer;
        constructor(element) {
            this._element = element;
            this._holdTransitionTimer = undefined;
        }
        holdTransition(time = 100) {
            if (this._holdTransitionTimer) {
                clearTimeout(this._holdTransitionTimer);
            }
            document.body.classList.add(CLASS_NAME_HOLD_TRANSITIONS);
            this._holdTransitionTimer = setTimeout(() => {
                document.body.classList.remove(CLASS_NAME_HOLD_TRANSITIONS);
            }, time);
        }
    }
    onDOMContentLoaded(() => {
        const layout = new Layout(document.body);
        window.addEventListener('resize', () => layout.holdTransition(200), { signal: getLifecycleSignal() });
        setTimeout(() => {
            document.body.classList.add(CLASS_NAME_APP_LOADED);
        }, 400);
    });

    const componentRegistry = new WeakMap();
    class BaseComponent {
        static get NAME() {
            throw new Error('Component subclasses must override the static NAME getter.');
        }
        static get DATA_KEY() {
            return `lte.${this.NAME}`;
        }
        static _getInstance(element) {
            if (!element) {
                return null;
            }
            return componentRegistry.get(element)?.get(this.DATA_KEY) ?? null;
        }
        _element;
        constructor(element) {
            this._element = element;
            const instances = componentRegistry.get(element) ?? new Map();
            componentRegistry.set(element, instances);
            instances.set(this.constructor.DATA_KEY, this);
        }
        dispose() {
            const instances = componentRegistry.get(this._element);
            instances?.delete(this.constructor.DATA_KEY);
            if (instances?.size === 0) {
                componentRegistry.delete(this._element);
            }
        }
    }
    const dispatchCustomEvent = (element, name, options = {}) => {
        const event = new CustomEvent(name, {
            bubbles: true,
            cancelable: options.cancelable ?? false,
            detail: options.detail
        });
        element.dispatchEvent(event);
        return event;
    };

    const NAME$5 = 'card-widget';
    const EVENT_KEY$6 = `.lte.${NAME$5}`;
    const EVENT_COLLAPSE$2 = `collapse${EVENT_KEY$6}`;
    const EVENT_EXPAND$1 = `expand${EVENT_KEY$6}`;
    const EVENT_REMOVE = `remove${EVENT_KEY$6}`;
    const EVENT_COLLAPSED$3 = `collapsed${EVENT_KEY$6}`;
    const EVENT_EXPANDED$2 = `expanded${EVENT_KEY$6}`;
    const EVENT_REMOVED = `removed${EVENT_KEY$6}`;
    const EVENT_MAXIMIZED$1 = `maximized${EVENT_KEY$6}`;
    const EVENT_MINIMIZED$1 = `minimized${EVENT_KEY$6}`;
    const CLASS_NAME_CARD = 'card';
    const CLASS_NAME_COLLAPSED = 'collapsed-card';
    const CLASS_NAME_COLLAPSING = 'collapsing-card';
    const CLASS_NAME_EXPANDING = 'expanding-card';
    const CLASS_NAME_WAS_COLLAPSED = 'was-collapsed';
    const CLASS_NAME_MAXIMIZED = 'maximized-card';
    const SELECTOR_DATA_REMOVE = '[data-lte-toggle="card-remove"]';
    const SELECTOR_DATA_COLLAPSE = '[data-lte-toggle="card-collapse"]';
    const SELECTOR_DATA_MAXIMIZE = '[data-lte-toggle="card-maximize"]';
    const SELECTOR_CARD = `.${CLASS_NAME_CARD}`;
    const SELECTOR_CARD_BODY = '.card-body';
    const SELECTOR_CARD_FOOTER = '.card-footer';
    const Default$1 = {
        animationSpeed: 500,
        collapseTrigger: SELECTOR_DATA_COLLAPSE,
        removeTrigger: SELECTOR_DATA_REMOVE,
        maximizeTrigger: SELECTOR_DATA_MAXIMIZE
    };
    class CardWidget extends BaseComponent {
        static get NAME() {
            return NAME$5;
        }
        static getInstance(element) {
            return this._getInstance(element);
        }
        static getOrCreateInstance(element, config = {}) {
            return this.getInstance(element) ?? new this(element, config);
        }
        _parent;
        _config;
        constructor(element, config = {}) {
            super(element);
            this._parent = element.closest(SELECTOR_CARD);
            if (element.classList.contains(CLASS_NAME_CARD)) {
                this._parent = element;
            }
            this._config = { ...Default$1, ...config };
        }
        collapse() {
            if (!this._parent) {
                return;
            }
            if (dispatchCustomEvent(this._parent, EVENT_COLLAPSE$2, { cancelable: true }).defaultPrevented) {
                return;
            }
            this._parent.classList.add(CLASS_NAME_COLLAPSING);
            this._parent.classList.remove(CLASS_NAME_EXPANDING);
            const elm = this._parent.querySelectorAll(`:scope > ${SELECTOR_CARD_BODY}, :scope > ${SELECTOR_CARD_FOOTER}`);
            elm.forEach(el => {
                if (el instanceof HTMLElement) {
                    slideUp(el, this._config.animationSpeed);
                }
            });
            setTimeout(() => {
                if (this._parent?.classList.contains(CLASS_NAME_COLLAPSING)) {
                    this._parent.classList.add(CLASS_NAME_COLLAPSED);
                    this._parent.classList.remove(CLASS_NAME_COLLAPSING);
                    dispatchCustomEvent(this._parent, EVENT_COLLAPSED$3);
                }
            }, this._config.animationSpeed);
        }
        expand() {
            if (!this._parent) {
                return;
            }
            if (dispatchCustomEvent(this._parent, EVENT_EXPAND$1, { cancelable: true }).defaultPrevented) {
                return;
            }
            this._parent.classList.add(CLASS_NAME_EXPANDING);
            this._parent.classList.remove(CLASS_NAME_COLLAPSING, CLASS_NAME_COLLAPSED);
            const elm = this._parent.querySelectorAll(`:scope > ${SELECTOR_CARD_BODY}, :scope > ${SELECTOR_CARD_FOOTER}`);
            elm.forEach(el => {
                if (el instanceof HTMLElement) {
                    slideDown(el, this._config.animationSpeed);
                }
            });
            setTimeout(() => {
                if (this._parent?.classList.contains(CLASS_NAME_EXPANDING)) {
                    this._parent.classList.remove(CLASS_NAME_EXPANDING);
                    dispatchCustomEvent(this._parent, EVENT_EXPANDED$2);
                }
            }, this._config.animationSpeed);
        }
        remove() {
            if (!this._parent) {
                return;
            }
            if (dispatchCustomEvent(this._parent, EVENT_REMOVE, { cancelable: true }).defaultPrevented) {
                return;
            }
            const parent = this._parent;
            slideUp(parent, this._config.animationSpeed);
            setTimeout(() => {
                dispatchCustomEvent(parent, EVENT_REMOVED);
                parent.remove();
                this.dispose();
            }, this._config.animationSpeed);
        }
        toggle() {
            if (this._parent?.classList.contains(CLASS_NAME_COLLAPSED) || this._parent?.classList.contains(CLASS_NAME_COLLAPSING)) {
                this.expand();
                return;
            }
            this.collapse();
        }
        maximize() {
            if (this._parent) {
                this._parent.style.height = `${this._parent.offsetHeight}px`;
                this._parent.style.width = `${this._parent.offsetWidth}px`;
                this._parent.style.transition = 'all .15s';
                setTimeout(() => {
                    const htmlTag = document.querySelector('html');
                    if (htmlTag) {
                        htmlTag.classList.add(CLASS_NAME_MAXIMIZED);
                    }
                    if (this._parent) {
                        this._parent.classList.add(CLASS_NAME_MAXIMIZED);
                        if (this._parent.classList.contains(CLASS_NAME_COLLAPSED)) {
                            this._parent.classList.add(CLASS_NAME_WAS_COLLAPSED);
                        }
                        dispatchCustomEvent(this._parent, EVENT_MAXIMIZED$1);
                    }
                }, 150);
            }
        }
        minimize() {
            if (this._parent) {
                this._parent.style.height = 'auto';
                this._parent.style.width = 'auto';
                this._parent.style.transition = 'all .15s';
                setTimeout(() => {
                    const htmlTag = document.querySelector('html');
                    if (htmlTag) {
                        htmlTag.classList.remove(CLASS_NAME_MAXIMIZED);
                    }
                    if (this._parent) {
                        this._parent.classList.remove(CLASS_NAME_MAXIMIZED);
                        if (this._parent?.classList.contains(CLASS_NAME_WAS_COLLAPSED)) {
                            this._parent.classList.remove(CLASS_NAME_WAS_COLLAPSED);
                        }
                        dispatchCustomEvent(this._parent, EVENT_MINIMIZED$1);
                        setTimeout(() => {
                            this._parent?.style.removeProperty('height');
                            this._parent?.style.removeProperty('width');
                            this._parent?.style.removeProperty('transition');
                        }, 150);
                    }
                }, 10);
            }
        }
        toggleMaximize() {
            if (this._parent?.classList.contains(CLASS_NAME_MAXIMIZED)) {
                this.minimize();
                return;
            }
            this.maximize();
        }
    }
    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }
        const collapseTrigger = target.closest(SELECTOR_DATA_COLLAPSE);
        const removeTrigger = target.closest(SELECTOR_DATA_REMOVE);
        const maximizeTrigger = target.closest(SELECTOR_DATA_MAXIMIZE);
        const trigger = collapseTrigger ?? removeTrigger ?? maximizeTrigger;
        if (!trigger) {
            return;
        }
        event.preventDefault();
        const card = trigger.closest(SELECTOR_CARD);
        if (!card) {
            return;
        }
        const widget = CardWidget.getOrCreateInstance(card);
        if (collapseTrigger) {
            widget.toggle();
        }
        else if (removeTrigger) {
            widget.remove();
        }
        else {
            widget.toggleMaximize();
        }
    });

    const NAME$4 = 'treeview';
    const EVENT_KEY$5 = `.lte.${NAME$4}`;
    const EVENT_EXPAND = `expand${EVENT_KEY$5}`;
    const EVENT_COLLAPSE$1 = `collapse${EVENT_KEY$5}`;
    const EVENT_EXPANDED$1 = `expanded${EVENT_KEY$5}`;
    const EVENT_COLLAPSED$2 = `collapsed${EVENT_KEY$5}`;
    const EVENT_LOAD_DATA_API = `load${EVENT_KEY$5}`;
    const CLASS_NAME_MENU_OPEN$1 = 'menu-open';
    const SELECTOR_NAV_ITEM$1 = '.nav-item';
    const SELECTOR_NAV_LINK$1 = '.nav-link';
    const SELECTOR_TREEVIEW_MENU$1 = '.nav-treeview';
    const SELECTOR_DATA_TOGGLE$2 = '[data-lte-toggle="treeview"]';
    const Default = {
        animationSpeed: 300,
        accordion: true
    };
    const setAriaExpanded = (navItem, expanded) => {
        const link = navItem.querySelector(`:scope > ${SELECTOR_NAV_LINK$1}`);
        link?.setAttribute('aria-expanded', String(expanded));
    };
    class Treeview extends BaseComponent {
        static get NAME() {
            return NAME$4;
        }
        static getInstance(element) {
            return this._getInstance(element);
        }
        static getOrCreateInstance(element, config = {}) {
            return this.getInstance(element) ?? new this(element, config);
        }
        _config;
        constructor(element, config = {}) {
            super(element);
            this._config = { ...Default, ...config };
        }
        open() {
            if (dispatchCustomEvent(this._element, EVENT_EXPAND, { cancelable: true }).defaultPrevented) {
                return;
            }
            if (this._config.accordion) {
                const openMenuList = this._element.parentElement?.querySelectorAll(`${SELECTOR_NAV_ITEM$1}.${CLASS_NAME_MENU_OPEN$1}`);
                openMenuList?.forEach(openMenu => {
                    if (!this._element.contains(openMenu)) {
                        openMenu.classList.remove(CLASS_NAME_MENU_OPEN$1);
                        setAriaExpanded(openMenu, false);
                        const childElement = openMenu?.querySelector(SELECTOR_TREEVIEW_MENU$1);
                        if (childElement) {
                            slideUp(childElement, this._config.animationSpeed);
                        }
                    }
                });
            }
            this._element.classList.add(CLASS_NAME_MENU_OPEN$1);
            setAriaExpanded(this._element, true);
            const childElement = this._element.querySelector(SELECTOR_TREEVIEW_MENU$1);
            if (childElement) {
                slideDown(childElement, this._config.animationSpeed);
            }
            setTimeout(() => {
                if (this._element.classList.contains(CLASS_NAME_MENU_OPEN$1)) {
                    dispatchCustomEvent(this._element, EVENT_EXPANDED$1);
                }
            }, this._config.animationSpeed);
        }
        close() {
            if (dispatchCustomEvent(this._element, EVENT_COLLAPSE$1, { cancelable: true }).defaultPrevented) {
                return;
            }
            this._element.classList.remove(CLASS_NAME_MENU_OPEN$1);
            setAriaExpanded(this._element, false);
            const childElement = this._element.querySelector(SELECTOR_TREEVIEW_MENU$1);
            if (childElement) {
                slideUp(childElement, this._config.animationSpeed);
            }
            setTimeout(() => {
                if (!this._element.classList.contains(CLASS_NAME_MENU_OPEN$1)) {
                    dispatchCustomEvent(this._element, EVENT_COLLAPSED$2);
                }
            }, this._config.animationSpeed);
        }
        toggle() {
            if (this._element.classList.contains(CLASS_NAME_MENU_OPEN$1)) {
                this.close();
            }
            else {
                this.open();
            }
        }
    }
    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }
        const toggleRoot = target.closest(SELECTOR_DATA_TOGGLE$2);
        if (!toggleRoot) {
            return;
        }
        const targetItem = target.closest(SELECTOR_NAV_ITEM$1);
        const targetLink = target.closest(SELECTOR_NAV_LINK$1);
        if (!targetItem?.querySelector(SELECTOR_TREEVIEW_MENU$1)) {
            return;
        }
        if (target.getAttribute('href') === '#' || targetLink?.getAttribute('href') === '#') {
            event.preventDefault();
        }
        const accordionAttr = toggleRoot.dataset.accordion;
        const animationSpeedAttr = toggleRoot.dataset.animationSpeed;
        const config = {
            accordion: accordionAttr === undefined ? Default.accordion : accordionAttr === 'true',
            animationSpeed: animationSpeedAttr === undefined ? Default.animationSpeed : Number(animationSpeedAttr)
        };
        Treeview.getOrCreateInstance(targetItem, config).toggle();
    });
    onDOMContentLoaded(() => {
        const openMenuItems = document.querySelectorAll(`${SELECTOR_NAV_ITEM$1}.${CLASS_NAME_MENU_OPEN$1}`);
        openMenuItems.forEach(menuItem => {
            const childElement = menuItem.querySelector(SELECTOR_TREEVIEW_MENU$1);
            if (childElement) {
                slideDown(childElement, 0);
                const event = new Event(EVENT_LOAD_DATA_API);
                menuItem.dispatchEvent(event);
            }
        });
        document.querySelectorAll(SELECTOR_DATA_TOGGLE$2).forEach(root => {
            root.querySelectorAll(SELECTOR_NAV_ITEM$1).forEach(item => {
                if (item.querySelector(`:scope > ${SELECTOR_TREEVIEW_MENU$1}`)) {
                    setAriaExpanded(item, item.classList.contains(CLASS_NAME_MENU_OPEN$1));
                }
            });
        });
    });

    const NAME$3 = 'direct-chat';
    const EVENT_KEY$4 = `.lte.${NAME$3}`;
    const EVENT_EXPANDED = `expanded${EVENT_KEY$4}`;
    const EVENT_COLLAPSED$1 = `collapsed${EVENT_KEY$4}`;
    const SELECTOR_DATA_TOGGLE$1 = '[data-lte-toggle="chat-pane"]';
    const SELECTOR_DIRECT_CHAT = '.direct-chat';
    const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open';
    class DirectChat extends BaseComponent {
        static get NAME() {
            return NAME$3;
        }
        static getInstance(element) {
            return this._getInstance(element);
        }
        static getOrCreateInstance(element) {
            return this.getInstance(element) ?? new this(element);
        }
        toggle() {
            if (this._element.classList.contains(CLASS_NAME_DIRECT_CHAT_OPEN)) {
                this._element.classList.remove(CLASS_NAME_DIRECT_CHAT_OPEN);
                dispatchCustomEvent(this._element, EVENT_COLLAPSED$1);
            }
            else {
                this._element.classList.add(CLASS_NAME_DIRECT_CHAT_OPEN);
                dispatchCustomEvent(this._element, EVENT_EXPANDED);
            }
        }
    }
    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }
        const trigger = target.closest(SELECTOR_DATA_TOGGLE$1);
        if (!trigger) {
            return;
        }
        event.preventDefault();
        const chatPane = trigger.closest(SELECTOR_DIRECT_CHAT);
        if (chatPane) {
            DirectChat.getOrCreateInstance(chatPane).toggle();
        }
    });

    const NAME$2 = 'fullscreen';
    const EVENT_KEY$3 = `.lte.${NAME$2}`;
    const EVENT_MAXIMIZED = `maximized${EVENT_KEY$3}`;
    const EVENT_MINIMIZED = `minimized${EVENT_KEY$3}`;
    const SELECTOR_FULLSCREEN_TOGGLE = '[data-lte-toggle="fullscreen"]';
    const SELECTOR_MAXIMIZE_ICON = '[data-lte-icon="maximize"]';
    const SELECTOR_MINIMIZE_ICON = '[data-lte-icon="minimize"]';
    function syncFullScreenState() {
        const iconMaximize = document.querySelector(SELECTOR_MAXIMIZE_ICON);
        const iconMinimize = document.querySelector(SELECTOR_MINIMIZE_ICON);
        const isFullScreen = Boolean(document.fullscreenElement);
        iconMaximize?.classList.toggle('d-none', isFullScreen);
        iconMinimize?.classList.toggle('d-none', !isFullScreen);
        const eventName = isFullScreen ? EVENT_MAXIMIZED : EVENT_MINIMIZED;
        document.querySelectorAll(SELECTOR_FULLSCREEN_TOGGLE).forEach(button => {
            dispatchCustomEvent(button, eventName);
        });
    }
    class FullScreen extends BaseComponent {
        static get NAME() {
            return NAME$2;
        }
        static getInstance(element) {
            return this._getInstance(element);
        }
        static getOrCreateInstance(element) {
            return this.getInstance(element) ?? new this(element);
        }
        inFullScreen() {
            void document.documentElement.requestFullscreen().catch(() => {
            });
        }
        outFullscreen() {
            void document.exitFullscreen().catch(() => {
            });
        }
        toggleFullScreen() {
            if (!document.fullscreenEnabled) {
                return;
            }
            if (document.fullscreenElement) {
                this.outFullscreen();
            }
            else {
                this.inFullScreen();
            }
        }
    }
    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }
        const button = target.closest(SELECTOR_FULLSCREEN_TOGGLE);
        if (!button) {
            return;
        }
        event.preventDefault();
        FullScreen.getOrCreateInstance(button).toggleFullScreen();
    });
    onDOMContentLoaded(() => {
        document.addEventListener('fullscreenchange', syncFullScreenState, { signal: getLifecycleSignal() });
    });

    const NAME$1 = 'push-menu';
    const EVENT_KEY$2 = `.lte.${NAME$1}`;
    const EVENT_OPEN = `open${EVENT_KEY$2}`;
    const EVENT_COLLAPSE = `collapse${EVENT_KEY$2}`;
    const EVENT_OPENED = `opened${EVENT_KEY$2}`;
    const EVENT_COLLAPSED = `collapsed${EVENT_KEY$2}`;
    const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini';
    const CLASS_NAME_SIDEBAR_EXPAND = 'sidebar-expand';
    const CLASS_NAME_SIDEBAR_OVERLAY = 'sidebar-overlay';
    const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse';
    const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open';
    const SELECTOR_APP_SIDEBAR = '.app-sidebar';
    const SELECTOR_APP_WRAPPER = '.app-wrapper';
    const SELECTOR_SIDEBAR_EXPAND = `[class*="${CLASS_NAME_SIDEBAR_EXPAND}"]`;
    const SELECTOR_SIDEBAR_TOGGLE = '[data-lte-toggle="sidebar"]';
    const STORAGE_KEY_SIDEBAR_STATE = 'lte.sidebar.state';
    const Defaults = {
        sidebarBreakpoint: 991.98,
        enablePersistence: false
    };
    class PushMenu extends BaseComponent {
        static get NAME() {
            return NAME$1;
        }
        static getInstance(element) {
            return this._getInstance(element);
        }
        static getOrCreateInstance(element, config = {}) {
            return this.getInstance(element) ?? new this(element, config);
        }
        _config;
        constructor(element, config = {}) {
            super(element);
            this._config = { ...Defaults, ...config };
        }
        isCollapsed() {
            return document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE);
        }
        isExplicitlyOpen() {
            return document.body.classList.contains(CLASS_NAME_SIDEBAR_OPEN);
        }
        isMiniMode() {
            return document.body.classList.contains(CLASS_NAME_SIDEBAR_MINI);
        }
        isMobileSize() {
            return globalThis.innerWidth <= this._config.sidebarBreakpoint;
        }
        expand() {
            if (dispatchCustomEvent(this._element, EVENT_OPEN, { cancelable: true }).defaultPrevented) {
                return;
            }
            document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE);
            if (this.isMobileSize()) {
                document.body.classList.add(CLASS_NAME_SIDEBAR_OPEN);
            }
            dispatchCustomEvent(this._element, EVENT_OPENED);
        }
        collapse() {
            if (dispatchCustomEvent(this._element, EVENT_COLLAPSE, { cancelable: true }).defaultPrevented) {
                return;
            }
            document.body.classList.remove(CLASS_NAME_SIDEBAR_OPEN);
            document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE);
            dispatchCustomEvent(this._element, EVENT_COLLAPSED);
        }
        toggle() {
            const isCollapsed = this.isCollapsed();
            if (isCollapsed) {
                this.expand();
            }
            else {
                this.collapse();
            }
            if (this._config.enablePersistence) {
                this.saveSidebarState(isCollapsed ? CLASS_NAME_SIDEBAR_OPEN : CLASS_NAME_SIDEBAR_COLLAPSE);
            }
        }
        setupSidebarBreakPoint() {
            const sidebarExpand = document.querySelector(SELECTOR_SIDEBAR_EXPAND);
            if (!sidebarExpand) {
                return;
            }
            const content = globalThis.getComputedStyle(sidebarExpand, '::before')
                .getPropertyValue('content');
            if (!content || content === 'none') {
                return;
            }
            const breakpointValue = Number(content.replace(/[^\d.-]/g, ''));
            if (Number.isNaN(breakpointValue)) {
                return;
            }
            this._config = { ...this._config, sidebarBreakpoint: breakpointValue };
        }
        updateStateByResponsiveLogic() {
            if (this.isMobileSize()) {
                if (!this.isExplicitlyOpen()) {
                    this.collapse();
                }
            }
            else {
                if (!(this.isMiniMode() && this.isCollapsed())) {
                    this.expand();
                }
            }
        }
        saveSidebarState(state) {
            if (globalThis.localStorage === undefined) {
                return;
            }
            try {
                localStorage.setItem(STORAGE_KEY_SIDEBAR_STATE, state);
            }
            catch {
            }
        }
        loadSidebarState() {
            if (globalThis.localStorage === undefined) {
                return;
            }
            try {
                const storedState = localStorage.getItem(STORAGE_KEY_SIDEBAR_STATE);
                if (storedState === CLASS_NAME_SIDEBAR_COLLAPSE) {
                    this.collapse();
                }
                else if (storedState === CLASS_NAME_SIDEBAR_OPEN) {
                    this.expand();
                }
                else {
                    this.updateStateByResponsiveLogic();
                }
            }
            catch {
                this.updateStateByResponsiveLogic();
            }
        }
        clearSidebarState() {
            if (globalThis.localStorage === undefined) {
                return;
            }
            try {
                localStorage.removeItem(STORAGE_KEY_SIDEBAR_STATE);
            }
            catch {
            }
        }
        init() {
            this.setupSidebarBreakPoint();
            if (!this._config.enablePersistence) {
                this.clearSidebarState();
            }
            if (this._config.enablePersistence && !this.isMobileSize()) {
                this.loadSidebarState();
            }
            else if (!this.isCollapsed()) {
                this.updateStateByResponsiveLogic();
            }
        }
    }
    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }
        const button = target.closest(SELECTOR_SIDEBAR_TOGGLE);
        if (!button) {
            return;
        }
        event.preventDefault();
        const sidebar = document.querySelector(SELECTOR_APP_SIDEBAR);
        if (sidebar) {
            PushMenu.getOrCreateInstance(sidebar).toggle();
        }
    });
    onDOMContentLoaded(() => {
        const sidebar = document.querySelector(SELECTOR_APP_SIDEBAR);
        if (!sidebar) {
            return;
        }
        const sidebarBreakpointAttr = sidebar.dataset.sidebarBreakpoint;
        const enablePersistenceAttr = sidebar.dataset.enablePersistence;
        const config = {
            sidebarBreakpoint: sidebarBreakpointAttr === undefined ?
                Defaults.sidebarBreakpoint :
                Number(sidebarBreakpointAttr),
            enablePersistence: enablePersistenceAttr === undefined ?
                Defaults.enablePersistence :
                enablePersistenceAttr === 'true'
        };
        const pushMenu = PushMenu.getOrCreateInstance(sidebar, config);
        pushMenu.init();
        const breakpointQuery = globalThis.matchMedia(`(max-width: ${pushMenu._config.sidebarBreakpoint}px)`);
        breakpointQuery.addEventListener('change', () => {
            pushMenu.updateStateByResponsiveLogic();
        }, { signal: getLifecycleSignal() });
        const appWrapper = document.querySelector(SELECTOR_APP_WRAPPER);
        let sidebarOverlay = appWrapper?.querySelector(`:scope > .${CLASS_NAME_SIDEBAR_OVERLAY}`);
        if (!sidebarOverlay) {
            sidebarOverlay = document.createElement('div');
            sidebarOverlay.className = CLASS_NAME_SIDEBAR_OVERLAY;
            appWrapper?.append(sidebarOverlay);
        }
        const overlaySignal = getLifecycleSignal();
        let overlayTouchMoved = false;
        sidebarOverlay.addEventListener('touchstart', () => {
            overlayTouchMoved = false;
        }, { passive: true, signal: overlaySignal });
        sidebarOverlay.addEventListener('touchmove', () => {
            overlayTouchMoved = true;
        }, { passive: true, signal: overlaySignal });
        sidebarOverlay.addEventListener('touchend', event => {
            if (!overlayTouchMoved) {
                event.preventDefault();
                pushMenu.collapse();
            }
            overlayTouchMoved = false;
        }, { passive: false, signal: overlaySignal });
        sidebarOverlay.addEventListener('click', event => {
            event.preventDefault();
            pushMenu.collapse();
        }, { signal: overlaySignal });
    });

    const DATA_KEY = 'lte.color-mode';
    const EVENT_KEY$1 = `.${DATA_KEY}`;
    const EVENT_CHANGED = `changed${EVENT_KEY$1}`;
    const STORAGE_KEY = 'lte-theme';
    const ATTRIBUTE_THEME = 'data-bs-theme';
    const ATTRIBUTE_TOGGLE = 'data-bs-theme-value';
    const ATTRIBUTE_DISABLED = 'data-lte-color-mode';
    const ATTRIBUTE_RESOLVED = 'data-lte-theme-resolved';
    const SELECTOR_TOGGLE = `[${ATTRIBUTE_TOGGLE}]`;
    const SELECTOR_ICON = '[data-lte-theme-icon]';
    const THEMES = new Set(['light', 'dark', 'auto']);
    const isValidTheme = (value) => THEMES.has(value);
    const isDisabled = () => document.documentElement.getAttribute(ATTRIBUTE_DISABLED) === 'off';
    const readMarkupTheme = () => {
        const { documentElement } = document;
        if (documentElement.hasAttribute(ATTRIBUTE_RESOLVED)) {
            return null;
        }
        const declared = documentElement.getAttribute(ATTRIBUTE_THEME);
        return declared && isValidTheme(declared) ? declared : null;
    };
    const MARKUP_THEME = readMarkupTheme();
    class ColorMode {
        getStoredTheme() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored && isValidTheme(stored) ? stored : null;
            }
            catch {
                return null;
            }
        }
        getMarkupTheme() {
            return MARKUP_THEME;
        }
        getPreferredTheme() {
            const preferred = this.getStoredTheme() ?? this.getMarkupTheme();
            if (preferred) {
                return preferred;
            }
            return this._prefersDark() ? 'dark' : 'light';
        }
        resolveTheme(theme) {
            if (theme === 'auto') {
                return this._prefersDark() ? 'dark' : 'light';
            }
            return theme;
        }
        setTheme(theme) {
            try {
                localStorage.setItem(STORAGE_KEY, theme);
            }
            catch {
            }
            this._applyTheme(theme);
            this._showActiveTheme(theme);
            document.dispatchEvent(new CustomEvent(EVENT_CHANGED, {
                detail: { theme, resolved: this.resolveTheme(theme) }
            }));
        }
        _applyTheme(theme) {
            const resolved = this.resolveTheme(theme);
            document.documentElement.setAttribute(ATTRIBUTE_THEME, resolved);
            document.documentElement.style.colorScheme = resolved;
        }
        _prefersDark() {
            return globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        _showActiveTheme(theme) {
            document.querySelectorAll(SELECTOR_TOGGLE).forEach(toggle => {
                const isActive = toggle.getAttribute(ATTRIBUTE_TOGGLE) === theme;
                toggle.classList.toggle('active', isActive);
                toggle.setAttribute('aria-pressed', String(isActive));
                toggle.querySelector('.bi-check-lg')?.classList.toggle('d-none', !isActive);
            });
            document.querySelectorAll(SELECTOR_ICON).forEach(icon => {
                icon.classList.toggle('d-none', icon.dataset.lteThemeIcon !== theme);
            });
        }
        init() {
            if (isDisabled()) {
                return;
            }
            const theme = this.getPreferredTheme();
            this._applyTheme(theme);
            this._showActiveTheme(theme);
        }
    }
    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof Element) || isDisabled()) {
            return;
        }
        const toggle = target.closest(SELECTOR_TOGGLE);
        const theme = toggle?.getAttribute(ATTRIBUTE_TOGGLE);
        if (theme && isValidTheme(theme)) {
            new ColorMode().setTheme(theme);
        }
    });
    onDOMContentLoaded(() => {
        const colorMode = new ColorMode();
        colorMode.init();
        globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (isDisabled()) {
                return;
            }
            const preferred = colorMode.getStoredTheme() ?? colorMode.getMarkupTheme();
            if (!preferred || preferred === 'auto') {
                colorMode._applyTheme('auto');
                colorMode._showActiveTheme(preferred ?? 'auto');
            }
        }, { signal: getLifecycleSignal() });
    });

    const NAME = 'sidebar-search';
    const EVENT_KEY = `.lte.${NAME}`;
    const EVENT_FILTERED = `filtered${EVENT_KEY}`;
    const CLASS_NAME_MENU_OPEN = 'menu-open';
    const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="sidebar-search"]';
    const SELECTOR_SIDEBAR = '.app-sidebar';
    const SELECTOR_MENU = '.sidebar-menu';
    const SELECTOR_NAV_ITEM = '.nav-item';
    const SELECTOR_NAV_HEADER = '.nav-header';
    const SELECTOR_NAV_LINK = ':scope > .nav-link';
    const SELECTOR_TREEVIEW_MENU = ':scope > .nav-treeview';
    const SELECTOR_EMPTY_STATE = '[data-lte-search-empty]';
    const submenuOf = (item) => item.querySelector(SELECTOR_TREEVIEW_MENU);
    const setOpen = (item, submenu, open, display) => {
        item.classList.toggle(CLASS_NAME_MENU_OPEN, open);
        item.querySelector(SELECTOR_NAV_LINK)?.setAttribute('aria-expanded', String(open));
        submenu.style.display = display;
    };
    class SidebarSearch extends BaseComponent {
        static get NAME() {
            return NAME;
        }
        static getInstance(element) {
            return this._getInstance(element);
        }
        static getOrCreateInstance(element) {
            return this.getInstance(element) ?? new this(element);
        }
        _menu;
        _emptyState;
        _snapshot = null;
        constructor(element) {
            super(element);
            const target = element.dataset.lteTarget;
            const scope = element.closest(SELECTOR_SIDEBAR) ?? document;
            this._menu = target ?
                document.querySelector(target) :
                scope.querySelector(SELECTOR_MENU);
            this._emptyState = scope.querySelector(SELECTOR_EMPTY_STATE);
        }
        search(term) {
            const menu = this._menu;
            if (!menu) {
                return;
            }
            const query = term.trim().toLowerCase();
            if (!query) {
                this.clear();
                return;
            }
            this._snapshot ??= this._takeSnapshot(menu);
            const items = [...menu.querySelectorAll(SELECTOR_NAV_ITEM)];
            const matched = new Set();
            for (const item of items) {
                const label = item.querySelector(SELECTOR_NAV_LINK)?.textContent?.replace(/\s+/g, ' ').trim().toLowerCase();
                if (label?.includes(query)) {
                    matched.add(item);
                }
            }
            for (let index = items.length - 1; index >= 0; index--) {
                const item = items[index];
                item.hidden = !(matched.has(item) || item.querySelector(`${SELECTOR_NAV_ITEM}:not([hidden])`));
            }
            for (const item of matched) {
                for (const descendant of item.querySelectorAll(SELECTOR_NAV_ITEM)) {
                    descendant.hidden = false;
                }
            }
            let visible = 0;
            for (const item of items) {
                if (!item.hidden) {
                    visible++;
                }
                const submenu = submenuOf(item);
                if (submenu) {
                    const expand = !item.hidden && Boolean(item.querySelector(`${SELECTOR_NAV_ITEM}:not([hidden])`));
                    setOpen(item, submenu, expand, expand ? 'block' : 'none');
                }
            }
            for (const header of menu.querySelectorAll(SELECTOR_NAV_HEADER)) {
                header.hidden = true;
            }
            if (this._emptyState) {
                this._emptyState.hidden = visible > 0;
            }
            dispatchCustomEvent(this._element, EVENT_FILTERED, { detail: { query, matches: visible } });
        }
        clear() {
            const menu = this._menu;
            if (!menu) {
                return;
            }
            for (const item of menu.querySelectorAll(`${SELECTOR_NAV_ITEM}, ${SELECTOR_NAV_HEADER}`)) {
                item.hidden = false;
            }
            if (this._snapshot) {
                for (const [item, state] of this._snapshot) {
                    const submenu = submenuOf(item);
                    if (submenu) {
                        setOpen(item, submenu, state.open, state.display);
                    }
                }
                this._snapshot = null;
            }
            if (this._emptyState) {
                this._emptyState.hidden = true;
            }
            dispatchCustomEvent(this._element, EVENT_FILTERED, { detail: { query: '', matches: -1 } });
        }
        dispose() {
            this.clear();
            super.dispose();
        }
        _takeSnapshot(menu) {
            const snapshot = new Map();
            for (const item of menu.querySelectorAll(SELECTOR_NAV_ITEM)) {
                const submenu = submenuOf(item);
                if (submenu) {
                    snapshot.set(item, {
                        open: item.classList.contains(CLASS_NAME_MENU_OPEN),
                        display: submenu.style.display
                    });
                }
            }
            return snapshot;
        }
    }
    document.addEventListener('input', event => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.matches(SELECTOR_DATA_TOGGLE)) {
            SidebarSearch.getOrCreateInstance(target).search(target.value);
        }
    });
    document.addEventListener('keydown', event => {
        const target = event.target;
        if (event.key === 'Escape' && target instanceof HTMLInputElement && target.matches(SELECTOR_DATA_TOGGLE)) {
            target.value = '';
            SidebarSearch.getOrCreateInstance(target).clear();
        }
    });
    onDOMContentLoaded(() => {
        document.querySelectorAll(SELECTOR_DATA_TOGGLE).forEach(input => {
            if (input.value) {
                SidebarSearch.getOrCreateInstance(input).search(input.value);
            }
        });
    });

    class AccessibilityManager {
        config;
        liveRegion = null;
        focusHistory = [];
        signal = getLifecycleSignal();
        constructor(config = {}) {
            this.config = {
                announcements: true,
                skipLinks: true,
                focusManagement: true,
                keyboardNavigation: true,
                reducedMotion: true,
                ...config
            };
            this.init();
        }
        init() {
            if (this.config.announcements) {
                this.createLiveRegion();
            }
            if (this.config.skipLinks) {
                this.addSkipLinks();
            }
            if (this.config.focusManagement) {
                this.initFocusManagement();
            }
            if (this.config.keyboardNavigation) {
                this.initKeyboardNavigation();
            }
            if (this.config.reducedMotion) {
                this.respectReducedMotion();
            }
            this.initErrorAnnouncements();
            this.initTableAccessibility();
            this.initFormAccessibility();
        }
        createLiveRegion() {
            if (this.liveRegion)
                return;
            const existingRegion = document.getElementById('live-region');
            if (existingRegion) {
                this.liveRegion = existingRegion;
                return;
            }
            this.liveRegion = document.createElement('div');
            this.liveRegion.id = 'live-region';
            this.liveRegion.className = 'live-region';
            this.liveRegion.setAttribute('aria-live', 'polite');
            this.liveRegion.setAttribute('aria-atomic', 'true');
            this.liveRegion.setAttribute('role', 'status');
            document.body.append(this.liveRegion);
        }
        addSkipLinks() {
            if (document.querySelector('.skip-links')) {
                this.ensureSkipTargets();
                return;
            }
            const skipLinksContainer = document.createElement('div');
            skipLinksContainer.className = 'skip-links';
            const skipToMain = document.createElement('a');
            skipToMain.href = '#main';
            skipToMain.className = 'skip-link';
            skipToMain.textContent = 'Skip to main content';
            const skipToNav = document.createElement('a');
            skipToNav.href = '#navigation';
            skipToNav.className = 'skip-link';
            skipToNav.textContent = 'Skip to navigation';
            skipLinksContainer.append(skipToMain);
            skipLinksContainer.append(skipToNav);
            document.body.insertBefore(skipLinksContainer, document.body.firstChild);
            this.ensureSkipTargets();
        }
        ensureSkipTargets() {
            const targets = [
                ['main', 'main, [role="main"]'],
                ['navigation', 'nav, [role="navigation"]']
            ];
            for (const [id, fallbackSelector] of targets) {
                const target = document.getElementById(id) ?? document.querySelector(fallbackSelector);
                if (!target) {
                    continue;
                }
                if (!target.id) {
                    target.id = id;
                }
                if (!target.hasAttribute('tabindex')) {
                    target.setAttribute('tabindex', '-1');
                }
            }
        }
        initFocusManagement() {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.handleEscapeKey(event);
                }
            }, { signal: this.signal });
            this.initModalFocusManagement();
            this.initDropdownFocusManagement();
        }
        handleEscapeKey(event) {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                return;
            }
            const activeDropdown = document.querySelector('.dropdown-menu.show');
            if (activeDropdown) {
                const toggleButton = document.querySelector('[data-bs-toggle="dropdown"][aria-expanded="true"]');
                toggleButton?.click();
                event.preventDefault();
            }
        }
        initKeyboardNavigation() {
            document.addEventListener('keydown', (event) => {
                const target = event.target;
                if (target.matches('input, textarea, select, [contenteditable], [contenteditable] *')) {
                    return;
                }
                if (target.closest('.nav, .navbar-nav, .dropdown-menu')) {
                    this.handleMenuNavigation(event);
                }
                if ((event.key === 'Enter' || event.key === ' ') && target.hasAttribute('role') && target.getAttribute('role') === 'button' && !target.matches('button, input[type="button"], input[type="submit"]')) {
                    event.preventDefault();
                    target.click();
                }
            }, { signal: this.signal });
        }
        handleMenuNavigation(event) {
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                return;
            }
            const currentElement = event.target;
            const menuItems = Array.from(currentElement.closest('.nav, .navbar-nav, .dropdown-menu')?.querySelectorAll('a, button') || [])
                .filter(item => item.offsetParent !== null);
            const currentIndex = menuItems.indexOf(currentElement);
            if (currentIndex === -1) {
                return;
            }
            let nextIndex;
            switch (event.key) {
                case 'ArrowDown':
                case 'ArrowRight': {
                    nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
                    break;
                }
                case 'ArrowUp':
                case 'ArrowLeft': {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                    break;
                }
                case 'Home': {
                    nextIndex = 0;
                    break;
                }
                case 'End': {
                    nextIndex = menuItems.length - 1;
                    break;
                }
                default: {
                    return;
                }
            }
            event.preventDefault();
            menuItems[nextIndex]?.focus();
        }
        respectReducedMotion() {
            const prefersReducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                document.body.classList.add('reduce-motion');
                document.documentElement.style.scrollBehavior = 'auto';
                if (!document.getElementById('adminlte-reduce-motion')) {
                    const style = document.createElement('style');
                    style.id = 'adminlte-reduce-motion';
                    style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `;
                    document.head.append(style);
                }
            }
        }
        initErrorAnnouncements() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const element = node;
                            if (element.matches('.alert-danger, .invalid-feedback, .error')) {
                                this.announce(element.textContent || 'Error occurred', 'assertive');
                            }
                            if (element.matches('.alert-success, .success')) {
                                this.announce(element.textContent || 'Success', 'polite');
                            }
                        }
                    });
                });
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            this.signal.addEventListener('abort', () => {
                observer.disconnect();
            }, { once: true });
        }
        initTableAccessibility() {
            document.querySelectorAll('table').forEach((table) => {
                if (!table.hasAttribute('role')) {
                    table.setAttribute('role', 'table');
                }
                table.querySelectorAll('th').forEach((th) => {
                    if (!th.hasAttribute('scope')) {
                        const isInThead = th.closest('thead');
                        const isFirstColumn = th.cellIndex === 0;
                        if (isInThead) {
                            th.setAttribute('scope', 'col');
                        }
                        else if (isFirstColumn) {
                            th.setAttribute('scope', 'row');
                        }
                    }
                });
                if (!table.querySelector('caption') && table.hasAttribute('title')) {
                    const caption = document.createElement('caption');
                    caption.textContent = table.getAttribute('title') || '';
                    table.insertBefore(caption, table.firstChild);
                }
            });
        }
        initFormAccessibility() {
            document.querySelectorAll('input, select, textarea').forEach((input) => {
                const htmlInput = input;
                if (!htmlInput.labels?.length && !htmlInput.hasAttribute('aria-label') && !htmlInput.hasAttribute('aria-labelledby')) {
                    const placeholder = htmlInput.getAttribute('placeholder');
                    if (placeholder) {
                        htmlInput.setAttribute('aria-label', placeholder);
                    }
                }
                if (htmlInput.hasAttribute('required')) {
                    const label = htmlInput.labels?.[0];
                    if (label && !label.querySelector('.required-indicator')) {
                        const indicator = document.createElement('span');
                        indicator.className = 'required-indicator sr-only';
                        indicator.textContent = ' (required)';
                        label.append(indicator);
                    }
                }
                if (!htmlInput.classList.contains('disable-adminlte-validations')) {
                    htmlInput.addEventListener('invalid', () => {
                        this.handleFormError(htmlInput);
                    }, { signal: this.signal });
                }
            });
        }
        handleFormError(input) {
            if (!input.id && !input.name) {
                input.id = accessibilityUtils.generateId('field');
            }
            const errorId = `${input.id || input.name}-error`;
            let errorElement = document.getElementById(errorId);
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.id = errorId;
                errorElement.className = 'invalid-feedback';
                errorElement.setAttribute('role', 'alert');
                input.parentNode?.append(errorElement);
            }
            errorElement.textContent = input.validationMessage;
            const describedBy = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
            if (!describedBy.includes(errorId)) {
                describedBy.push(errorId);
            }
            input.setAttribute('aria-describedby', describedBy.join(' '));
            input.classList.add('is-invalid');
            this.announce(`Error in ${input.labels?.[0]?.textContent || input.name}: ${input.validationMessage}`, 'assertive');
        }
        initModalFocusManagement() {
            document.addEventListener('show.bs.modal', () => {
                this.focusHistory.push(document.activeElement);
            }, { signal: this.signal });
            document.addEventListener('shown.bs.modal', (event) => {
                const modal = event.target;
                const autofocusElement = modal.querySelector('[autofocus]');
                const firstFocusable = autofocusElement ||
                    modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                firstFocusable?.focus();
            }, { signal: this.signal });
            document.addEventListener('hidden.bs.modal', () => {
                const previousElement = this.focusHistory.pop();
                if (previousElement?.isConnected) {
                    previousElement.focus();
                }
            }, { signal: this.signal });
        }
        initDropdownFocusManagement() {
            document.addEventListener('shown.bs.dropdown', (event) => {
                const dropdown = event.target;
                const menu = dropdown.querySelector('.dropdown-menu');
                const firstItem = menu?.querySelector('a, button');
                if (firstItem) {
                    firstItem.focus();
                }
            }, { signal: this.signal });
        }
        announce(message, priority = 'polite') {
            if (!this.liveRegion) {
                this.createLiveRegion();
            }
            if (this.liveRegion) {
                this.liveRegion.setAttribute('aria-live', priority);
                this.liveRegion.textContent = message;
                setTimeout(() => {
                    if (this.liveRegion) {
                        this.liveRegion.textContent = '';
                    }
                }, 1000);
            }
        }
        focusElement(selector) {
            const element = document.querySelector(selector);
            if (element) {
                element.focus();
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        trapFocus(container) {
            const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const focusableArray = Array.from(focusableElements);
            const firstElement = focusableArray[0];
            const lastElement = focusableArray.at(-1);
            container.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    if (event.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement?.focus();
                            event.preventDefault();
                        }
                    }
                    else if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }, { signal: this.signal });
        }
        addLandmarks() {
            const main = document.querySelector('main');
            if (!main) {
                const appMain = document.querySelector('.app-main');
                if (appMain) {
                    appMain.setAttribute('role', 'main');
                    if (!appMain.id) {
                        appMain.id = 'main';
                    }
                }
            }
            document.querySelectorAll('.navbar-nav, .nav').forEach((nav, index) => {
                if (nav.tagName === 'UL' || nav.tagName === 'OL') {
                    return;
                }
                if (!nav.hasAttribute('role')) {
                    nav.setAttribute('role', 'navigation');
                }
                if (!nav.hasAttribute('aria-label')) {
                    nav.setAttribute('aria-label', `Navigation ${index + 1}`);
                }
            });
            const searchForm = document.querySelector('form[role="search"], .navbar-search');
            if (searchForm && !searchForm.hasAttribute('role')) {
                searchForm.setAttribute('role', 'search');
            }
        }
    }
    const initAccessibility = (config) => {
        return new AccessibilityManager(config);
    };
    const parseColorChannels = (color) => {
        const hexMatch = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(color.trim());
        if (hexMatch) {
            let hex = hexMatch[1];
            if (hex.length === 3) {
                hex = [...hex].map(character => character + character).join('');
            }
            return [
                Number.parseInt(hex.slice(0, 2), 16),
                Number.parseInt(hex.slice(2, 4), 16),
                Number.parseInt(hex.slice(4, 6), 16)
            ];
        }
        return color.match(/\d+/g)?.map(Number) || [0, 0, 0];
    };
    const getLuminance = (color) => {
        const [r, g, b] = parseColorChannels(color).map(c => {
            c = c / 255;
            return c <= 0.039_28 ? c / 12.92 : (c + 0.055) ** 2.4 / (1.055 ** 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const accessibilityUtils = {
        checkColorContrast: (foreground, background) => {
            const l1 = getLuminance(foreground);
            const l2 = getLuminance(background);
            const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            return {
                ratio: Math.round(ratio * 100) / 100,
                passes: ratio >= 4.5
            };
        },
        generateId: (prefix = 'a11y') => {
            return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
        },
        isFocusable: (element) => {
            const focusableSelectors = [
                'a[href]',
                'button:not([disabled])',
                'input:not([disabled])',
                'select:not([disabled])',
                'textarea:not([disabled])',
                '[tabindex]:not([tabindex="-1"])',
                '[contenteditable="true"]'
            ];
            return focusableSelectors.some(selector => element.matches(selector));
        }
    };

    onDOMContentLoaded(() => {
        const accessibilityManager = initAccessibility({
            announcements: true,
            skipLinks: true,
            focusManagement: true,
            keyboardNavigation: true,
            reducedMotion: true
        });
        accessibilityManager.addLandmarks();
    });

    exports.CardWidget = CardWidget;
    exports.ColorMode = ColorMode;
    exports.DirectChat = DirectChat;
    exports.FullScreen = FullScreen;
    exports.Layout = Layout;
    exports.PushMenu = PushMenu;
    exports.SidebarSearch = SidebarSearch;
    exports.Treeview = Treeview;
    exports.initAccessibility = initAccessibility;
    exports.initialize = initialize;
    exports.teardown = teardown;

}));
//# sourceMappingURL=adminlte.js.map
