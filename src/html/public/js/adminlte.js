/*!
 * AdminLTE v4.0.0-rc7 (https://adminlte.io)
 * Copyright 2014-2026 Colorlib <https://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.adminlte = {}));
})(this, (function (exports) { 'use strict';

    const domContentLoadedCallbacks = [];
    const onDOMContentLoaded = (callback) => {
        if (document.readyState === 'loading') {
            if (!domContentLoadedCallbacks.length) {
                document.addEventListener('DOMContentLoaded', () => {
                    for (const callback of domContentLoadedCallbacks) {
                        callback();
                    }
                });
            }
            domContentLoadedCallbacks.push(callback);
        }
        else {
            callback();
        }
    };
    const slideUp = (target, duration = 500) => {
        if (duration <= 1) {
            target.style.display = 'none';
            return;
        }
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = `${duration}ms`;
        target.style.boxSizing = 'border-box';
        target.style.height = `${target.offsetHeight}px`;
        target.style.overflow = 'hidden';
        globalThis.setTimeout(() => {
            target.style.height = '0';
            target.style.paddingTop = '0';
            target.style.paddingBottom = '0';
            target.style.marginTop = '0';
            target.style.marginBottom = '0';
        }, 1);
        globalThis.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    };
    const slideDown = (target, duration = 500) => {
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
        globalThis.setTimeout(() => {
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = `${duration}ms`;
            target.style.height = `${height}px`;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
        }, 1);
        globalThis.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
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
        window.addEventListener('resize', () => layout.holdTransition(200));
        setTimeout(() => {
            document.body.classList.add(CLASS_NAME_APP_LOADED);
        }, 400);
    });

    const DATA_KEY$4 = 'lte.card-widget';
    const EVENT_KEY$4 = `.${DATA_KEY$4}`;
    const EVENT_COLLAPSED$2 = `collapsed${EVENT_KEY$4}`;
    const EVENT_EXPANDED$2 = `expanded${EVENT_KEY$4}`;
    const EVENT_REMOVE = `remove${EVENT_KEY$4}`;
    const EVENT_MAXIMIZED$1 = `maximized${EVENT_KEY$4}`;
    const EVENT_MINIMIZED$1 = `minimized${EVENT_KEY$4}`;
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
    class CardWidget {
        _element;
        _parent;
        _clone;
        _config;
        constructor(element, config) {
            this._element = element;
            this._parent = element.closest(SELECTOR_CARD);
            if (element.classList.contains(CLASS_NAME_CARD)) {
                this._parent = element;
            }
            this._config = { ...Default$1, ...config };
        }
        collapse() {
            const event = new Event(EVENT_COLLAPSED$2);
            if (this._parent) {
                this._parent.classList.add(CLASS_NAME_COLLAPSING);
                const elm = this._parent?.querySelectorAll(`:scope > ${SELECTOR_CARD_BODY}, :scope > ${SELECTOR_CARD_FOOTER}`);
                elm.forEach(el => {
                    if (el instanceof HTMLElement) {
                        slideUp(el, this._config.animationSpeed);
                    }
                });
                setTimeout(() => {
                    if (this._parent) {
                        this._parent.classList.add(CLASS_NAME_COLLAPSED);
                        this._parent.classList.remove(CLASS_NAME_COLLAPSING);
                    }
                }, this._config.animationSpeed);
            }
            this._element?.dispatchEvent(event);
        }
        expand() {
            const event = new Event(EVENT_EXPANDED$2);
            if (this._parent) {
                this._parent.classList.add(CLASS_NAME_EXPANDING);
                const elm = this._parent?.querySelectorAll(`:scope > ${SELECTOR_CARD_BODY}, :scope > ${SELECTOR_CARD_FOOTER}`);
                elm.forEach(el => {
                    if (el instanceof HTMLElement) {
                        slideDown(el, this._config.animationSpeed);
                    }
                });
                setTimeout(() => {
                    if (this._parent) {
                        this._parent.classList.remove(CLASS_NAME_COLLAPSED, CLASS_NAME_EXPANDING);
                    }
                }, this._config.animationSpeed);
            }
            this._element?.dispatchEvent(event);
        }
        remove() {
            const event = new Event(EVENT_REMOVE);
            if (this._parent) {
                slideUp(this._parent, this._config.animationSpeed);
            }
            this._element?.dispatchEvent(event);
        }
        toggle() {
            if (this._parent?.classList.contains(CLASS_NAME_COLLAPSED)) {
                this.expand();
                return;
            }
            this.collapse();
        }
        maximize() {
            const event = new Event(EVENT_MAXIMIZED$1);
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
                    }
                }, 150);
            }
            this._element?.dispatchEvent(event);
        }
        minimize() {
            const event = new Event(EVENT_MINIMIZED$1);
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
                    }
                }, 10);
            }
            this._element?.dispatchEvent(event);
        }
        toggleMaximize() {
            if (this._parent?.classList.contains(CLASS_NAME_MAXIMIZED)) {
                this.minimize();
                return;
            }
            this.maximize();
        }
    }
    onDOMContentLoaded(() => {
        const collapseBtn = document.querySelectorAll(SELECTOR_DATA_COLLAPSE);
        collapseBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default$1);
                data.toggle();
            });
        });
        const removeBtn = document.querySelectorAll(SELECTOR_DATA_REMOVE);
        removeBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default$1);
                data.remove();
            });
        });
        const maxBtn = document.querySelectorAll(SELECTOR_DATA_MAXIMIZE);
        maxBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default$1);
                data.toggleMaximize();
            });
        });
    });

    const DATA_KEY$3 = 'lte.treeview';
    const EVENT_KEY$3 = `.${DATA_KEY$3}`;
    const EVENT_EXPANDED$1 = `expanded${EVENT_KEY$3}`;
    const EVENT_COLLAPSED$1 = `collapsed${EVENT_KEY$3}`;
    const EVENT_LOAD_DATA_API = `load${EVENT_KEY$3}`;
    const CLASS_NAME_MENU_OPEN = 'menu-open';
    const SELECTOR_NAV_ITEM = '.nav-item';
    const SELECTOR_NAV_LINK = '.nav-link';
    const SELECTOR_TREEVIEW_MENU = '.nav-treeview';
    const SELECTOR_DATA_TOGGLE$1 = '[data-lte-toggle="treeview"]';
    const Default = {
        animationSpeed: 300,
        accordion: true
    };
    class Treeview {
        _element;
        _config;
        constructor(element, config) {
            this._element = element;
            this._config = { ...Default, ...config };
        }
        open() {
            const event = new Event(EVENT_EXPANDED$1);
            if (this._config.accordion) {
                const openMenuList = this._element.parentElement?.querySelectorAll(`${SELECTOR_NAV_ITEM}.${CLASS_NAME_MENU_OPEN}`);
                openMenuList?.forEach(openMenu => {
                    if (openMenu !== this._element.parentElement) {
                        openMenu.classList.remove(CLASS_NAME_MENU_OPEN);
                        const childElement = openMenu?.querySelector(SELECTOR_TREEVIEW_MENU);
                        if (childElement) {
                            slideUp(childElement, this._config.animationSpeed);
                        }
                    }
                });
            }
            this._element.classList.add(CLASS_NAME_MENU_OPEN);
            const childElement = this._element?.querySelector(SELECTOR_TREEVIEW_MENU);
            if (childElement) {
                slideDown(childElement, this._config.animationSpeed);
            }
            this._element.dispatchEvent(event);
        }
        close() {
            const event = new Event(EVENT_COLLAPSED$1);
            this._element.classList.remove(CLASS_NAME_MENU_OPEN);
            const childElement = this._element?.querySelector(SELECTOR_TREEVIEW_MENU);
            if (childElement) {
                slideUp(childElement, this._config.animationSpeed);
            }
            this._element.dispatchEvent(event);
        }
        toggle() {
            if (this._element.classList.contains(CLASS_NAME_MENU_OPEN)) {
                this.close();
            }
            else {
                this.open();
            }
        }
    }
    onDOMContentLoaded(() => {
        const openMenuItems = document.querySelectorAll(`${SELECTOR_NAV_ITEM}.${CLASS_NAME_MENU_OPEN}`);
        openMenuItems.forEach(menuItem => {
            const childElement = menuItem.querySelector(SELECTOR_TREEVIEW_MENU);
            if (childElement) {
                slideDown(childElement, 0);
                const event = new Event(EVENT_LOAD_DATA_API);
                menuItem.dispatchEvent(event);
            }
        });
        const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE$1);
        button.forEach(btn => {
            btn.addEventListener('click', event => {
                const target = event.target;
                const targetItem = target.closest(SELECTOR_NAV_ITEM);
                const targetLink = target.closest(SELECTOR_NAV_LINK);
                const targetTreeviewMenu = targetItem?.querySelector(SELECTOR_TREEVIEW_MENU);
                const lteToggleElement = event.currentTarget;
                if (!targetTreeviewMenu) {
                    return;
                }
                if (target?.getAttribute('href') === '#' || targetLink?.getAttribute('href') === '#') {
                    event.preventDefault();
                }
                if (targetItem) {
                    const accordionAttr = lteToggleElement.dataset.accordion;
                    const animationSpeedAttr = lteToggleElement.dataset.animationSpeed;
                    const config = {
                        accordion: accordionAttr === undefined ? Default.accordion : accordionAttr === 'true',
                        animationSpeed: animationSpeedAttr === undefined ? Default.animationSpeed : Number(animationSpeedAttr)
                    };
                    const data = new Treeview(targetItem, config);
                    data.toggle();
                }
            });
        });
    });

    const DATA_KEY$2 = 'lte.direct-chat';
    const EVENT_KEY$2 = `.${DATA_KEY$2}`;
    const EVENT_EXPANDED = `expanded${EVENT_KEY$2}`;
    const EVENT_COLLAPSED = `collapsed${EVENT_KEY$2}`;
    const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="chat-pane"]';
    const SELECTOR_DIRECT_CHAT = '.direct-chat';
    const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open';
    class DirectChat {
        _element;
        constructor(element) {
            this._element = element;
        }
        toggle() {
            if (this._element.classList.contains(CLASS_NAME_DIRECT_CHAT_OPEN)) {
                const event = new Event(EVENT_COLLAPSED);
                this._element.classList.remove(CLASS_NAME_DIRECT_CHAT_OPEN);
                this._element.dispatchEvent(event);
            }
            else {
                const event = new Event(EVENT_EXPANDED);
                this._element.classList.add(CLASS_NAME_DIRECT_CHAT_OPEN);
                this._element.dispatchEvent(event);
            }
        }
    }
    onDOMContentLoaded(() => {
        const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE);
        button.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const chatPane = target.closest(SELECTOR_DIRECT_CHAT);
                if (chatPane) {
                    const data = new DirectChat(chatPane);
                    data.toggle();
                }
            });
        });
    });

    const DATA_KEY$1 = 'lte.fullscreen';
    const EVENT_KEY$1 = `.${DATA_KEY$1}`;
    const EVENT_MAXIMIZED = `maximized${EVENT_KEY$1}`;
    const EVENT_MINIMIZED = `minimized${EVENT_KEY$1}`;
    const SELECTOR_FULLSCREEN_TOGGLE = '[data-lte-toggle="fullscreen"]';
    const SELECTOR_MAXIMIZE_ICON = '[data-lte-icon="maximize"]';
    const SELECTOR_MINIMIZE_ICON = '[data-lte-icon="minimize"]';
    class FullScreen {
        _element;
        _config;
        constructor(element, config) {
            this._element = element;
            this._config = config;
        }
        inFullScreen() {
            const event = new Event(EVENT_MAXIMIZED);
            const iconMaximize = document.querySelector(SELECTOR_MAXIMIZE_ICON);
            const iconMinimize = document.querySelector(SELECTOR_MINIMIZE_ICON);
            void document.documentElement.requestFullscreen();
            if (iconMaximize) {
                iconMaximize.style.display = 'none';
            }
            if (iconMinimize) {
                iconMinimize.style.display = 'block';
            }
            this._element.dispatchEvent(event);
        }
        outFullscreen() {
            const event = new Event(EVENT_MINIMIZED);
            const iconMaximize = document.querySelector(SELECTOR_MAXIMIZE_ICON);
            const iconMinimize = document.querySelector(SELECTOR_MINIMIZE_ICON);
            void document.exitFullscreen();
            if (iconMaximize) {
                iconMaximize.style.display = 'block';
            }
            if (iconMinimize) {
                iconMinimize.style.display = 'none';
            }
            this._element.dispatchEvent(event);
        }
        toggleFullScreen() {
            if (document.fullscreenEnabled) {
                if (document.fullscreenElement) {
                    this.outFullscreen();
                }
                else {
                    this.inFullScreen();
                }
            }
        }
    }
    onDOMContentLoaded(() => {
        const buttons = document.querySelectorAll(SELECTOR_FULLSCREEN_TOGGLE);
        buttons.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const button = target.closest(SELECTOR_FULLSCREEN_TOGGLE);
                if (button) {
                    const data = new FullScreen(button, undefined);
                    data.toggleFullScreen();
                }
            });
        });
    });

    const DATA_KEY = 'lte.push-menu';
    const EVENT_KEY = `.${DATA_KEY}`;
    const EVENT_OPEN = `open${EVENT_KEY}`;
    const EVENT_COLLAPSE = `collapse${EVENT_KEY}`;
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
        sidebarBreakpoint: 992,
        enablePersistence: false
    };
    class PushMenu {
        _element;
        _config;
        constructor(element, config) {
            this._element = element;
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
            document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE);
            if (this.isMobileSize()) {
                document.body.classList.add(CLASS_NAME_SIDEBAR_OPEN);
            }
            this._element.dispatchEvent(new Event(EVENT_OPEN));
        }
        collapse() {
            document.body.classList.remove(CLASS_NAME_SIDEBAR_OPEN);
            document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE);
            this._element.dispatchEvent(new Event(EVENT_COLLAPSE));
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
            else {
                this.updateStateByResponsiveLogic();
            }
        }
    }
    onDOMContentLoaded(() => {
        const sidebar = document?.querySelector(SELECTOR_APP_SIDEBAR);
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
        const pushMenu = new PushMenu(sidebar, config);
        pushMenu.init();
        window.addEventListener('resize', () => {
            pushMenu.setupSidebarBreakPoint();
            pushMenu.updateStateByResponsiveLogic();
        });
        const sidebarOverlay = document.createElement('div');
        sidebarOverlay.className = CLASS_NAME_SIDEBAR_OVERLAY;
        document.querySelector(SELECTOR_APP_WRAPPER)?.append(sidebarOverlay);
        let overlayTouchMoved = false;
        sidebarOverlay.addEventListener('touchstart', () => {
            overlayTouchMoved = false;
        }, { passive: true });
        sidebarOverlay.addEventListener('touchmove', () => {
            overlayTouchMoved = true;
        }, { passive: true });
        sidebarOverlay.addEventListener('touchend', event => {
            if (!overlayTouchMoved) {
                event.preventDefault();
                pushMenu.collapse();
            }
            overlayTouchMoved = false;
        }, { passive: false });
        sidebarOverlay.addEventListener('click', event => {
            event.preventDefault();
            pushMenu.collapse();
        });
        const fullBtn = document.querySelectorAll(SELECTOR_SIDEBAR_TOGGLE);
        fullBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                let button = event.currentTarget;
                if (button?.dataset.lteToggle !== 'sidebar') {
                    button = button?.closest(SELECTOR_SIDEBAR_TOGGLE);
                }
                if (button) {
                    event?.preventDefault();
                    pushMenu.toggle();
                }
            });
        });
    });

    class AccessibilityManager {
        config;
        liveRegion = null;
        focusHistory = [];
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
            this.liveRegion = document.createElement('div');
            this.liveRegion.id = 'live-region';
            this.liveRegion.className = 'live-region';
            this.liveRegion.setAttribute('aria-live', 'polite');
            this.liveRegion.setAttribute('aria-atomic', 'true');
            this.liveRegion.setAttribute('role', 'status');
            document.body.append(this.liveRegion);
        }
        addSkipLinks() {
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
            const main = document.querySelector('#main, main, [role="main"]');
            if (main && !main.id) {
                main.id = 'main';
            }
            if (main && !main.hasAttribute('tabindex')) {
                main.setAttribute('tabindex', '-1');
            }
            const nav = document.querySelector('#navigation, nav, [role="navigation"]');
            if (nav && !nav.id) {
                nav.id = 'navigation';
            }
            if (nav && !nav.hasAttribute('tabindex')) {
                nav.setAttribute('tabindex', '-1');
            }
        }
        initFocusManagement() {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    this.handleTabNavigation(event);
                }
                if (event.key === 'Escape') {
                    this.handleEscapeKey(event);
                }
            });
            this.initModalFocusManagement();
            this.initDropdownFocusManagement();
        }
        handleTabNavigation(event) {
            const focusableElements = this.getFocusableElements();
            const currentIndex = focusableElements.indexOf(document.activeElement);
            if (event.shiftKey) {
                if (currentIndex <= 0) {
                    event.preventDefault();
                    focusableElements.at(-1)?.focus();
                }
            }
            else if (currentIndex >= focusableElements.length - 1) {
                event.preventDefault();
                focusableElements[0]?.focus();
            }
        }
        getFocusableElements() {
            const selector = [
                'a[href]',
                'button:not([disabled])',
                'input:not([disabled])',
                'select:not([disabled])',
                'textarea:not([disabled])',
                '[tabindex]:not([tabindex="-1"])',
                '[contenteditable="true"]'
            ].join(', ');
            return Array.from(document.querySelectorAll(selector));
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
                if (target.closest('.nav, .navbar-nav, .dropdown-menu')) {
                    this.handleMenuNavigation(event);
                }
                if ((event.key === 'Enter' || event.key === ' ') && target.hasAttribute('role') && target.getAttribute('role') === 'button' && !target.matches('button, input[type="button"], input[type="submit"]')) {
                    event.preventDefault();
                    target.click();
                }
            });
        }
        handleMenuNavigation(event) {
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                return;
            }
            const currentElement = event.target;
            const menuItems = Array.from(currentElement.closest('.nav, .navbar-nav, .dropdown-menu')?.querySelectorAll('a, button') || []);
            const currentIndex = menuItems.indexOf(currentElement);
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
                const style = document.createElement('style');
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
                    });
                }
            });
        }
        handleFormError(input) {
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
            input.setAttribute('aria-describedby', errorId);
            input.classList.add('is-invalid');
            this.announce(`Error in ${input.labels?.[0]?.textContent || input.name}: ${input.validationMessage}`, 'assertive');
        }
        initModalFocusManagement() {
            document.addEventListener('shown.bs.modal', (event) => {
                const modal = event.target;
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
                this.focusHistory.push(document.activeElement);
            });
            document.addEventListener('hidden.bs.modal', () => {
                const previousElement = this.focusHistory.pop();
                if (previousElement) {
                    previousElement.focus();
                }
            });
        }
        initDropdownFocusManagement() {
            document.addEventListener('shown.bs.dropdown', (event) => {
                const dropdown = event.target;
                const menu = dropdown.querySelector('.dropdown-menu');
                const firstItem = menu?.querySelector('a, button');
                if (firstItem) {
                    firstItem.focus();
                }
            });
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
            });
        }
        addLandmarks() {
            const main = document.querySelector('main');
            if (!main) {
                const appMain = document.querySelector('.app-main');
                if (appMain) {
                    appMain.setAttribute('role', 'main');
                    appMain.id = 'main';
                }
            }
            document.querySelectorAll('.navbar-nav, .nav').forEach((nav, index) => {
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
    exports.DirectChat = DirectChat;
    exports.FullScreen = FullScreen;
    exports.Layout = Layout;
    exports.PushMenu = PushMenu;
    exports.Treeview = Treeview;
    exports.initAccessibility = initAccessibility;

}));
//# sourceMappingURL=adminlte.js.map
