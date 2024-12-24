/*!
 * AdminLTE v4.0.0-beta3 (https://adminlte.io)
 * Copyright 2014-2024 Colorlib <https://colorlib.com>
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
            // add listener on the first call when the document is in loading state
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
    /* SLIDE UP */
    const slideUp = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = `${duration}ms`;
        target.style.boxSizing = 'border-box';
        target.style.height = `${target.offsetHeight}px`;
        target.style.overflow = 'hidden';
        window.setTimeout(() => {
            target.style.height = '0';
            target.style.paddingTop = '0';
            target.style.paddingBottom = '0';
            target.style.marginTop = '0';
            target.style.marginBottom = '0';
        }, 1);
        window.setTimeout(() => {
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
    /* SLIDE DOWN */
    const slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');
        let { display } = window.getComputedStyle(target);
        if (display === 'none') {
            display = 'block';
        }
        target.style.display = display;
        const height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = '0';
        target.style.paddingTop = '0';
        target.style.paddingBottom = '0';
        target.style.marginTop = '0';
        target.style.marginBottom = '0';
        window.setTimeout(() => {
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = `${duration}ms`;
            target.style.height = `${height}px`;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
        }, 1);
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    };

    /**
     * --------------------------------------------
     * @file AdminLTE layout.ts
     * @description Layout for AdminLTE.
     * @license MIT
     * --------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    const CLASS_NAME_HOLD_TRANSITIONS = 'hold-transition';
    const CLASS_NAME_APP_LOADED = 'app-loaded';
    /**
     * Class Definition
     * ====================================================
     */
    class Layout {
        constructor(element) {
            this._element = element;
        }
        holdTransition() {
            let resizeTimer;
            window.addEventListener('resize', () => {
                document.body.classList.add(CLASS_NAME_HOLD_TRANSITIONS);
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    document.body.classList.remove(CLASS_NAME_HOLD_TRANSITIONS);
                }, 400);
            });
        }
    }
    onDOMContentLoaded(() => {
        const data = new Layout(document.body);
        data.holdTransition();
        setTimeout(() => {
            document.body.classList.add(CLASS_NAME_APP_LOADED);
        }, 400);
    });

    /**
     * --------------------------------------------
     * @file AdminLTE push-menu.ts
     * @description Push menu for AdminLTE.
     * @license MIT
     * --------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    const DATA_KEY$4 = 'lte.push-menu';
    const EVENT_KEY$4 = `.${DATA_KEY$4}`;
    const EVENT_OPEN = `open${EVENT_KEY$4}`;
    const EVENT_COLLAPSE = `collapse${EVENT_KEY$4}`;
    const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini';
    const CLASS_NAME_SIDEBAR_COLLAPSE = 'sidebar-collapse';
    const CLASS_NAME_SIDEBAR_OPEN = 'sidebar-open';
    const CLASS_NAME_SIDEBAR_EXPAND = 'sidebar-expand';
    const CLASS_NAME_SIDEBAR_OVERLAY = 'sidebar-overlay';
    const CLASS_NAME_MENU_OPEN$1 = 'menu-open';
    const SELECTOR_APP_SIDEBAR = '.app-sidebar';
    const SELECTOR_SIDEBAR_MENU = '.sidebar-menu';
    const SELECTOR_NAV_ITEM$1 = '.nav-item';
    const SELECTOR_NAV_TREEVIEW = '.nav-treeview';
    const SELECTOR_APP_WRAPPER = '.app-wrapper';
    const SELECTOR_SIDEBAR_EXPAND = `[class*="${CLASS_NAME_SIDEBAR_EXPAND}"]`;
    const SELECTOR_SIDEBAR_TOGGLE = '[data-lte-toggle="sidebar"]';
    const Defaults = {
        sidebarBreakpoint: 992
    };
    /**
     * Class Definition
     * ====================================================
     */
    class PushMenu {
        constructor(element, config) {
            this._element = element;
            this._config = Object.assign(Object.assign({}, Defaults), config);
        }
        // TODO
        menusClose() {
            const navTreeview = document.querySelectorAll(SELECTOR_NAV_TREEVIEW);
            navTreeview.forEach(navTree => {
                navTree.style.removeProperty('display');
                navTree.style.removeProperty('height');
            });
            const navSidebar = document.querySelector(SELECTOR_SIDEBAR_MENU);
            const navItem = navSidebar === null || navSidebar === void 0 ? void 0 : navSidebar.querySelectorAll(SELECTOR_NAV_ITEM$1);
            if (navItem) {
                navItem.forEach(navI => {
                    navI.classList.remove(CLASS_NAME_MENU_OPEN$1);
                });
            }
        }
        expand() {
            const event = new Event(EVENT_OPEN);
            document.body.classList.remove(CLASS_NAME_SIDEBAR_COLLAPSE);
            document.body.classList.add(CLASS_NAME_SIDEBAR_OPEN);
            this._element.dispatchEvent(event);
        }
        collapse() {
            const event = new Event(EVENT_COLLAPSE);
            document.body.classList.remove(CLASS_NAME_SIDEBAR_OPEN);
            document.body.classList.add(CLASS_NAME_SIDEBAR_COLLAPSE);
            this._element.dispatchEvent(event);
        }
        addSidebarBreakPoint() {
            var _a, _b, _c;
            const sidebarExpandList = (_b = (_a = document.querySelector(SELECTOR_SIDEBAR_EXPAND)) === null || _a === void 0 ? void 0 : _a.classList) !== null && _b !== void 0 ? _b : [];
            const sidebarExpand = (_c = Array.from(sidebarExpandList).find(className => className.startsWith(CLASS_NAME_SIDEBAR_EXPAND))) !== null && _c !== void 0 ? _c : '';
            const sidebar = document.getElementsByClassName(sidebarExpand)[0];
            const sidebarContent = window.getComputedStyle(sidebar, '::before').getPropertyValue('content');
            this._config = Object.assign(Object.assign({}, this._config), { sidebarBreakpoint: Number(sidebarContent.replace(/[^\d.-]/g, '')) });
            if (window.innerWidth <= this._config.sidebarBreakpoint) {
                this.collapse();
            }
            else {
                if (!document.body.classList.contains(CLASS_NAME_SIDEBAR_MINI)) {
                    this.expand();
                }
                if (document.body.classList.contains(CLASS_NAME_SIDEBAR_MINI) && document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
                    this.collapse();
                }
            }
        }
        toggle() {
            if (document.body.classList.contains(CLASS_NAME_SIDEBAR_COLLAPSE)) {
                this.expand();
            }
            else {
                this.collapse();
            }
        }
        init() {
            this.addSidebarBreakPoint();
        }
    }
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    onDOMContentLoaded(() => {
        var _a;
        const sidebar = document === null || document === void 0 ? void 0 : document.querySelector(SELECTOR_APP_SIDEBAR);
        if (sidebar) {
            const data = new PushMenu(sidebar, Defaults);
            data.init();
            window.addEventListener('resize', () => {
                data.init();
            });
        }
        const sidebarOverlay = document.createElement('div');
        sidebarOverlay.className = CLASS_NAME_SIDEBAR_OVERLAY;
        (_a = document.querySelector(SELECTOR_APP_WRAPPER)) === null || _a === void 0 ? void 0 : _a.append(sidebarOverlay);
        sidebarOverlay.addEventListener('touchstart', event => {
            event.preventDefault();
            const target = event.currentTarget;
            const data = new PushMenu(target, Defaults);
            data.collapse();
        }, { passive: true });
        sidebarOverlay.addEventListener('click', event => {
            event.preventDefault();
            const target = event.currentTarget;
            const data = new PushMenu(target, Defaults);
            data.collapse();
        });
        const fullBtn = document.querySelectorAll(SELECTOR_SIDEBAR_TOGGLE);
        fullBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                let button = event.currentTarget;
                if ((button === null || button === void 0 ? void 0 : button.dataset.lteToggle) !== 'sidebar') {
                    button = button === null || button === void 0 ? void 0 : button.closest(SELECTOR_SIDEBAR_TOGGLE);
                }
                if (button) {
                    event === null || event === void 0 ? void 0 : event.preventDefault();
                    const data = new PushMenu(button, Defaults);
                    data.toggle();
                }
            });
        });
    });

    /**
     * --------------------------------------------
     * @file AdminLTE treeview.ts
     * @description Treeview plugin for AdminLTE.
     * @license MIT
     * --------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    // const NAME = 'Treeview'
    const DATA_KEY$3 = 'lte.treeview';
    const EVENT_KEY$3 = `.${DATA_KEY$3}`;
    const EVENT_EXPANDED$2 = `expanded${EVENT_KEY$3}`;
    const EVENT_COLLAPSED$2 = `collapsed${EVENT_KEY$3}`;
    // const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`
    const CLASS_NAME_MENU_OPEN = 'menu-open';
    const SELECTOR_NAV_ITEM = '.nav-item';
    const SELECTOR_NAV_LINK = '.nav-link';
    const SELECTOR_TREEVIEW_MENU = '.nav-treeview';
    const SELECTOR_DATA_TOGGLE$1 = '[data-lte-toggle="treeview"]';
    const Default$1 = {
        animationSpeed: 300,
        accordion: true
    };
    /**
     * Class Definition
     * ====================================================
     */
    class Treeview {
        constructor(element, config) {
            this._element = element;
            this._config = Object.assign(Object.assign({}, Default$1), config);
        }
        open() {
            var _a, _b;
            const event = new Event(EVENT_EXPANDED$2);
            if (this._config.accordion) {
                const openMenuList = (_a = this._element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`${SELECTOR_NAV_ITEM}.${CLASS_NAME_MENU_OPEN}`);
                openMenuList === null || openMenuList === void 0 ? void 0 : openMenuList.forEach(openMenu => {
                    if (openMenu !== this._element.parentElement) {
                        openMenu.classList.remove(CLASS_NAME_MENU_OPEN);
                        const childElement = openMenu === null || openMenu === void 0 ? void 0 : openMenu.querySelector(SELECTOR_TREEVIEW_MENU);
                        if (childElement) {
                            slideUp(childElement, this._config.animationSpeed);
                        }
                    }
                });
            }
            this._element.classList.add(CLASS_NAME_MENU_OPEN);
            const childElement = (_b = this._element) === null || _b === void 0 ? void 0 : _b.querySelector(SELECTOR_TREEVIEW_MENU);
            if (childElement) {
                slideDown(childElement, this._config.animationSpeed);
            }
            this._element.dispatchEvent(event);
        }
        close() {
            var _a;
            const event = new Event(EVENT_COLLAPSED$2);
            this._element.classList.remove(CLASS_NAME_MENU_OPEN);
            const childElement = (_a = this._element) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_TREEVIEW_MENU);
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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    onDOMContentLoaded(() => {
        const button = document.querySelectorAll(SELECTOR_DATA_TOGGLE$1);
        button.forEach(btn => {
            btn.addEventListener('click', event => {
                const target = event.target;
                const targetItem = target.closest(SELECTOR_NAV_ITEM);
                const targetLink = target.closest(SELECTOR_NAV_LINK);
                if ((target === null || target === void 0 ? void 0 : target.getAttribute('href')) === '#' || (targetLink === null || targetLink === void 0 ? void 0 : targetLink.getAttribute('href')) === '#') {
                    event.preventDefault();
                }
                if (targetItem) {
                    const data = new Treeview(targetItem, Default$1);
                    data.toggle();
                }
            });
        });
    });

    /**
     * --------------------------------------------
     * @file AdminLTE direct-chat.ts
     * @description Direct chat for AdminLTE.
     * @license MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const DATA_KEY$2 = 'lte.direct-chat';
    const EVENT_KEY$2 = `.${DATA_KEY$2}`;
    const EVENT_EXPANDED$1 = `expanded${EVENT_KEY$2}`;
    const EVENT_COLLAPSED$1 = `collapsed${EVENT_KEY$2}`;
    const SELECTOR_DATA_TOGGLE = '[data-lte-toggle="chat-pane"]';
    const SELECTOR_DIRECT_CHAT = '.direct-chat';
    const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open';
    /**
     * Class Definition
     * ====================================================
     */
    class DirectChat {
        constructor(element) {
            this._element = element;
        }
        toggle() {
            if (this._element.classList.contains(CLASS_NAME_DIRECT_CHAT_OPEN)) {
                const event = new Event(EVENT_COLLAPSED$1);
                this._element.classList.remove(CLASS_NAME_DIRECT_CHAT_OPEN);
                this._element.dispatchEvent(event);
            }
            else {
                const event = new Event(EVENT_EXPANDED$1);
                this._element.classList.add(CLASS_NAME_DIRECT_CHAT_OPEN);
                this._element.dispatchEvent(event);
            }
        }
    }
    /**
     *
     * Data Api implementation
     * ====================================================
     */
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

    /**
     * --------------------------------------------
     * @file AdminLTE card-widget.ts
     * @description Card widget for AdminLTE.
     * @license MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const DATA_KEY$1 = 'lte.card-widget';
    const EVENT_KEY$1 = `.${DATA_KEY$1}`;
    const EVENT_COLLAPSED = `collapsed${EVENT_KEY$1}`;
    const EVENT_EXPANDED = `expanded${EVENT_KEY$1}`;
    const EVENT_REMOVE = `remove${EVENT_KEY$1}`;
    const EVENT_MAXIMIZED$1 = `maximized${EVENT_KEY$1}`;
    const EVENT_MINIMIZED$1 = `minimized${EVENT_KEY$1}`;
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
    const Default = {
        animationSpeed: 500,
        collapseTrigger: SELECTOR_DATA_COLLAPSE,
        removeTrigger: SELECTOR_DATA_REMOVE,
        maximizeTrigger: SELECTOR_DATA_MAXIMIZE
    };
    class CardWidget {
        constructor(element, config) {
            this._element = element;
            this._parent = element.closest(SELECTOR_CARD);
            if (element.classList.contains(CLASS_NAME_CARD)) {
                this._parent = element;
            }
            this._config = Object.assign(Object.assign({}, Default), config);
        }
        collapse() {
            var _a, _b;
            const event = new Event(EVENT_COLLAPSED);
            if (this._parent) {
                this._parent.classList.add(CLASS_NAME_COLLAPSING);
                const elm = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`);
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
            (_b = this._element) === null || _b === void 0 ? void 0 : _b.dispatchEvent(event);
        }
        expand() {
            var _a, _b;
            const event = new Event(EVENT_EXPANDED);
            if (this._parent) {
                this._parent.classList.add(CLASS_NAME_EXPANDING);
                const elm = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`);
                elm.forEach(el => {
                    if (el instanceof HTMLElement) {
                        slideDown(el, this._config.animationSpeed);
                    }
                });
                setTimeout(() => {
                    if (this._parent) {
                        this._parent.classList.remove(CLASS_NAME_COLLAPSED);
                        this._parent.classList.remove(CLASS_NAME_EXPANDING);
                    }
                }, this._config.animationSpeed);
            }
            (_b = this._element) === null || _b === void 0 ? void 0 : _b.dispatchEvent(event);
        }
        remove() {
            var _a;
            const event = new Event(EVENT_REMOVE);
            if (this._parent) {
                slideUp(this._parent, this._config.animationSpeed);
            }
            (_a = this._element) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
        }
        toggle() {
            var _a;
            if ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.classList.contains(CLASS_NAME_COLLAPSED)) {
                this.expand();
                return;
            }
            this.collapse();
        }
        maximize() {
            var _a;
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
            (_a = this._element) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
        }
        minimize() {
            var _a;
            const event = new Event(EVENT_MINIMIZED$1);
            if (this._parent) {
                this._parent.style.height = 'auto';
                this._parent.style.width = 'auto';
                this._parent.style.transition = 'all .15s';
                setTimeout(() => {
                    var _a;
                    const htmlTag = document.querySelector('html');
                    if (htmlTag) {
                        htmlTag.classList.remove(CLASS_NAME_MAXIMIZED);
                    }
                    if (this._parent) {
                        this._parent.classList.remove(CLASS_NAME_MAXIMIZED);
                        if ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.classList.contains(CLASS_NAME_WAS_COLLAPSED)) {
                            this._parent.classList.remove(CLASS_NAME_WAS_COLLAPSED);
                        }
                    }
                }, 10);
            }
            (_a = this._element) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
        }
        toggleMaximize() {
            var _a;
            if ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.classList.contains(CLASS_NAME_MAXIMIZED)) {
                this.minimize();
                return;
            }
            this.maximize();
        }
    }
    /**
     *
     * Data Api implementation
     * ====================================================
     */
    onDOMContentLoaded(() => {
        const collapseBtn = document.querySelectorAll(SELECTOR_DATA_COLLAPSE);
        collapseBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default);
                data.toggle();
            });
        });
        const removeBtn = document.querySelectorAll(SELECTOR_DATA_REMOVE);
        removeBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default);
                data.remove();
            });
        });
        const maxBtn = document.querySelectorAll(SELECTOR_DATA_MAXIMIZE);
        maxBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const data = new CardWidget(target, Default);
                data.toggleMaximize();
            });
        });
    });

    /**
     * --------------------------------------------
     * @file AdminLTE fullscreen.ts
     * @description Fullscreen plugin for AdminLTE.
     * @license MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ============================================================================
     */
    const DATA_KEY = 'lte.fullscreen';
    const EVENT_KEY = `.${DATA_KEY}`;
    const EVENT_MAXIMIZED = `maximized${EVENT_KEY}`;
    const EVENT_MINIMIZED = `minimized${EVENT_KEY}`;
    const SELECTOR_FULLSCREEN_TOGGLE = '[data-lte-toggle="fullscreen"]';
    const SELECTOR_MAXIMIZE_ICON = '[data-lte-icon="maximize"]';
    const SELECTOR_MINIMIZE_ICON = '[data-lte-icon="minimize"]';
    /**
     * Class Definition.
     * ============================================================================
     */
    class FullScreen {
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
    /**
     * Data Api implementation
     * ============================================================================
     */
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

    exports.CardWidget = CardWidget;
    exports.DirectChat = DirectChat;
    exports.FullScreen = FullScreen;
    exports.Layout = Layout;
    exports.PushMenu = PushMenu;
    exports.Treeview = Treeview;

}));
//# sourceMappingURL=adminlte.js.map
