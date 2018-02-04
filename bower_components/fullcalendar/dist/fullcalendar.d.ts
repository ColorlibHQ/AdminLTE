declare module 'fullcalendar/src/util' {
	import * as moment from 'moment';
	export function compensateScroll(rowEls: any, scrollbarWidths: any): void;
	export function uncompensateScroll(rowEls: any): void;
	export function disableCursor(): void;
	export function enableCursor(): void;
	export function distributeHeight(els: any, availableHeight: any, shouldRedistribute: any): void;
	export function undistributeHeight(els: any): void;
	export function matchCellWidths(els: any): number;
	export function subtractInnerElHeight(outerEl: any, innerEl: any): any;
	export function getScrollParent(el: any): any;
	export function getOuterRect(el: any, origin?: any): {
	    left: number;
	    right: any;
	    top: number;
	    bottom: any;
	};
	export function getClientRect(el: any, origin?: any): {
	    left: number;
	    right: any;
	    top: number;
	    bottom: any;
	};
	export function getContentRect(el: any, origin: any): {
	    left: number;
	    right: any;
	    top: number;
	    bottom: any;
	};
	export function getScrollbarWidths(el: any): any;
	export function isPrimaryMouseButton(ev: any): boolean;
	export function getEvX(ev: any): any;
	export function getEvY(ev: any): any;
	export function getEvIsTouch(ev: any): boolean;
	export function preventSelection(el: any): void;
	export function allowSelection(el: any): void;
	export function preventDefault(ev: any): void;
	export function intersectRects(rect1: any, rect2: any): false | {
	    left: number;
	    right: number;
	    top: number;
	    bottom: number;
	};
	export function constrainPoint(point: any, rect: any): {
	    left: number;
	    top: number;
	};
	export function getRectCenter(rect: any): {
	    left: number;
	    top: number;
	};
	export function diffPoints(point1: any, point2: any): {
	    left: number;
	    top: number;
	};
	export function parseFieldSpecs(input: any): any[];
	export function compareByFieldSpecs(obj1: any, obj2: any, fieldSpecs: any, obj1fallback?: any, obj2fallback?: any): any;
	export function compareByFieldSpec(obj1: any, obj2: any, fieldSpec: any, obj1fallback: any, obj2fallback: any): any;
	export function flexibleCompare(a: any, b: any): number;
	export const dayIDs: string[];
	export const unitsDesc: string[];
	export function diffDayTime(a: any, b: any): moment.Duration;
	export function diffDay(a: any, b: any): moment.Duration;
	export function diffByUnit(a: any, b: any, unit: any): moment.Duration;
	export function computeGreatestUnit(start: any, end?: any): any;
	export function computeDurationGreatestUnit(duration: any, durationInput: any): any;
	export function divideRangeByDuration(start: any, end: any, dur: any): number;
	export function divideDurationByDuration(dur1: any, dur2: any): number;
	export function multiplyDuration(dur: any, n: any): moment.Duration;
	export function durationHasTime(dur: any): boolean;
	export function isNativeDate(input: any): boolean;
	export function isTimeString(str: any): boolean;
	export function log(...args: any[]): any;
	export function warn(...args: any[]): any;
	export function mergeProps(propObjs: any, complexProps?: any): {};
	export function copyOwnProps(src: any, dest: any): void;
	export function hasOwnProp(obj: any, name: any): any;
	export function applyAll(functions: any, thisObj: any, args: any): any;
	export function removeMatching(array: any, testFunc: any): number;
	export function removeExact(array: any, exactVal: any): number;
	export function isArraysEqual(a0: any, a1: any): boolean;
	export function firstDefined(...args: any[]): any;
	export function htmlEscape(s: any): string;
	export function stripHtmlEntities(text: any): any;
	export function cssToStr(cssProps: any): string;
	export function attrsToStr(attrs: any): string;
	export function capitaliseFirstLetter(str: any): any;
	export function compareNumbers(a: any, b: any): number;
	export function isInt(n: any): boolean;
	export function proxy(obj: any, methodName: any): () => any;
	export function debounce(func: any, wait: any, immediate?: boolean): () => any;
}
declare module 'fullcalendar/Mixin' {
	export class Default {
	    static mixInto(destClass: any): void;
	    static mixOver(destClass: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/EmitterMixin' {
	import Mixin from 'fullcalendar/Mixin';
	export interface EmitterInterface {
	    on(types: any, handler: any): any;
	    one(types: any, handler: any): any;
	    off(types: any, handler: any): any;
	    trigger(types: any, ...args: any[]): any;
	    triggerWith(types: any, context: any, args: any): any;
	    hasHandlers(type: any): any;
	}
	export class Default extends Mixin implements EmitterInterface {
	    on(types: any, handler: any): this;
	    one(types: any, handler: any): this;
	    _prepareIntercept(handler: any): (ev: any, extra: any) => any;
	    off(types: any, handler: any): this;
	    trigger(types: any, ...args: any[]): this;
	    triggerWith(types: any, context: any, args: any): this;
	    hasHandlers(type: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/TaskQueue' {
	import { EmitterInterface } from 'fullcalendar/EmitterMixin';
	export class Default {
	    on: EmitterInterface['on'];
	    one: EmitterInterface['one'];
	    off: EmitterInterface['off'];
	    trigger: EmitterInterface['trigger'];
	    triggerWith: EmitterInterface['triggerWith'];
	    hasHandlers: EmitterInterface['hasHandlers'];
	    q: any;
	    isPaused: boolean;
	    isRunning: boolean;
	    queue(...args: any[]): void;
	    pause(): void;
	    resume(): void;
	    getIsIdle(): boolean;
	    tryStart(): void;
	    canRunNext(): any;
	    runRemaining(): void;
	    runTask(task: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/RenderQueue' {
	import TaskQueue from 'fullcalendar/TaskQueue';
	export class Default extends TaskQueue {
	    waitsByNamespace: any;
	    waitNamespace: any;
	    waitId: any;
	    constructor(waitsByNamespace: any);
	    queue(taskFunc: any, namespace: any, type: any): void;
	    startWait(namespace: any, waitMs: any): void;
	    delayWait(waitMs: any): void;
	    spawnWait(waitMs: any): void;
	    clearWait(): void;
	    canRunNext(): boolean;
	    runTask(task: any): void;
	    compoundTask(newTask: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/src/options' {
	export const globalDefaults: {
	    titleRangeSeparator: string;
	    monthYearFormat: string;
	    defaultTimedEventDuration: string;
	    defaultAllDayEventDuration: {
	        days: number;
	    };
	    forceEventDuration: boolean;
	    nextDayThreshold: string;
	    columnHeader: boolean;
	    defaultView: string;
	    aspectRatio: number;
	    header: {
	        left: string;
	        center: string;
	        right: string;
	    };
	    weekends: boolean;
	    weekNumbers: boolean;
	    weekNumberTitle: string;
	    weekNumberCalculation: string;
	    scrollTime: string;
	    minTime: string;
	    maxTime: string;
	    showNonCurrentDates: boolean;
	    lazyFetching: boolean;
	    startParam: string;
	    endParam: string;
	    timezoneParam: string;
	    timezone: boolean;
	    locale: any;
	    isRTL: boolean;
	    buttonText: {
	        prev: string;
	        next: string;
	        prevYear: string;
	        nextYear: string;
	        year: string;
	        today: string;
	        month: string;
	        week: string;
	        day: string;
	    };
	    allDayText: string;
	    agendaEventMinHeight: number;
	    theme: boolean;
	    dragOpacity: number;
	    dragRevertDuration: number;
	    dragScroll: boolean;
	    unselectAuto: boolean;
	    dropAccept: string;
	    eventOrder: string;
	    eventLimit: boolean;
	    eventLimitText: string;
	    eventLimitClick: string;
	    dayPopoverFormat: string;
	    handleWindowResize: boolean;
	    windowResizeDelay: number;
	    longPressDelay: number;
	};
	export const englishDefaults: {
	    dayPopoverFormat: string;
	};
	export const rtlDefaults: {
	    header: {
	        left: string;
	        center: string;
	        right: string;
	    };
	    buttonIcons: {
	        prev: string;
	        next: string;
	        prevYear: string;
	        nextYear: string;
	    };
	    themeButtonIcons: {
	        prev: string;
	        next: string;
	        nextYear: string;
	        prevYear: string;
	    };
	};
	export function mergeOptions(optionObjs: any): {};
}
declare module 'fullcalendar/Iterator' {
	export class Default {
	    items: any;
	    constructor(items: any);
	    proxyCall(methodName: any, ...args: any[]): any[];
	}
	export default Default;
}
declare module 'fullcalendar/ListenerMixin' {
	import Mixin from 'fullcalendar/Mixin';
	export interface ListenerInterface {
	    listenTo(other: any, arg: any, callback?: any): any;
	    stopListeningTo(other: any, eventName?: any): any;
	}
	export class Default extends Mixin implements ListenerInterface {
	    listenerId: any;
	    listenTo(other: any, arg: any, callback?: any): void;
	    stopListeningTo(other: any, eventName?: any): void;
	    getListenerNamespace(): string;
	}
	export default Default;
}
declare module 'fullcalendar/GlobalEmitter' {
	import { EmitterInterface } from 'fullcalendar/EmitterMixin';
	import { ListenerInterface } from 'fullcalendar/ListenerMixin';
	export class Default {
	    on: EmitterInterface['on'];
	    one: EmitterInterface['one'];
	    off: EmitterInterface['off'];
	    trigger: EmitterInterface['trigger'];
	    triggerWith: EmitterInterface['triggerWith'];
	    hasHandlers: EmitterInterface['hasHandlers'];
	    listenTo: ListenerInterface['listenTo'];
	    stopListeningTo: ListenerInterface['stopListeningTo'];
	    isTouching: boolean;
	    mouseIgnoreDepth: number;
	    handleScrollProxy: (ev: Event) => void;
	    handleTouchMoveProxy: (ev: Event) => void;
	    static get(): any;
	    static needed(): void;
	    static unneeded(): void;
	    bind(): void;
	    unbind(): void;
	    handleTouchStart(ev: any): void;
	    handleTouchMove(ev: any): void;
	    handleTouchCancel(ev: any): void;
	    handleTouchEnd(ev: any): void;
	    handleMouseDown(ev: any): void;
	    handleMouseMove(ev: any): void;
	    handleMouseUp(ev: any): void;
	    handleClick(ev: any): void;
	    handleSelectStart(ev: any): void;
	    handleContextMenu(ev: any): void;
	    handleScroll(ev: any): void;
	    stopTouch(ev: any, skipMouseIgnore?: boolean): void;
	    startTouchMouseIgnore(): void;
	    shouldIgnoreMouse(): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/Toolbar' {
	export class Default {
	    calendar: any;
	    toolbarOptions: any;
	    el: any;
	    viewsWithButtons: any;
	    constructor(calendar: any, toolbarOptions: any);
	    setToolbarOptions(newToolbarOptions: any): void;
	    render(): void;
	    removeElement(): void;
	    renderSection(position: any): JQuery;
	    updateTitle(text: any): void;
	    activateButton(buttonName: any): void;
	    deactivateButton(buttonName: any): void;
	    disableButton(buttonName: any): void;
	    enableButton(buttonName: any): void;
	    getViewsWithButtons(): any;
	}
	export default Default;
}
declare module 'fullcalendar/src/locale' {
	import * as moment from 'moment';
	export const localeOptionHash: {};
	export function populateInstanceComputableOptions(options: any): void;
	export function datepickerLocale(localeCode: any, dpLocaleCode: any, dpOptions: any): void;
	export function locale(localeCode: any, newFcOptions: any): void;
	export function getMomentLocaleData(localeCode: any): moment.Locale;
}
declare module 'fullcalendar/Class' {
	export class Default {
	    static extend(members: any): any;
	    static mixin(members: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/Model' {
	import Class from 'fullcalendar/Class';
	import { EmitterInterface } from 'fullcalendar/EmitterMixin';
	import { ListenerInterface } from 'fullcalendar/ListenerMixin';
	export class Default extends Class {
	    on: EmitterInterface['on'];
	    one: EmitterInterface['one'];
	    off: EmitterInterface['off'];
	    trigger: EmitterInterface['trigger'];
	    triggerWith: EmitterInterface['triggerWith'];
	    hasHandlers: EmitterInterface['hasHandlers'];
	    listenTo: ListenerInterface['listenTo'];
	    stopListeningTo: ListenerInterface['stopListeningTo'];
	    _props: any;
	    _watchers: any;
	    _globalWatchArgs: any;
	    constructor();
	    static watch(name: any, ...args: any[]): void;
	    constructed(): void;
	    applyGlobalWatchers(): void;
	    has(name: any): boolean;
	    get(name: any): any;
	    set(name: any, val: any): void;
	    reset(newProps: any): void;
	    unset(name: any): void;
	    setProps(newProps: any): void;
	    watch(name: any, depList: any, startFunc: any, stopFunc?: any): void;
	    unwatch(name: any): void;
	    _watchDeps(depList: any, startFunc: any, stopFunc: any): {
	        teardown: () => void;
	        flash: () => void;
	    };
	    flash(name: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/OptionsManager' {
	import Model from 'fullcalendar/Model';
	export class Default extends Model {
	    _calendar: any;
	    dirDefaults: any;
	    localeDefaults: any;
	    overrides: any;
	    dynamicOverrides: any;
	    constructor(_calendar: any, overrides: any);
	    add(newOptionHash: any): void;
	    compute(): void;
	    recordOverrides(newOptionHash: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/ViewRegistry' {
	export const viewHash: {};
	export function defineView(viewName: any, viewConfig: any): void;
	export function getViewConfig(viewName: any): any;
}
declare module 'fullcalendar/ViewSpecManager' {
	export class Default {
	    _calendar: any;
	    optionsManager: any;
	    viewSpecCache: any;
	    constructor(optionsManager: any, _calendar: any);
	    clearCache(): void;
	    getViewSpec(viewType: any): any;
	    getUnitViewSpec(unit: any): any;
	    buildViewSpec(requestedViewType: any): any;
	    buildViewSpecOptions(spec: any): void;
	    buildViewSpecButtonText(spec: any, requestedViewType: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/Theme' {
	export class Default {
	    optionsManager: any;
	    classes: any;
	    iconClasses: any;
	    baseIconClass: string;
	    iconOverrideOption: any;
	    iconOverrideCustomButtonOption: any;
	    iconOverridePrefix: string;
	    constructor(optionsManager: any);
	    processIconOverride(): void;
	    setIconOverride(iconOverrideHash: any): void;
	    applyIconOverridePrefix(className: any): any;
	    getClass(key: any): any;
	    getIconClass(buttonName: any): string;
	    getCustomButtonIconClass(customButtonProps: any): string;
	}
	export default Default;
}
declare module 'fullcalendar/src/moment-ext' {
	import * as moment from 'moment'; module 'moment' {
	    interface Moment {
	        hasTime(): boolean;
	        time(): moment.Duration;
	        stripZone(): any;
	        stripTime(): any;
	    }
	} let newMomentProto: any; let oldMomentProto: any; function oldMomentFormat(mom: any, formatStr?: any): any;
	export { newMomentProto, oldMomentProto, oldMomentFormat }; const momentExt: any;
	export default momentExt;
}
declare module 'fullcalendar/UnzonedRange' {
	export class Default {
	    startMs: number;
	    endMs: number;
	    isStart: boolean;
	    isEnd: boolean;
	    constructor(startInput?: any, endInput?: any);
	    static invertRanges(ranges: any, constraintRange: any): any[];
	    intersect(otherRange: any): any;
	    intersectsWith(otherRange: any): boolean;
	    containsRange(innerRange: any): boolean;
	    containsDate(date: any): boolean;
	    constrainDate(date: any): any;
	    equals(otherRange: any): boolean;
	    clone(): Default;
	    getStart(): any;
	    getEnd(): any;
	    as(unit: any): number;
	}
	export default Default;
}
declare module 'fullcalendar/ComponentFootprint' {
	export class Default {
	    unzonedRange: any;
	    isAllDay: boolean;
	    constructor(unzonedRange: any, isAllDay: any);
	    toLegacy(calendar: any): {
	        start: any;
	        end: any;
	    };
	}
	export default Default;
}
declare module 'fullcalendar/EventFootprint' {
	export class Default {
	    componentFootprint: any;
	    eventDef: any;
	    eventInstance: any;
	    constructor(componentFootprint: any, eventDef: any, eventInstance: any);
	    getEventLegacy(): any;
	}
	export default Default;
}
declare module 'fullcalendar/ParsableModelMixin' {
	import Mixin from 'fullcalendar/Mixin';
	export interface ParsableModelInterface {
	    applyProps(rawProps: any): any;
	    applyManualStandardProps(rawProps: any): any;
	    applyMiscProps(rawProps: any): any;
	    isStandardProp(propName: any): any;
	}
	export class Default extends Mixin implements ParsableModelInterface {
	    standardPropMap: any;
	    static defineStandardProps(propDefs: any): void;
	    static copyVerbatimStandardProps(src: any, dest: any): void;
	    applyProps(rawProps: any): boolean;
	    applyManualStandardProps(rawProps: any): boolean;
	    applyMiscProps(rawProps: any): void;
	    isStandardProp(propName: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/EventDef' {
	import { default as ParsableModelMixin, ParsableModelInterface } from 'fullcalendar/ParsableModelMixin';
	export abstract class Default {
	    static uuid: number;
	    static defineStandardProps: typeof ParsableModelMixin.defineStandardProps;
	    static copyVerbatimStandardProps: typeof ParsableModelMixin.copyVerbatimStandardProps;
	    applyProps: ParsableModelInterface['applyProps'];
	    isStandardProp: ParsableModelInterface['isStandardProp'];
	    source: any;
	    id: any;
	    rawId: any;
	    uid: any;
	    title: any;
	    url: any;
	    rendering: any;
	    constraint: any;
	    overlap: any;
	    editable: any;
	    startEditable: any;
	    durationEditable: any;
	    color: any;
	    backgroundColor: any;
	    borderColor: any;
	    textColor: any;
	    className: any;
	    miscProps: any;
	    constructor(source: any);
	    static parse(rawInput: any, source: any): any;
	    static normalizeId(id: any): string;
	    static generateId(): string;
	    abstract isAllDay(): any;
	    abstract buildInstances(unzonedRange: any): any;
	    clone(): any;
	    hasInverseRendering(): boolean;
	    hasBgRendering(): boolean;
	    getRendering(): any;
	    getConstraint(): any;
	    getOverlap(): any;
	    isStartExplicitlyEditable(): any;
	    isDurationExplicitlyEditable(): any;
	    isExplicitlyEditable(): any;
	    toLegacy(): any;
	    applyManualStandardProps(rawProps: any): boolean;
	    applyMiscProps(rawProps: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/EventInstance' {
	export class Default {
	    def: any;
	    dateProfile: any;
	    constructor(def: any, dateProfile: any);
	    toLegacy(): any;
	}
	export default Default;
}
declare module 'fullcalendar/EventDateProfile' {
	import UnzonedRange from 'fullcalendar/UnzonedRange';
	export class Default {
	    start: any;
	    end: any;
	    unzonedRange: any;
	    constructor(start: any, end: any, calendar: any);
	    static parse(rawProps: any, source: any): false | Default;
	    static isStandardProp(propName: any): boolean;
	    isAllDay(): boolean;
	    buildUnzonedRange(calendar: any): UnzonedRange;
	    getEnd(calendar: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/SingleEventDef' {
	import EventDef from 'fullcalendar/EventDef';
	import EventInstance from 'fullcalendar/EventInstance';
	export class Default extends EventDef {
	    dateProfile: any;
	    buildInstances(): EventInstance[];
	    buildInstance(): EventInstance;
	    isAllDay(): any;
	    clone(): any;
	    rezone(): void;
	    applyManualStandardProps(rawProps: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/RecurringEventDef' {
	import EventDef from 'fullcalendar/EventDef';
	export class Default extends EventDef {
	    startTime: any;
	    endTime: any;
	    dowHash: any;
	    isAllDay(): boolean;
	    buildInstances(unzonedRange: any): any[];
	    setDow(dowNumbers: any): void;
	    clone(): any;
	}
	export default Default;
}
declare module 'fullcalendar/EventDefParser' {
	 const _default: {
	    parse: (eventInput: any, source: any) => any;
	};
	export default _default;
}
declare module 'fullcalendar/EventSource' {
	import { default as ParsableModelMixin, ParsableModelInterface } from 'fullcalendar/ParsableModelMixin';
	import Class from 'fullcalendar/Class';
	import Calendar from 'fullcalendar/Calendar';
	export class Default extends Class {
	    static uuid: number;
	    static defineStandardProps: typeof ParsableModelMixin.defineStandardProps;
	    static copyVerbatimStandardProps: typeof ParsableModelMixin.copyVerbatimStandardProps;
	    applyProps: ParsableModelInterface['applyProps'];
	    isStandardProp: ParsableModelInterface['isStandardProp'];
	    calendar: Calendar;
	    id: string;
	    uid: string;
	    color: string;
	    backgroundColor: string;
	    borderColor: string;
	    textColor: string;
	    className: string[];
	    editable: boolean;
	    startEditable: boolean;
	    durationEditable: boolean;
	    rendering: string | null;
	    overlap: boolean;
	    constraint: any;
	    allDayDefault: boolean;
	    eventDataTransform: any;
	    constructor(calendar: any);
	    static parse(rawInput: any, calendar: any): false | Default;
	    static normalizeId(id: any): string;
	    fetch(start: any, end: any, timezone: any): void;
	    removeEventDefsById(eventDefId: any): void;
	    removeAllEventDefs(): void;
	    getPrimitive(otherSource: any): void;
	    parseEventDefs(rawEventDefs: any): any[];
	    parseEventDef(rawInput: any): any;
	    applyManualStandardProps(rawProps: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/EventRange' {
	export class Default {
	    unzonedRange: any;
	    eventDef: any;
	    eventInstance: any;
	    constructor(unzonedRange: any, eventDef: any, eventInstance?: any);
	}
	export default Default;
}
declare module 'fullcalendar/src/models/event/util' {
	import EventRange from 'fullcalendar/EventRange';
	import EventFootprint from 'fullcalendar/EventFootprint';
	export function eventDefsToEventInstances(eventDefs: any, unzonedRange: any): any[];
	export function eventInstanceToEventRange(eventInstance: any): EventRange;
	export function eventRangeToEventFootprint(eventRange: any): EventFootprint;
	export function eventInstanceToUnzonedRange(eventInstance: any): any;
	export function eventFootprintToComponentFootprint(eventFootprint: any): any;
}
declare module 'fullcalendar/Constraints' {
	import ComponentFootprint from 'fullcalendar/ComponentFootprint';
	import EventFootprint from 'fullcalendar/EventFootprint';
	export class Default {
	    eventManager: any;
	    _calendar: any;
	    constructor(eventManager: any, _calendar: any);
	    opt(name: any): any;
	    isEventInstanceGroupAllowed(eventInstanceGroup: any): boolean;
	    getPeerEventInstances(eventDef: any): any;
	    isSelectionFootprintAllowed(componentFootprint: any): boolean;
	    isFootprintAllowed(componentFootprint: any, peerEventFootprints: any, constraintVal: any, overlapVal: any, subjectEventInstance?: any): boolean;
	    isFootprintWithinConstraints(componentFootprint: any, constraintFootprints: any): boolean;
	    constraintValToFootprints(constraintVal: any, isAllDay: any): any[];
	    buildCurrentBusinessFootprints(isAllDay: any): any[];
	    eventInstancesToFootprints(eventInstances: any): any[];
	    collectOverlapEventFootprints(peerEventFootprints: any, targetFootprint: any): any[];
	    parseEventDefToInstances(eventInput: any): any;
	    eventRangesToEventFootprints(eventRanges: any): any[];
	    eventRangeToEventFootprints(eventRange: any): EventFootprint[];
	    parseFootprints(rawInput: any): ComponentFootprint[];
	    footprintContainsFootprint(outerFootprint: any, innerFootprint: any): any;
	    footprintsIntersect(footprint0: any, footprint1: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/Promise' {
	 const PromiseStub: {
	    construct: (executor: any) => JQueryPromise<{}>;
	    resolve: (val: any) => JQueryPromise<{}>;
	    reject: () => JQueryPromise<{}>;
	};
	export default PromiseStub;
}
declare module 'fullcalendar/EventInstanceGroup' {
	export class Default {
	    eventInstances: any;
	    explicitEventDef: any;
	    constructor(eventInstances?: any);
	    getAllEventRanges(constraintRange: any): any;
	    sliceRenderRanges(constraintRange: any): any;
	    sliceNormalRenderRanges(constraintRange: any): any[];
	    sliceInverseRenderRanges(constraintRange: any): any;
	    isInverse(): any;
	    getEventDef(): any;
	}
	export default Default;
}
declare module 'fullcalendar/EventPeriod' {
	/// <reference types="jquery" />
	import * as moment from 'moment';
	import { EmitterInterface } from 'fullcalendar/EmitterMixin';
	import UnzonedRange from 'fullcalendar/UnzonedRange';
	export class Default {
	    on: EmitterInterface['on'];
	    one: EmitterInterface['one'];
	    off: EmitterInterface['off'];
	    trigger: EmitterInterface['trigger'];
	    triggerWith: EmitterInterface['triggerWith'];
	    hasHandlers: EmitterInterface['hasHandlers'];
	    start: moment.Moment;
	    end: moment.Moment;
	    timezone: any;
	    unzonedRange: UnzonedRange;
	    requestsByUid: any;
	    pendingCnt: number;
	    freezeDepth: number;
	    stuntedReleaseCnt: number;
	    releaseCnt: number;
	    eventDefsByUid: any;
	    eventDefsById: any;
	    eventInstanceGroupsById: any;
	    constructor(start: any, end: any, timezone: any);
	    isWithinRange(start: any, end: any): boolean;
	    requestSources(sources: any): void;
	    requestSource(source: any): void;
	    purgeSource(source: any): void;
	    purgeAllSources(): void;
	    getEventDefByUid(eventDefUid: any): any;
	    getEventDefsById(eventDefId: any): any;
	    addEventDefs(eventDefs: any): void;
	    addEventDef(eventDef: any): void;
	    removeEventDefsById(eventDefId: any): void;
	    removeAllEventDefs(): void;
	    removeEventDef(eventDef: any): void;
	    getEventInstances(): any[];
	    getEventInstancesWithId(eventDefId: any): any;
	    getEventInstancesWithoutId(eventDefId: any): any[];
	    addEventInstance(eventInstance: any, eventDefId: any): void;
	    removeEventInstancesForDef(eventDef: any): void;
	    tryRelease(): void;
	    release(): void;
	    whenReleased(): JQueryPromise<{}>;
	    freeze(): void;
	    thaw(): void;
	}
	export default Default;
}
declare module 'fullcalendar/ArrayEventSource' {
	/// <reference types="jquery" />
	import EventSource from 'fullcalendar/EventSource';
	export class Default extends EventSource {
	    rawEventDefs: any;
	    eventDefs: any;
	    currentTimezone: any;
	    constructor(calendar: any);
	    static parse(rawInput: any, calendar: any): any;
	    setRawEventDefs(rawEventDefs: any): void;
	    fetch(start: any, end: any, timezone: any): JQueryPromise<{}>;
	    addEventDef(eventDef: any): void;
	    removeEventDefsById(eventDefId: any): number;
	    removeAllEventDefs(): void;
	    getPrimitive(): any;
	    applyManualStandardProps(rawProps: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/EventSourceParser' {
	 const _default: {
	    sourceClasses: any[];
	    registerClass: (EventSourceClass: any) => void;
	    parse: (rawInput: any, calendar: any) => any;
	};
	export default _default;
}
declare module 'fullcalendar/EventManager' {
	import EventInstanceGroup from 'fullcalendar/EventInstanceGroup';
	import { EmitterInterface } from 'fullcalendar/EmitterMixin';
	import { ListenerInterface } from 'fullcalendar/ListenerMixin';
	export class Default {
	    on: EmitterInterface['on'];
	    one: EmitterInterface['one'];
	    off: EmitterInterface['off'];
	    trigger: EmitterInterface['trigger'];
	    triggerWith: EmitterInterface['triggerWith'];
	    hasHandlers: EmitterInterface['hasHandlers'];
	    listenTo: ListenerInterface['listenTo'];
	    stopListeningTo: ListenerInterface['stopListeningTo'];
	    currentPeriod: any;
	    calendar: any;
	    stickySource: any;
	    otherSources: any;
	    constructor(calendar: any);
	    requestEvents(start: any, end: any, timezone: any, force: any): any;
	    addSource(eventSource: any): void;
	    removeSource(doomedSource: any): void;
	    removeAllSources(): void;
	    refetchSource(eventSource: any): void;
	    refetchAllSources(): void;
	    getSources(): any[];
	    multiQuerySources(matchInputs: any): any[];
	    querySources(matchInput: any): any[];
	    getSourceById(id: any): any;
	    setPeriod(eventPeriod: any): void;
	    bindPeriod(eventPeriod: any): void;
	    unbindPeriod(eventPeriod: any): void;
	    getEventDefByUid(uid: any): any;
	    addEventDef(eventDef: any, isSticky: any): void;
	    removeEventDefsById(eventId: any): void;
	    removeAllEventDefs(): void;
	    mutateEventsWithId(eventDefId: any, eventDefMutation: any): () => void;
	    buildMutatedEventInstanceGroup(eventDefId: any, eventDefMutation: any): EventInstanceGroup;
	    freeze(): void;
	    thaw(): void;
	    getEventDefsById(eventDefId: any): any;
	    getEventInstances(): any;
	    getEventInstancesWithId(eventDefId: any): any;
	    getEventInstancesWithoutId(eventDefId: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/BusinessHourGenerator' {
	export class Default {
	    rawComplexDef: any;
	    calendar: any;
	    constructor(rawComplexDef: any, calendar: any);
	    buildEventInstanceGroup(isAllDay: any, unzonedRange: any): any;
	    buildEventDefs(isAllDay: any): any[];
	    buildEventDef(isAllDay: any, rawDef: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/EventDefDateMutation' {
	import EventDateProfile from 'fullcalendar/EventDateProfile';
	export class Default {
	    clearEnd: boolean;
	    forceTimed: boolean;
	    forceAllDay: boolean;
	    dateDelta: any;
	    startDelta: any;
	    endDelta: any;
	    static createFromDiff(dateProfile0: any, dateProfile1: any, largeUnit: any): any;
	    buildNewDateProfile(eventDateProfile: any, calendar: any): EventDateProfile;
	    setDateDelta(dateDelta: any): void;
	    setStartDelta(startDelta: any): void;
	    setEndDelta(endDelta: any): void;
	    isEmpty(): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/EventDefMutation' {
	export class Default {
	    dateMutation: any;
	    eventDefId: any;
	    className: any;
	    verbatimStandardProps: any;
	    miscProps: any;
	    static createFromRawProps(eventInstance: any, rawProps: any, largeUnit: any): any;
	    mutateSingle(eventDef: any): () => void;
	    setDateMutation(dateMutation: any): void;
	    isEmpty(): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/StandardTheme' {
	import Theme from 'fullcalendar/Theme';
	export class Default extends Theme {
	}
	export default Default;
}
declare module 'fullcalendar/JqueryUiTheme' {
	import Theme from 'fullcalendar/Theme';
	export class Default extends Theme {
	}
	export default Default;
}
declare module 'fullcalendar/ThemeRegistry' {
	export function defineThemeSystem(themeName: any, themeClass: any): void;
	export function getThemeSystemClass(themeSetting: any): any;
}
declare module 'fullcalendar/Calendar' {
	/// <reference types="jquery" />
	import * as moment from 'moment';
	import Iterator from 'fullcalendar/Iterator';
	import { EmitterInterface } from 'fullcalendar/EmitterMixin';
	import { ListenerInterface } from 'fullcalendar/ListenerMixin';
	import Toolbar from 'fullcalendar/Toolbar';
	import OptionsManager from 'fullcalendar/OptionsManager';
	import ViewSpecManager from 'fullcalendar/ViewSpecManager';
	import View from 'fullcalendar/View';
	import Theme from 'fullcalendar/Theme';
	import Constraints from 'fullcalendar/Constraints';
	import UnzonedRange from 'fullcalendar/UnzonedRange';
	import ComponentFootprint from 'fullcalendar/ComponentFootprint';
	import EventDateProfile from 'fullcalendar/EventDateProfile';
	import EventManager from 'fullcalendar/EventManager';
	import BusinessHourGenerator from 'fullcalendar/BusinessHourGenerator';
	import EventSource from 'fullcalendar/EventSource';
	import { RangeInput, MomentInput, OptionsInput, EventObjectInput, EventSourceInput } from 'fullcalendar/src/types/input-types';
	export class Default {
	    static defaults: any;
	    static englishDefaults: any;
	    static rtlDefaults: any;
	    on: EmitterInterface['on'];
	    one: EmitterInterface['one'];
	    off: EmitterInterface['off'];
	    trigger: EmitterInterface['trigger'];
	    triggerWith: EmitterInterface['triggerWith'];
	    hasHandlers: EmitterInterface['hasHandlers'];
	    listenTo: ListenerInterface['listenTo'];
	    stopListeningTo: ListenerInterface['stopListeningTo'];
	    view: View;
	    viewsByType: {
	        [viewName: string]: View;
	    };
	    currentDate: moment.Moment;
	    theme: Theme;
	    eventManager: EventManager;
	    constraints: Constraints;
	    optionsManager: OptionsManager;
	    viewSpecManager: ViewSpecManager;
	    businessHourGenerator: BusinessHourGenerator;
	    loadingLevel: number;
	    defaultAllDayEventDuration: moment.Duration;
	    defaultTimedEventDuration: moment.Duration;
	    localeData: object;
	    el: JQuery;
	    contentEl: JQuery;
	    suggestedViewHeight: number;
	    ignoreUpdateViewSize: number;
	    freezeContentHeightDepth: number;
	    windowResizeProxy: any;
	    header: Toolbar;
	    footer: Toolbar;
	    toolbarsManager: Iterator;
	    constructor(el: JQuery, overrides: OptionsInput);
	    constructed(): void;
	    getView(): View;
	    publiclyTrigger(name: string, triggerInfo: any): any;
	    hasPublicHandlers(name: string): boolean;
	    option(name: string | object, value?: any): any;
	    opt(name: string): any;
	    instantiateView(viewType: string): View;
	    isValidViewType(viewType: string): boolean;
	    changeView(viewName: string, dateOrRange: RangeInput | MomentInput): void;
	    zoomTo(newDate: moment.Moment, viewType?: string): void;
	    initCurrentDate(): void;
	    prev(): void;
	    next(): void;
	    prevYear(): void;
	    nextYear(): void;
	    today(): void;
	    gotoDate(zonedDateInput: any): void;
	    incrementDate(delta: any): void;
	    getDate(): moment.Moment;
	    pushLoading(): void;
	    popLoading(): void;
	    render(): void;
	    initialRender(): void;
	    destroy(): void;
	    elementVisible(): boolean;
	    bindViewHandlers(view: any): void;
	    unbindViewHandlers(view: any): void;
	    renderView(viewType?: string): void;
	    clearView(): void;
	    reinitView(): void;
	    getSuggestedViewHeight(): number;
	    isHeightAuto(): boolean;
	    updateViewSize(isResize?: boolean): boolean;
	    calcSize(): void;
	    _calcSize(): void;
	    windowResize(ev: JQueryEventObject): void;
	    freezeContentHeight(): void;
	    forceFreezeContentHeight(): void;
	    thawContentHeight(): void;
	    initToolbars(): void;
	    computeHeaderOptions(): {
	        extraClasses: string;
	        layout: any;
	    };
	    computeFooterOptions(): {
	        extraClasses: string;
	        layout: any;
	    };
	    renderHeader(): void;
	    renderFooter(): void;
	    setToolbarsTitle(title: string): void;
	    updateToolbarButtons(dateProfile: any): void;
	    queryToolbarsHeight(): any;
	    select(zonedStartInput: MomentInput, zonedEndInput?: MomentInput): void;
	    unselect(): void;
	    buildSelectFootprint(zonedStartInput: MomentInput, zonedEndInput?: MomentInput): ComponentFootprint;
	    initMomentInternals(): void;
	    moment(...args: any[]): moment.Moment;
	    msToMoment(ms: number, forceAllDay: boolean): moment.Moment;
	    msToUtcMoment(ms: number, forceAllDay: boolean): moment.Moment;
	    localizeMoment(mom: any): void;
	    getIsAmbigTimezone(): boolean;
	    applyTimezone(date: moment.Moment): moment.Moment;
	    footprintToDateProfile(componentFootprint: any, ignoreEnd?: boolean): EventDateProfile;
	    getNow(): moment.Moment;
	    humanizeDuration(duration: moment.Duration): string;
	    parseUnzonedRange(rangeInput: RangeInput): UnzonedRange;
	    initEventManager(): void;
	    requestEvents(start: moment.Moment, end: moment.Moment): any;
	    getEventEnd(event: any): moment.Moment;
	    getDefaultEventEnd(allDay: boolean, zonedStart: moment.Moment): moment.Moment;
	    rerenderEvents(): void;
	    refetchEvents(): void;
	    renderEvents(eventInputs: EventObjectInput[], isSticky?: boolean): void;
	    renderEvent(eventInput: EventObjectInput, isSticky?: boolean): void;
	    removeEvents(legacyQuery: any): void;
	    clientEvents(legacyQuery: any): any;
	    updateEvents(eventPropsArray: EventObjectInput[]): void;
	    updateEvent(eventProps: EventObjectInput): void;
	    getEventSources(): EventSource;
	    getEventSourceById(id: any): EventSource;
	    addEventSource(sourceInput: EventSourceInput): void;
	    removeEventSources(sourceMultiQuery: any): void;
	    removeEventSource(sourceQuery: any): void;
	    refetchEventSources(sourceMultiQuery: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/DateProfileGenerator' {
	import * as moment from 'moment';
	import UnzonedRange from 'fullcalendar/UnzonedRange';
	export class Default {
	    _view: any;
	    constructor(_view: any);
	    opt(name: any): any;
	    trimHiddenDays(unzonedRange: any): any;
	    msToUtcMoment(ms: any, forceAllDay: any): any;
	    buildPrev(currentDateProfile: any): {
	        validUnzonedRange: any;
	        currentUnzonedRange: any;
	        currentRangeUnit: any;
	        isRangeAllDay: any;
	        activeUnzonedRange: any;
	        renderUnzonedRange: any;
	        minTime: any;
	        maxTime: any;
	        isValid: any;
	        date: any;
	        dateIncrement: any;
	    };
	    buildNext(currentDateProfile: any): {
	        validUnzonedRange: any;
	        currentUnzonedRange: any;
	        currentRangeUnit: any;
	        isRangeAllDay: any;
	        activeUnzonedRange: any;
	        renderUnzonedRange: any;
	        minTime: any;
	        maxTime: any;
	        isValid: any;
	        date: any;
	        dateIncrement: any;
	    };
	    build(date: any, direction: any, forceToValid?: boolean): {
	        validUnzonedRange: any;
	        currentUnzonedRange: any;
	        currentRangeUnit: any;
	        isRangeAllDay: any;
	        activeUnzonedRange: any;
	        renderUnzonedRange: any;
	        minTime: any;
	        maxTime: any;
	        isValid: any;
	        date: any;
	        dateIncrement: any;
	    };
	    buildValidRange(): any;
	    buildCurrentRangeInfo(date: any, direction: any): {
	        duration: any;
	        unit: any;
	        unzonedRange: any;
	    };
	    getFallbackDuration(): moment.Duration;
	    adjustActiveRange(unzonedRange: any, minTime: any, maxTime: any): UnzonedRange;
	    buildRangeFromDuration(date: any, direction: any, duration: any, unit: any): any;
	    buildRangeFromDayCount(date: any, direction: any, dayCount: any): UnzonedRange;
	    buildCustomVisibleRange(date: any): any;
	    buildRenderRange(currentUnzonedRange: any, currentRangeUnit: any, isRangeAllDay: any): any;
	    buildDateIncrement(fallback: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/src/date-formatting' {
	export function formatDate(date: any, formatStr: any): any;
	export function formatRange(date1: any, date2: any, formatStr: any, separator: any, isRTL: any): any;
	export function queryMostGranularFormatUnit(formatStr: any): any;
}
declare module 'fullcalendar/Component' {
	import Model from 'fullcalendar/Model';
	export class Default extends Model {
	    el: any;
	    setElement(el: any): void;
	    removeElement(): void;
	    bindGlobalHandlers(): void;
	    unbindGlobalHandlers(): void;
	    renderSkeleton(): void;
	    unrenderSkeleton(): void;
	}
	export default Default;
}
declare module 'fullcalendar/DateComponent' {
	import Component from 'fullcalendar/Component';
	import EventFootprint from 'fullcalendar/EventFootprint';
	export abstract class Default extends Component {
	    static guid: number;
	    eventRendererClass: any;
	    helperRendererClass: any;
	    businessHourRendererClass: any;
	    fillRendererClass: any;
	    uid: any;
	    childrenByUid: any;
	    isRTL: boolean;
	    nextDayThreshold: any;
	    dateProfile: any;
	    eventRenderer: any;
	    helperRenderer: any;
	    businessHourRenderer: any;
	    fillRenderer: any;
	    hitsNeededDepth: number;
	    hasAllDayBusinessHours: boolean;
	    isDatesRendered: boolean;
	    constructor(_view?: any, _options?: any);
	    addChild(child: any): boolean;
	    removeChild(child: any): boolean;
	    updateSize(totalHeight: any, isAuto: any, isResize: any): void;
	    opt(name: any): any;
	    publiclyTrigger(...args: any[]): any;
	    hasPublicHandlers(...args: any[]): any;
	    executeDateRender(dateProfile: any): void;
	    executeDateUnrender(): void;
	    renderDates(dateProfile: any): void;
	    unrenderDates(): void;
	    getNowIndicatorUnit(): void;
	    renderNowIndicator(date: any): void;
	    unrenderNowIndicator(): void;
	    renderBusinessHours(businessHourGenerator: any): void;
	    unrenderBusinessHours(): void;
	    executeEventRender(eventsPayload: any): void;
	    executeEventUnrender(): void;
	    getBusinessHourSegs(): any;
	    getOwnBusinessHourSegs(): any;
	    getEventSegs(): any;
	    getOwnEventSegs(): any;
	    triggerAfterEventsRendered(): void;
	    triggerAfterEventSegsRendered(segs: any): void;
	    triggerBeforeEventsDestroyed(): void;
	    triggerBeforeEventSegsDestroyed(segs: any): void;
	    showEventsWithId(eventDefId: any): void;
	    hideEventsWithId(eventDefId: any): void;
	    renderDrag(eventFootprints: any, seg: any, isTouch: any): boolean;
	    unrenderDrag(): void;
	    renderEventResize(eventFootprints: any, seg: any, isTouch: any): void;
	    unrenderEventResize(): void;
	    renderSelectionFootprint(componentFootprint: any): void;
	    unrenderSelection(): void;
	    renderHighlight(componentFootprint: any): void;
	    unrenderHighlight(): void;
	    hitsNeeded(): void;
	    hitsNotNeeded(): void;
	    prepareHits(): void;
	    releaseHits(): void;
	    queryHit(leftOffset: any, topOffset: any): any;
	    getSafeHitFootprint(hit: any): any;
	    getHitFootprint(hit: any): any;
	    getHitEl(hit: any): any;
	    eventRangesToEventFootprints(eventRanges: any): any[];
	    eventRangeToEventFootprints(eventRange: any): EventFootprint[];
	    eventFootprintsToSegs(eventFootprints: any): any[];
	    eventFootprintToSegs(eventFootprint: any): any;
	    componentFootprintToSegs(componentFootprint: any): any[];
	    callChildren(methodName: any, args: any): void;
	    iterChildren(func: any): void;
	    _getCalendar(): any;
	    _getView(): any;
	    _getDateProfile(): any;
	    buildGotoAnchorHtml(gotoOptions: any, attrs: any, innerHtml: any): string;
	    getAllDayHtml(): any;
	    getDayClasses(date: any, noThemeHighlight?: any): any[];
	    formatRange(range: any, isAllDay: any, formatStr: any, separator: any): any;
	    currentRangeAs(unit: any): any;
	    computeDayRange(unzonedRange: any): {
	        start: any;
	        end: any;
	    };
	    isMultiDayRange(unzonedRange: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/InteractiveDateComponent' {
	import * as moment from 'moment';
	import DateComponent from 'fullcalendar/DateComponent';
	export abstract class Default extends DateComponent {
	    dateClickingClass: any;
	    dateSelectingClass: any;
	    eventPointingClass: any;
	    eventDraggingClass: any;
	    eventResizingClass: any;
	    externalDroppingClass: any;
	    dateClicking: any;
	    dateSelecting: any;
	    eventPointing: any;
	    eventDragging: any;
	    eventResizing: any;
	    externalDropping: any;
	    segSelector: string;
	    largeUnit: any;
	    constructor(_view?: any, _options?: any);
	    setElement(el: any): void;
	    removeElement(): void;
	    executeEventUnrender(): void;
	    bindGlobalHandlers(): void;
	    unbindGlobalHandlers(): void;
	    bindDateHandlerToEl(el: any, name: any, handler: any): void;
	    bindAllSegHandlersToEl(el: any): void;
	    bindSegHandlerToEl(el: any, name: any, handler: any): void;
	    shouldIgnoreMouse(): any;
	    shouldIgnoreTouch(): any;
	    shouldIgnoreEventPointing(): any;
	    canStartSelection(seg: any, ev: any): any;
	    canStartDrag(seg: any, ev: any): any;
	    canStartResize(seg: any, ev: any): boolean;
	    endInteractions(): void;
	    isEventDefDraggable(eventDef: any): any;
	    isEventDefStartEditable(eventDef: any): any;
	    isEventDefGenerallyEditable(eventDef: any): any;
	    isEventDefResizableFromStart(eventDef: any): any;
	    isEventDefResizableFromEnd(eventDef: any): any;
	    isEventDefResizable(eventDef: any): any;
	    diffDates(a: any, b: any): moment.Duration;
	    isEventInstanceGroupAllowed(eventInstanceGroup: any): any;
	    isExternalInstanceGroupAllowed(eventInstanceGroup: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/View' {
	import * as moment from 'moment';
	import RenderQueue from 'fullcalendar/RenderQueue';
	import Calendar from 'fullcalendar/Calendar';
	import InteractiveDateComponent from 'fullcalendar/InteractiveDateComponent';
	import UnzonedRange from 'fullcalendar/UnzonedRange';
	import EventInstance from 'fullcalendar/EventInstance';
	export abstract class Default extends InteractiveDateComponent {
	    type: string;
	    name: string;
	    title: string;
	    calendar: Calendar;
	    viewSpec: any;
	    options: any;
	    renderQueue: RenderQueue;
	    batchRenderDepth: number;
	    queuedScroll: object;
	    isSelected: boolean;
	    selectedEventInstance: EventInstance;
	    eventOrderSpecs: any;
	    isHiddenDayHash: boolean[];
	    isNowIndicatorRendered: boolean;
	    initialNowDate: moment.Moment;
	    initialNowQueriedMs: number;
	    nowIndicatorTimeoutID: any;
	    nowIndicatorIntervalID: any;
	    dateProfileGeneratorClass: any;
	    dateProfileGenerator: any;
	    usesMinMaxTime: boolean;
	    start: moment.Moment;
	    end: moment.Moment;
	    intervalStart: moment.Moment;
	    intervalEnd: moment.Moment;
	    constructor(calendar: any, viewSpec: any);
	    _getView(): this;
	    opt(name: any): any;
	    initRenderQueue(): void;
	    onRenderQueueStart(): void;
	    onRenderQueueStop(): void;
	    startBatchRender(): void;
	    stopBatchRender(): void;
	    requestRender(func: any, namespace: any, actionType: any): void;
	    whenSizeUpdated(func: any): void;
	    computeTitle(dateProfile: any): any;
	    computeTitleFormat(dateProfile: any): any;
	    setDate(date: any): void;
	    unsetDate(): void;
	    fetchInitialEvents(dateProfile: any): any;
	    bindEventChanges(): void;
	    unbindEventChanges(): void;
	    setEvents(eventsPayload: any): void;
	    unsetEvents(): void;
	    resetEvents(eventsPayload: any): void;
	    requestDateRender(dateProfile: any): void;
	    requestDateUnrender(): void;
	    executeDateRender(dateProfile: any): void;
	    executeDateUnrender(): void;
	    bindBaseRenderHandlers(): void;
	    triggerViewRender(): void;
	    triggerViewDestroy(): void;
	    requestEventsRender(eventsPayload: any): void;
	    requestEventsUnrender(): void;
	    requestBusinessHoursRender(businessHourGenerator: any): void;
	    requestBusinessHoursUnrender(): void;
	    bindGlobalHandlers(): void;
	    unbindGlobalHandlers(): void;
	    startNowIndicator(): void;
	    updateNowIndicator(): void;
	    stopNowIndicator(): void;
	    updateSize(totalHeight: any, isAuto: any, isResize: any): void;
	    addScroll(scroll: any): void;
	    popScroll(): void;
	    applyQueuedScroll(): void;
	    queryScroll(): {};
	    applyScroll(scroll: any): void;
	    computeInitialDateScroll(): {};
	    queryDateScroll(): {};
	    applyDateScroll(scroll: any): void;
	    reportEventDrop(eventInstance: any, eventMutation: any, el: any, ev: any): void;
	    triggerEventDrop(eventInstance: any, dateDelta: any, undoFunc: any, el: any, ev: any): void;
	    reportExternalDrop(singleEventDef: any, isEvent: any, isSticky: any, el: any, ev: any, ui: any): void;
	    triggerExternalDrop(singleEventDef: any, isEvent: any, el: any, ev: any, ui: any): void;
	    reportEventResize(eventInstance: any, eventMutation: any, el: any, ev: any): void;
	    triggerEventResize(eventInstance: any, durationDelta: any, undoFunc: any, el: any, ev: any): void;
	    select(footprint: any, ev?: any): void;
	    renderSelectionFootprint(footprint: any): void;
	    reportSelection(footprint: any, ev?: any): void;
	    triggerSelect(footprint: any, ev?: any): void;
	    unselect(ev?: any): void;
	    selectEventInstance(eventInstance: any): void;
	    unselectEventInstance(): void;
	    isEventDefSelected(eventDef: any): boolean;
	    handleDocumentMousedown(ev: any): void;
	    processUnselect(ev: any): void;
	    processRangeUnselect(ev: any): void;
	    processEventUnselect(ev: any): void;
	    triggerBaseRendered(): void;
	    triggerBaseUnrendered(): void;
	    triggerDayClick(footprint: any, dayEl: any, ev: any): void;
	    isDateInOtherMonth(date: any, dateProfile: any): boolean;
	    getUnzonedRangeOption(name: any): UnzonedRange;
	    initHiddenDays(): void;
	    trimHiddenDays(inputUnzonedRange: any): UnzonedRange;
	    isHiddenDay(day: any): boolean;
	    skipHiddenDays(date: any, inc?: number, isExclusive?: boolean): any;
	}
	export default Default;
}
declare module 'fullcalendar/src/types/input-types' {
	/// <reference types="jquery" />
	import * as moment from 'moment';
	import View from 'fullcalendar/View';
	import EventSource from 'fullcalendar/EventSource';
	export type MomentInput = moment.Moment | Date | object | string | number;
	export type DurationInput = moment.Duration | object | string | number;
	export interface RangeInput {
	    start?: MomentInput;
	    end?: MomentInput;
	}
	export type ConstraintInput = RangeInput | BusinessHoursInput | 'businessHours';
	export interface EventOptionsBase {
	    className?: string | string[];
	    editable?: boolean;
	    startEditable?: boolean;
	    durationEditable?: boolean;
	    rendering?: string;
	    overlap?: boolean;
	    constraint?: ConstraintInput;
	    color?: string;
	    backgroundColor?: string;
	    borderColor?: string;
	    textColor?: string;
	}
	export interface EventObjectInput extends EventOptionsBase, RangeInput {
	    _id?: string;
	    id?: string | number;
	    title: string;
	    allDay?: boolean;
	    url?: string;
	    source?: EventSource;
	    [customField: string]: any;
	}
	export type EventSourceFunction = (start: moment.Moment, end: moment.Moment, timezone: string, callback: ((events: EventObjectInput[]) => void)) => void;
	export type EventSourceSimpleInput = EventObjectInput[] | EventSourceFunction | string;
	export interface EventSourceExtendedInput extends EventOptionsBase, JQueryAjaxSettings {
	    url?: string;
	    events?: EventSourceSimpleInput;
	    allDayDefault?: boolean;
	    startParam?: string;
	    endParam?: string;
	    eventDataTransform?(eventData: any): EventObjectInput;
	}
	export type EventSourceInput = EventSourceSimpleInput | EventSourceExtendedInput;
	export interface ToolbarInput {
	    left?: string;
	    center?: string;
	    right?: string;
	}
	export interface CustomButtonInput {
	    text: string;
	    icon?: string;
	    themeIcon?: string;
	    bootstrapGlyphicon?: string;
	    click(element: JQuery): void;
	}
	export interface ButtonIconsInput {
	    prev?: string;
	    next?: string;
	    prevYear?: string;
	    nextYear?: string;
	}
	export interface ButtonTextCompoundInput {
	    prev?: string;
	    next?: string;
	    prevYear?: string;
	    nextYear?: string;
	    today?: string;
	    month?: string;
	    week?: string;
	    day?: string;
	    [viewId: string]: string | undefined;
	}
	export interface BusinessHoursInput {
	    start?: MomentInput;
	    end?: MomentInput;
	    dow?: number[];
	}
	export interface EventSegment {
	    event: EventObjectInput;
	    start: moment.Moment;
	    end: moment.Moment;
	    isStart: boolean;
	    isEnd: boolean;
	}
	export interface CellInfo {
	    date: moment.Moment;
	    dayEl: JQuery;
	    moreEl: JQuery;
	    segs: EventSegment[];
	    hiddenSegs: EventSegment[];
	}
	export interface DropInfo {
	    start: moment.Moment;
	    end: moment.Moment;
	}
	export interface OptionsInputBase {
	    header?: boolean | ToolbarInput;
	    footer?: boolean | ToolbarInput;
	    customButtons?: {
	        [name: string]: CustomButtonInput;
	    };
	    buttonIcons?: boolean | ButtonIconsInput;
	    themeSystem?: 'standard' | 'bootstrap3' | 'jquery-ui';
	    themeButtonIcons?: boolean | ButtonIconsInput;
	    bootstrapGlyphicons?: boolean | ButtonIconsInput;
	    firstDay?: number;
	    isRTL?: boolean;
	    weekends?: boolean;
	    hiddenDays?: number[];
	    fixedWeekCount?: boolean;
	    weekNumbers?: boolean;
	    weekNumbersWithinDays?: boolean;
	    weekNumberCalculation?: 'local' | 'ISO' | ((m: moment.Moment) => number);
	    businessHours?: boolean | BusinessHoursInput | BusinessHoursInput[];
	    showNonCurrentDates?: boolean;
	    height?: number | 'auto' | 'parent' | (() => number);
	    contentHeight?: number | 'auto' | (() => number);
	    aspectRatio?: number;
	    handleWindowResize?: boolean;
	    windowResizeDelay?: number;
	    eventLimit?: boolean | number;
	    eventLimitClick?: 'popover' | 'week' | 'day' | string | ((cellinfo: CellInfo, jsevent: Event) => void);
	    timezone?: string | boolean;
	    now?: MomentInput | (() => MomentInput);
	    defaultView?: string;
	    allDaySlot?: boolean;
	    allDayText?: string;
	    slotDuration?: DurationInput;
	    slotLabelFormat?: string;
	    slotLabelInterval?: DurationInput;
	    snapDuration?: DurationInput;
	    scrollTime?: DurationInput;
	    minTime?: DurationInput;
	    maxTime?: DurationInput;
	    slotEventOverlap?: boolean;
	    listDayFormat?: string | boolean;
	    listDayAltFormat?: string | boolean;
	    noEventsMessage?: string;
	    defaultDate?: MomentInput;
	    nowIndicator?: boolean;
	    visibleRange?: ((currentDate: moment.Moment) => RangeInput) | RangeInput;
	    validRange?: RangeInput;
	    dateIncrement?: DurationInput;
	    dateAlignment?: string;
	    duration?: DurationInput;
	    dayCount?: number;
	    locale?: string;
	    timeFormat?: string;
	    columnFormat?: string;
	    titleFormat?: string;
	    monthNames?: string[];
	    monthNamesShort?: string[];
	    dayNames?: string[];
	    dayNamesShort?: string[];
	    weekNumberTitle?: string;
	    displayEventTime?: boolean;
	    displayEventEnd?: boolean;
	    eventLimitText?: string | ((eventCnt: number) => string);
	    dayPopoverFormat?: string;
	    navLinks?: boolean;
	    navLinkDayClick?: string | ((date: moment.Moment, jsEvent: Event) => void);
	    navLinkWeekClick?: string | ((weekStart: any, jsEvent: Event) => void);
	    selectable?: boolean;
	    selectHelper?: boolean;
	    unselectAuto?: boolean;
	    unselectCancel?: string;
	    selectOverlap?: boolean | ((event: EventObjectInput) => boolean);
	    selectConstraint?: ConstraintInput;
	    events?: EventSourceInput;
	    eventSources?: EventSourceInput[];
	    allDayDefault?: boolean;
	    startParam?: string;
	    endParam?: string;
	    lazyFetching?: boolean;
	    eventColor?: string;
	    eventBackgroundColor?: string;
	    eventBorderColor?: string;
	    eventTextColor?: string;
	    nextDayThreshold?: DurationInput;
	    eventOrder?: string | Array<((a: EventObjectInput, b: EventObjectInput) => number) | (string | ((a: EventObjectInput, b: EventObjectInput) => number))>;
	    eventRenderWait?: number | null;
	    editable?: boolean;
	    eventStartEditable?: boolean;
	    eventDurationEditable?: boolean;
	    dragRevertDuration?: number;
	    dragOpacity?: number;
	    dragScroll?: boolean;
	    eventOverlap?: boolean | ((stillEvent: EventObjectInput, movingEvent: EventObjectInput) => boolean);
	    eventConstraint?: ConstraintInput;
	    eventAllow?: ((dropInfo: DropInfo, draggedEvent: Event) => boolean);
	    longPressDelay?: number;
	    eventLongPressDelay?: number;
	    droppable?: boolean;
	    dropAccept?: string | ((draggable: any) => boolean);
	    viewRender?(view: View, element: JQuery): void;
	    viewDestroy?(view: View, element: JQuery): void;
	    dayRender?(date: moment.Moment, cell: JQuery): void;
	    windowResize?(view: View): void;
	    dayClick?(date: moment.Moment, jsEvent: MouseEvent, view: View, resourceObj?: any): void;
	    eventClick?(event: EventObjectInput, jsEvent: MouseEvent, view: View): boolean | void;
	    eventMouseover?(event: EventObjectInput, jsEvent: MouseEvent, view: View): void;
	    eventMouseout?(event: EventObjectInput, jsEvent: MouseEvent, view: View): void;
	    select?(start: moment.Moment, end: moment.Moment, jsEvent: MouseEvent, view: View, resource?: any): void;
	    unselect?(view: View, jsEvent: Event): void;
	    eventDataTransform?(eventData: any): EventObjectInput;
	    loading?(isLoading: boolean, view: View): void;
	    eventRender?(event: EventObjectInput, element: JQuery, view: View): void;
	    eventAfterRender?(event: EventObjectInput, element: JQuery, view: View): void;
	    eventAfterAllRender?(view: View): void;
	    eventDestroy?(event: EventObjectInput, element: JQuery, view: View): void;
	    eventDragStart?(event: EventObjectInput, jsEvent: MouseEvent, ui: any, view: View): void;
	    eventDragStop?(event: EventObjectInput, jsEvent: MouseEvent, ui: any, view: View): void;
	    eventDrop?(event: EventObjectInput, delta: moment.Duration, revertFunc: Function, jsEvent: Event, ui: any, view: View): void;
	    eventResizeStart?(event: EventObjectInput, jsEvent: MouseEvent, ui: any, view: View): void;
	    eventResizeStop?(event: EventObjectInput, jsEvent: MouseEvent, ui: any, view: View): void;
	    eventResize?(event: EventObjectInput, delta: moment.Duration, revertFunc: Function, jsEvent: Event, ui: any, view: View): void;
	    drop?(date: moment.Moment, jsEvent: MouseEvent, ui: any): void;
	    eventReceive?(event: EventObjectInput): void;
	}
	export interface ViewOptionsInput extends OptionsInputBase {
	    type?: string;
	    buttonText?: string;
	}
	export interface OptionsInput extends OptionsInputBase {
	    buttonText?: ButtonTextCompoundInput;
	    views?: {
	        [viewId: string]: ViewOptionsInput;
	    };
	}
}
declare module 'fullcalendar/FuncEventSource' {
	/// <reference types="jquery" />
	import EventSource from 'fullcalendar/EventSource';
	export class Default extends EventSource {
	    func: any;
	    static parse(rawInput: any, calendar: any): any;
	    fetch(start: any, end: any, timezone: any): JQueryPromise<{}>;
	    getPrimitive(): any;
	    applyManualStandardProps(rawProps: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/JsonFeedEventSource' {
	/// <reference types="jquery" />
	import EventSource from 'fullcalendar/EventSource';
	export class Default extends EventSource {
	    static AJAX_DEFAULTS: {
	        dataType: string;
	        cache: boolean;
	    };
	    url: any;
	    startParam: any;
	    endParam: any;
	    timezoneParam: any;
	    ajaxSettings: any;
	    static parse(rawInput: any, calendar: any): any;
	    fetch(start: any, end: any, timezone: any): JQueryPromise<{}>;
	    buildRequestParams(start: any, end: any, timezone: any): {};
	    getPrimitive(): any;
	    applyMiscProps(rawProps: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/CoordCache' {
	export class Default {
	    els: any;
	    forcedOffsetParentEl: any;
	    origin: any;
	    boundingRect: any;
	    isHorizontal: boolean;
	    isVertical: boolean;
	    lefts: any;
	    rights: any;
	    tops: any;
	    bottoms: any;
	    constructor(options: any);
	    build(): void;
	    clear(): void;
	    ensureBuilt(): void;
	    buildElHorizontals(): void;
	    buildElVerticals(): void;
	    getHorizontalIndex(leftOffset: any): any;
	    getVerticalIndex(topOffset: any): any;
	    getLeftOffset(leftIndex: any): any;
	    getLeftPosition(leftIndex: any): number;
	    getRightOffset(leftIndex: any): any;
	    getRightPosition(leftIndex: any): number;
	    getWidth(leftIndex: any): number;
	    getTopOffset(topIndex: any): any;
	    getTopPosition(topIndex: any): number;
	    getBottomOffset(topIndex: any): any;
	    getBottomPosition(topIndex: any): number;
	    getHeight(topIndex: any): number;
	    queryBoundingRect(): {
	        left: number;
	        right: any;
	        top: number;
	        bottom: any;
	    };
	    isPointInBounds(leftOffset: any, topOffset: any): boolean;
	    isLeftInBounds(leftOffset: any): boolean;
	    isTopInBounds(topOffset: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/DragListener' {
	import { ListenerInterface } from 'fullcalendar/ListenerMixin';
	export class Default {
	    listenTo: ListenerInterface['listenTo'];
	    stopListeningTo: ListenerInterface['stopListeningTo'];
	    options: any;
	    subjectEl: any;
	    originX: any;
	    originY: any;
	    scrollEl: any;
	    isInteracting: boolean;
	    isDistanceSurpassed: boolean;
	    isDelayEnded: boolean;
	    isDragging: boolean;
	    isTouch: boolean;
	    isGeneric: boolean;
	    delay: any;
	    delayTimeoutId: any;
	    minDistance: any;
	    shouldCancelTouchScroll: boolean;
	    scrollAlwaysKills: boolean;
	    isAutoScroll: boolean;
	    scrollBounds: any;
	    scrollTopVel: any;
	    scrollLeftVel: any;
	    scrollIntervalId: any;
	    scrollSensitivity: number;
	    scrollSpeed: number;
	    scrollIntervalMs: number;
	    constructor(options: any);
	    startInteraction(ev: any, extraOptions?: any): void;
	    handleInteractionStart(ev: any): void;
	    endInteraction(ev: any, isCancelled: any): void;
	    handleInteractionEnd(ev: any, isCancelled: any): void;
	    bindHandlers(): void;
	    unbindHandlers(): void;
	    startDrag(ev: any, extraOptions?: any): void;
	    handleDragStart(ev: any): void;
	    handleMove(ev: any): void;
	    handleDrag(dx: any, dy: any, ev: any): void;
	    endDrag(ev: any): void;
	    handleDragEnd(ev: any): void;
	    startDelay(initialEv: any): void;
	    handleDelayEnd(initialEv: any): void;
	    handleDistanceSurpassed(ev: any): void;
	    handleTouchMove(ev: any): void;
	    handleMouseMove(ev: any): void;
	    handleTouchScroll(ev: any): void;
	    trigger(name: any, ...args: any[]): void;
	    initAutoScroll(): void;
	    destroyAutoScroll(): void;
	    computeScrollBounds(): void;
	    updateAutoScroll(ev: any): void;
	    setScrollVel(topVel: any, leftVel: any): void;
	    constrainScrollVel(): void;
	    scrollIntervalFunc(): void;
	    endAutoScroll(): void;
	    handleDebouncedScroll(): void;
	    handleScrollEnd(): void;
	}
	export default Default;
}
declare module 'fullcalendar/Scroller' {
	import Class from 'fullcalendar/Class';
	export class Default extends Class {
	    el: any;
	    scrollEl: any;
	    overflowX: any;
	    overflowY: any;
	    constructor(options?: any);
	    render(): void;
	    renderEl(): JQuery;
	    clear(): void;
	    destroy(): void;
	    applyOverflow(): void;
	    lockOverflow(scrollbarWidths: any): void;
	    setHeight(height: any): void;
	    getScrollTop(): any;
	    setScrollTop(top: any): void;
	    getClientWidth(): any;
	    getClientHeight(): any;
	    getScrollbarWidths(): any;
	}
	export default Default;
}
declare module 'fullcalendar/DayTableMixin' {
	import Mixin from 'fullcalendar/Mixin';
	export interface DayTableInterface {
	    dayDates: any;
	    daysPerRow: any;
	    rowCnt: any;
	    colCnt: any;
	    updateDayTable(): any;
	    renderHeadHtml(): any;
	    renderBgTrHtml(row: any): any;
	    bookendCells(trEl: any): any;
	    getCellDate(row: any, col: any): any;
	    getCellRange(row: any, col: any): any;
	    sliceRangeByDay(unzonedRange: any): any;
	    sliceRangeByRow(unzonedRange: any): any;
	    renderIntroHtml(): any;
	}
	export class Default extends Mixin implements DayTableInterface {
	    breakOnWeeks: boolean;
	    dayDates: any;
	    dayIndices: any;
	    daysPerRow: any;
	    rowCnt: any;
	    colCnt: any;
	    colHeadFormat: any;
	    updateDayTable(): void;
	    updateDayTableCols(): void;
	    computeColCnt(): any;
	    getCellDate(row: any, col: any): any;
	    getCellRange(row: any, col: any): {
	        start: any;
	        end: any;
	    };
	    getCellDayIndex(row: any, col: any): any;
	    getColDayIndex(col: any): any;
	    getDateDayIndex(date: any): any;
	    computeColHeadFormat(): any;
	    sliceRangeByRow(unzonedRange: any): any[];
	    sliceRangeByDay(unzonedRange: any): any[];
	    renderHeadHtml(): string;
	    renderHeadIntroHtml(): void;
	    renderHeadTrHtml(): string;
	    renderHeadDateCellsHtml(): string;
	    renderHeadDateCellHtml(date: any, colspan: any, otherAttrs: any): string;
	    renderBgTrHtml(row: any): string;
	    renderBgIntroHtml(row: any): void;
	    renderBgCellsHtml(row: any): string;
	    renderBgCellHtml(date: any, otherAttrs: any): string;
	    renderIntroHtml(): void;
	    bookendCells(trEl: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/BusinessHourRenderer' {
	export class Default {
	    component: any;
	    fillRenderer: any;
	    segs: any;
	    constructor(component: any, fillRenderer: any);
	    render(businessHourGenerator: any): void;
	    renderEventFootprints(eventFootprints: any): void;
	    renderSegs(segs: any): void;
	    unrender(): void;
	    getSegs(): any;
	}
	export default Default;
}
declare module 'fullcalendar/EventRenderer' {
	export class Default {
	    view: any;
	    component: any;
	    fillRenderer: any;
	    fgSegs: any;
	    bgSegs: any;
	    eventTimeFormat: any;
	    displayEventTime: any;
	    displayEventEnd: any;
	    constructor(component: any, fillRenderer: any);
	    opt(name: any): any;
	    rangeUpdated(): void;
	    render(eventsPayload: any): void;
	    unrender(): void;
	    renderFgRanges(eventRanges: any): void;
	    unrenderFgRanges(): void;
	    renderBgRanges(eventRanges: any): void;
	    unrenderBgRanges(): void;
	    getSegs(): any;
	    renderFgSegs(segs: any): (boolean | void);
	    unrenderFgSegs(segs: any): void;
	    renderBgSegs(segs: any): boolean;
	    unrenderBgSegs(): void;
	    renderFgSegEls(segs: any, disableResizing?: boolean): any[];
	    beforeFgSegHtml(seg: any): void;
	    fgSegHtml(seg: any, disableResizing: any): void;
	    getSegClasses(seg: any, isDraggable: any, isResizable: any): string[];
	    filterEventRenderEl(eventFootprint: any, el: any): any;
	    getTimeText(eventFootprint: any, formatStr?: any, displayEnd?: any): any;
	    _getTimeText(start: any, end: any, isAllDay: any, formatStr?: any, displayEnd?: any): any;
	    computeEventTimeFormat(): any;
	    computeDisplayEventTime(): boolean;
	    computeDisplayEventEnd(): boolean;
	    getBgClasses(eventDef: any): any[];
	    getClasses(eventDef: any): any[];
	    getSkinCss(eventDef: any): {
	        'background-color': any;
	        'border-color': any;
	        color: any;
	    };
	    getBgColor(eventDef: any): any;
	    getBorderColor(eventDef: any): any;
	    getTextColor(eventDef: any): any;
	    getStylingObjs(eventDef: any): any[];
	    getFallbackStylingObjs(eventDef: any): any[];
	    sortEventSegs(segs: any): void;
	    compareEventSegs(seg1: any, seg2: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/FillRenderer' {
	export class Default {
	    fillSegTag: string;
	    component: any;
	    elsByFill: any;
	    constructor(component: any);
	    renderFootprint(type: any, componentFootprint: any, props: any): void;
	    renderSegs(type: any, segs: any, props: any): any;
	    unrender(type: any): void;
	    buildSegEls(type: any, segs: any, props: any): any[];
	    buildSegHtml(type: any, seg: any, props: any): string;
	    attachSegEls(type: any, segs: any): void;
	    reportEls(type: any, nodes: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/HelperRenderer' {
	import EventFootprint from 'fullcalendar/EventFootprint';
	export class Default {
	    view: any;
	    component: any;
	    eventRenderer: any;
	    helperEls: any;
	    constructor(component: any, eventRenderer: any);
	    renderComponentFootprint(componentFootprint: any): void;
	    renderEventDraggingFootprints(eventFootprints: any, sourceSeg: any, isTouch: any): void;
	    renderEventResizingFootprints(eventFootprints: any, sourceSeg: any, isTouch: any): void;
	    renderEventFootprints(eventFootprints: any, sourceSeg?: any, extraClassNames?: any, opacity?: any): void;
	    renderSegs(segs: any, sourceSeg?: any): void;
	    unrender(): void;
	    fabricateEventFootprint(componentFootprint: any): EventFootprint;
	}
	export default Default;
}
declare module 'fullcalendar/HitDragListener' {
	import DragListener from 'fullcalendar/DragListener';
	export class Default extends DragListener {
	    component: any;
	    origHit: any;
	    hit: any;
	    coordAdjust: any;
	    constructor(component: any, options: any);
	    handleInteractionStart(ev: any): void;
	    handleDragStart(ev: any): void;
	    handleDrag(dx: any, dy: any, ev: any): void;
	    handleDragEnd(ev: any): void;
	    handleHitOver(hit: any): void;
	    handleHitOut(): void;
	    handleHitDone(): void;
	    handleInteractionEnd(ev: any, isCancelled: any): void;
	    handleScrollEnd(): void;
	    queryHit(left: any, top: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/Interaction' {
	export class Default {
	    view: any;
	    component: any;
	    constructor(component: any);
	    opt(name: any): any;
	    end(): void;
	}
	export default Default;
}
declare module 'fullcalendar/ExternalDropping' {
	import { ListenerInterface } from 'fullcalendar/ListenerMixin';
	import Interaction from 'fullcalendar/Interaction';
	export class Default extends Interaction {
	    listenTo: ListenerInterface['listenTo'];
	    stopListeningTo: ListenerInterface['stopListeningTo'];
	    dragListener: any;
	    isDragging: boolean;
	    end(): void;
	    bindToDocument(): void;
	    unbindFromDocument(): void;
	    handleDragStart(ev: any, ui: any): void;
	    listenToExternalDrag(el: any, ev: any, ui: any): void;
	    computeExternalDrop(componentFootprint: any, meta: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/EventResizing' {
	import HitDragListener from 'fullcalendar/HitDragListener';
	import Interaction from 'fullcalendar/Interaction';
	export class Default extends Interaction {
	    eventPointing: any;
	    dragListener: any;
	    isResizing: boolean;
	    constructor(component: any, eventPointing: any);
	    end(): void;
	    bindToEl(el: any): void;
	    handleMouseDown(seg: any, ev: any): void;
	    handleTouchStart(seg: any, ev: any): void;
	    buildDragListener(seg: any, isStart: any): HitDragListener;
	    segResizeStart(seg: any, ev: any): void;
	    segResizeStop(seg: any, ev: any): void;
	    computeEventStartResizeMutation(startFootprint: any, endFootprint: any, origEventFootprint: any): any;
	    computeEventEndResizeMutation(startFootprint: any, endFootprint: any, origEventFootprint: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/EventPointing' {
	import Interaction from 'fullcalendar/Interaction';
	export class Default extends Interaction {
	    mousedOverSeg: any;
	    bindToEl(el: any): void;
	    handleClick(seg: any, ev: any): void;
	    handleMouseover(seg: any, ev: any): void;
	    handleMouseout(seg: any, ev?: any): void;
	    end(): void;
	}
	export default Default;
}
declare module 'fullcalendar/MouseFollower' {
	import { ListenerInterface } from 'fullcalendar/ListenerMixin';
	export class Default {
	    listenTo: ListenerInterface['listenTo'];
	    stopListeningTo: ListenerInterface['stopListeningTo'];
	    options: any;
	    sourceEl: any;
	    el: any;
	    parentEl: any;
	    top0: any;
	    left0: any;
	    y0: any;
	    x0: any;
	    topDelta: any;
	    leftDelta: any;
	    isFollowing: boolean;
	    isHidden: boolean;
	    isAnimating: boolean;
	    constructor(sourceEl: any, options: any);
	    start(ev: any): void;
	    stop(shouldRevert: any, callback: any): void;
	    getEl(): any;
	    removeElement(): void;
	    updatePosition(): void;
	    handleMove(ev: any): void;
	    hide(): void;
	    show(): void;
	}
	export default Default;
}
declare module 'fullcalendar/EventDragging' {
	import EventDefMutation from 'fullcalendar/EventDefMutation';
	import Interaction from 'fullcalendar/Interaction';
	export class Default extends Interaction {
	    eventPointing: any;
	    dragListener: any;
	    isDragging: boolean;
	    constructor(component: any, eventPointing: any);
	    end(): void;
	    getSelectionDelay(): any;
	    bindToEl(el: any): void;
	    handleMousedown(seg: any, ev: any): void;
	    handleTouchStart(seg: any, ev: any): void;
	    buildSelectListener(seg: any): any;
	    buildDragListener(seg: any): any;
	    segDragStart(seg: any, ev: any): void;
	    segDragStop(seg: any, ev: any): void;
	    computeEventDropMutation(startFootprint: any, endFootprint: any, eventDef: any): EventDefMutation;
	    computeEventDateMutation(startFootprint: any, endFootprint: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/DateSelecting' {
	import HitDragListener from 'fullcalendar/HitDragListener';
	import ComponentFootprint from 'fullcalendar/ComponentFootprint';
	import Interaction from 'fullcalendar/Interaction';
	export class Default extends Interaction {
	    dragListener: any;
	    constructor(component: any);
	    end(): void;
	    getDelay(): any;
	    bindToEl(el: any): void;
	    buildDragListener(): HitDragListener;
	    computeSelection(footprint0: any, footprint1: any): false | ComponentFootprint;
	    computeSelectionFootprint(footprint0: any, footprint1: any): ComponentFootprint;
	    isSelectionFootprintAllowed(componentFootprint: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/DateClicking' {
	import HitDragListener from 'fullcalendar/HitDragListener';
	import Interaction from 'fullcalendar/Interaction';
	export class Default extends Interaction {
	    dragListener: any;
	    constructor(component: any);
	    end(): void;
	    bindToEl(el: any): void;
	    buildDragListener(): HitDragListener;
	}
	export default Default;
}
declare module 'fullcalendar/StandardInteractionsMixin' {
	import Mixin from 'fullcalendar/Mixin';
	export class Default extends Mixin {
	}
	export default Default;
}
declare module 'fullcalendar/TimeGridEventRenderer' {
	import EventRenderer from 'fullcalendar/EventRenderer';
	export class Default extends EventRenderer {
	    timeGrid: any;
	    constructor(timeGrid: any, fillRenderer: any);
	    renderFgSegs(segs: any): void;
	    renderFgSegsIntoContainers(segs: any, containerEls: any): void;
	    unrenderFgSegs(): void;
	    computeEventTimeFormat(): any;
	    computeDisplayEventEnd(): boolean;
	    fgSegHtml(seg: any, disableResizing: any): string;
	    updateFgSegCoords(segs: any): void;
	    computeFgSegHorizontals(segs: any): void;
	    computeFgSegForwardBack(seg: any, seriesBackwardPressure: any, seriesBackwardCoord: any): void;
	    sortForwardSegs(forwardSegs: any): void;
	    compareForwardSegs(seg1: any, seg2: any): any;
	    assignFgSegHorizontals(segs: any): void;
	    generateFgSegHorizontalCss(seg: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/TimeGridHelperRenderer' {
	import HelperRenderer from 'fullcalendar/HelperRenderer';
	export class Default extends HelperRenderer {
	    renderSegs(segs: any, sourceSeg: any): JQuery;
	}
	export default Default;
}
declare module 'fullcalendar/TimeGridFillRenderer' {
	import FillRenderer from 'fullcalendar/FillRenderer';
	export class Default extends FillRenderer {
	    attachSegEls(type: any, segs: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/TimeGrid' {
	import * as moment from 'moment';
	import InteractiveDateComponent from 'fullcalendar/InteractiveDateComponent';
	import { DayTableInterface } from 'fullcalendar/DayTableMixin';
	import ComponentFootprint from 'fullcalendar/ComponentFootprint';
	export class Default extends InteractiveDateComponent {
	    dayDates: DayTableInterface['dayDates'];
	    daysPerRow: DayTableInterface['daysPerRow'];
	    colCnt: DayTableInterface['colCnt'];
	    updateDayTable: DayTableInterface['updateDayTable'];
	    renderHeadHtml: DayTableInterface['renderHeadHtml'];
	    renderBgTrHtml: DayTableInterface['renderBgTrHtml'];
	    bookendCells: DayTableInterface['bookendCells'];
	    getCellDate: DayTableInterface['getCellDate'];
	    view: any;
	    helperRenderer: any;
	    dayRanges: any;
	    slotDuration: any;
	    snapDuration: any;
	    snapsPerSlot: any;
	    labelFormat: any;
	    labelInterval: any;
	    headContainerEl: any;
	    colEls: any;
	    slatContainerEl: any;
	    slatEls: any;
	    nowIndicatorEls: any;
	    colCoordCache: any;
	    slatCoordCache: any;
	    bottomRuleEl: any;
	    contentSkeletonEl: any;
	    colContainerEls: any;
	    fgContainerEls: any;
	    bgContainerEls: any;
	    helperContainerEls: any;
	    highlightContainerEls: any;
	    businessContainerEls: any;
	    helperSegs: any;
	    highlightSegs: any;
	    businessSegs: any;
	    constructor(view: any);
	    componentFootprintToSegs(componentFootprint: any): any[];
	    sliceRangeByTimes(unzonedRange: any): any[];
	    processOptions(): void;
	    computeLabelInterval(slotDuration: any): any;
	    renderDates(dateProfile: any): void;
	    unrenderDates(): void;
	    renderSkeleton(): void;
	    renderSlats(): void;
	    renderSlatRowHtml(): string;
	    renderColumns(): void;
	    unrenderColumns(): void;
	    renderContentSkeleton(): void;
	    unrenderContentSkeleton(): void;
	    groupSegsByCol(segs: any): any[];
	    attachSegsByCol(segsByCol: any, containerEls: any): void;
	    getNowIndicatorUnit(): string;
	    renderNowIndicator(date: any): void;
	    unrenderNowIndicator(): void;
	    updateSize(totalHeight: any, isAuto: any, isResize: any): void;
	    getTotalSlatHeight(): any;
	    computeDateTop(ms: any, startOfDayDate: any): any;
	    computeTimeTop(time: any): any;
	    updateSegVerticals(segs: any): void;
	    computeSegVerticals(segs: any): void;
	    assignSegVerticals(segs: any): void;
	    generateSegVerticalCss(seg: any): {
	        top: any;
	        bottom: number;
	    };
	    prepareHits(): void;
	    releaseHits(): void;
	    queryHit(leftOffset: any, topOffset: any): any;
	    getHitFootprint(hit: any): ComponentFootprint;
	    computeSnapTime(snapIndex: any): moment.Duration;
	    getHitEl(hit: any): any;
	    renderDrag(eventFootprints: any, seg: any, isTouch: any): boolean;
	    unrenderDrag(): void;
	    renderEventResize(eventFootprints: any, seg: any, isTouch: any): void;
	    unrenderEventResize(): void;
	    renderSelectionFootprint(componentFootprint: any): void;
	    unrenderSelection(): void;
	}
	export default Default;
}
declare module 'fullcalendar/Popover' {
	import { ListenerInterface } from 'fullcalendar/ListenerMixin';
	export class Default {
	    listenTo: ListenerInterface['listenTo'];
	    stopListeningTo: ListenerInterface['stopListeningTo'];
	    isHidden: boolean;
	    options: any;
	    el: any;
	    margin: number;
	    constructor(options: any);
	    show(): void;
	    hide(): void;
	    render(): void;
	    documentMousedown(ev: any): void;
	    removeElement(): void;
	    position(): void;
	    trigger(name: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/DayGridEventRenderer' {
	import EventRenderer from 'fullcalendar/EventRenderer';
	export class Default extends EventRenderer {
	    dayGrid: any;
	    rowStructs: any;
	    constructor(dayGrid: any, fillRenderer: any);
	    renderBgRanges(eventRanges: any): void;
	    renderFgSegs(segs: any): void;
	    unrenderFgSegs(): void;
	    renderSegRows(segs: any): any[];
	    renderSegRow(row: any, rowSegs: any): {
	        row: any;
	        tbodyEl: JQuery;
	        cellMatrix: any[];
	        segMatrix: any[];
	        segLevels: any[];
	        segs: any;
	    };
	    buildSegLevels(segs: any): any[];
	    groupSegRows(segs: any): any[];
	    computeEventTimeFormat(): any;
	    computeDisplayEventEnd(): boolean;
	    fgSegHtml(seg: any, disableResizing: any): string;
	}
	export default Default;
}
declare module 'fullcalendar/DayGridHelperRenderer' {
	import HelperRenderer from 'fullcalendar/HelperRenderer';
	export class Default extends HelperRenderer {
	    renderSegs(segs: any, sourceSeg: any): JQuery;
	}
	export default Default;
}
declare module 'fullcalendar/DayGridFillRenderer' {
	import FillRenderer from 'fullcalendar/FillRenderer';
	export class Default extends FillRenderer {
	    fillSegTag: string;
	    attachSegEls(type: any, segs: any): any[];
	    renderFillRow(type: any, seg: any): any;
	}
	export default Default;
}
declare module 'fullcalendar/DayGrid' {
	import ComponentFootprint from 'fullcalendar/ComponentFootprint';
	import InteractiveDateComponent from 'fullcalendar/InteractiveDateComponent';
	import { DayTableInterface } from 'fullcalendar/DayTableMixin';
	export class Default extends InteractiveDateComponent {
	    rowCnt: DayTableInterface['rowCnt'];
	    colCnt: DayTableInterface['colCnt'];
	    daysPerRow: DayTableInterface['daysPerRow'];
	    sliceRangeByRow: DayTableInterface['sliceRangeByRow'];
	    updateDayTable: DayTableInterface['updateDayTable'];
	    renderHeadHtml: DayTableInterface['renderHeadHtml'];
	    getCellDate: DayTableInterface['getCellDate'];
	    renderBgTrHtml: DayTableInterface['renderBgTrHtml'];
	    renderIntroHtml: DayTableInterface['renderIntroHtml'];
	    getCellRange: DayTableInterface['getCellRange'];
	    sliceRangeByDay: DayTableInterface['sliceRangeByDay'];
	    view: any;
	    helperRenderer: any;
	    cellWeekNumbersVisible: boolean;
	    bottomCoordPadding: number;
	    headContainerEl: any;
	    rowEls: any;
	    cellEls: any;
	    rowCoordCache: any;
	    colCoordCache: any;
	    isRigid: boolean;
	    hasAllDayBusinessHours: boolean;
	    segPopover: any;
	    popoverSegs: any;
	    constructor(view: any);
	    componentFootprintToSegs(componentFootprint: any): any;
	    renderDates(dateProfile: any): void;
	    unrenderDates(): void;
	    renderGrid(): void;
	    renderDayRowHtml(row: any, isRigid: any): string;
	    getIsNumbersVisible(): boolean;
	    getIsDayNumbersVisible(): boolean;
	    renderNumberTrHtml(row: any): string;
	    renderNumberIntroHtml(row: any): any;
	    renderNumberCellsHtml(row: any): string;
	    renderNumberCellHtml(date: any): string;
	    prepareHits(): void;
	    releaseHits(): void;
	    queryHit(leftOffset: any, topOffset: any): any;
	    getHitFootprint(hit: any): ComponentFootprint;
	    getHitEl(hit: any): any;
	    getCellHit(row: any, col: any): any;
	    getCellEl(row: any, col: any): any;
	    executeEventUnrender(): void;
	    getOwnEventSegs(): any;
	    renderDrag(eventFootprints: any, seg: any, isTouch: any): boolean;
	    unrenderDrag(): void;
	    renderEventResize(eventFootprints: any, seg: any, isTouch: any): void;
	    unrenderEventResize(): void;
	    removeSegPopover(): void;
	    limitRows(levelLimit: any): void;
	    computeRowLevelLimit(row: any): (number | false);
	    limitRow(row: any, levelLimit: any): void;
	    unlimitRow(row: any): void;
	    renderMoreLink(row: any, col: any, hiddenSegs: any): JQuery;
	    showSegPopover(row: any, col: any, moreLink: any, segs: any): void;
	    renderSegPopoverContent(row: any, col: any, segs: any): JQuery;
	    resliceDaySegs(segs: any, dayDate: any): any[];
	    getMoreLinkText(num: any): any;
	    getCellSegs(row: any, col: any, startLevel?: any): any[];
	}
	export default Default;
}
declare module 'fullcalendar/AgendaView' {
	import View from 'fullcalendar/View';
	export class Default extends View {
	    timeGridClass: any;
	    dayGridClass: any;
	    timeGrid: any;
	    dayGrid: any;
	    scroller: any;
	    axisWidth: any;
	    usesMinMaxTime: boolean;
	    constructor(calendar: any, viewSpec: any);
	    instantiateTimeGrid(): any;
	    instantiateDayGrid(): any;
	    renderSkeleton(): void;
	    unrenderSkeleton(): void;
	    renderSkeletonHtml(): string;
	    axisStyleAttr(): string;
	    getNowIndicatorUnit(): any;
	    updateSize(totalHeight: any, isAuto: any, isResize: any): void;
	    computeScrollerHeight(totalHeight: any): number;
	    computeInitialDateScroll(): {
	        top: any;
	    };
	    queryDateScroll(): {
	        top: any;
	    };
	    applyDateScroll(scroll: any): void;
	    getHitFootprint(hit: any): any;
	    getHitEl(hit: any): any;
	    executeEventRender(eventsPayload: any): void;
	    renderDrag(eventFootprints: any, seg: any, isTouch: any): boolean;
	    renderEventResize(eventFootprints: any, seg: any, isTouch: any): void;
	    renderSelectionFootprint(componentFootprint: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/BasicViewDateProfileGenerator' {
	import UnzonedRange from 'fullcalendar/UnzonedRange';
	import DateProfileGenerator from 'fullcalendar/DateProfileGenerator';
	export class Default extends DateProfileGenerator {
	    buildRenderRange(currentUnzonedRange: any, currentRangeUnit: any, isRangeAllDay: any): UnzonedRange;
	}
	export default Default;
}
declare module 'fullcalendar/BasicView' {
	import View from 'fullcalendar/View';
	export class Default extends View {
	    dateProfileGeneratorClass: any;
	    dayGridClass: any;
	    scroller: any;
	    dayGrid: any;
	    weekNumberWidth: any;
	    constructor(calendar: any, viewSpec: any);
	    instantiateDayGrid(): any;
	    executeDateRender(dateProfile: any): void;
	    renderSkeleton(): void;
	    unrenderSkeleton(): void;
	    renderSkeletonHtml(): string;
	    weekNumberStyleAttr(): string;
	    hasRigidRows(): boolean;
	    updateSize(totalHeight: any, isAuto: any, isResize: any): void;
	    computeScrollerHeight(totalHeight: any): number;
	    setGridHeight(height: any, isAuto: any): void;
	    computeInitialDateScroll(): {
	        top: number;
	    };
	    queryDateScroll(): {
	        top: any;
	    };
	    applyDateScroll(scroll: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/MonthViewDateProfileGenerator' {
	import BasicViewDateProfileGenerator from 'fullcalendar/BasicViewDateProfileGenerator';
	import UnzonedRange from 'fullcalendar/UnzonedRange';
	export class Default extends BasicViewDateProfileGenerator {
	    buildRenderRange(currentUnzonedRange: any, currentRangeUnit: any, isRangeAllDay: any): UnzonedRange;
	}
	export default Default;
}
declare module 'fullcalendar/MonthView' {
	import BasicView from 'fullcalendar/BasicView';
	export class Default extends BasicView {
	    setGridHeight(height: any, isAuto: any): void;
	    isDateInOtherMonth(date: any, dateProfile: any): boolean;
	}
	export default Default;
}
declare module 'fullcalendar/ListEventRenderer' {
	import EventRenderer from 'fullcalendar/EventRenderer';
	export class Default extends EventRenderer {
	    renderFgSegs(segs: any): void;
	    fgSegHtml(seg: any): string;
	    computeEventTimeFormat(): any;
	}
	export default Default;
}
declare module 'fullcalendar/ListEventPointing' {
	import EventPointing from 'fullcalendar/EventPointing';
	export class Default extends EventPointing {
	    handleClick(seg: any, ev: any): void;
	}
	export default Default;
}
declare module 'fullcalendar/ListView' {
	import View from 'fullcalendar/View';
	export class Default extends View {
	    eventRendererClass: any;
	    eventPointingClass: any;
	    segSelector: any;
	    scroller: any;
	    contentEl: any;
	    dayDates: any;
	    dayRanges: any;
	    constructor(calendar: any, viewSpec: any);
	    renderSkeleton(): void;
	    unrenderSkeleton(): void;
	    updateSize(totalHeight: any, isAuto: any, isResize: any): void;
	    computeScrollerHeight(totalHeight: any): number;
	    renderDates(dateProfile: any): void;
	    componentFootprintToSegs(footprint: any): any[];
	    renderEmptyMessage(): void;
	    renderSegList(allSegs: any): void;
	    groupSegsByDay(segs: any): any[];
	    dayHeaderHtml(dayDate: any): string;
	}
	export default Default;
}
declare module 'fullcalendar/src/exports' {
	export const version = "<%= version %>";
	export const internalApiVersion = 12;
	export { EventObjectInput, BusinessHoursInput, EventOptionsBase } from 'fullcalendar/src/types/input-types';
	export { applyAll, debounce, isInt, htmlEscape, cssToStr, proxy, capitaliseFirstLetter, getOuterRect, getClientRect, getContentRect, getScrollbarWidths, preventDefault, parseFieldSpecs, compareByFieldSpecs, compareByFieldSpec, flexibleCompare, computeGreatestUnit, divideRangeByDuration, divideDurationByDuration, multiplyDuration, durationHasTime, log, warn, removeExact, intersectRects } from 'fullcalendar/src/util';
	export { formatDate, formatRange, queryMostGranularFormatUnit } from 'fullcalendar/src/date-formatting';
	export { datepickerLocale, locale } from 'fullcalendar/src/locale';
	export { default as moment } from 'fullcalendar/src/moment-ext';
	export { default as EmitterMixin, EmitterInterface } from 'fullcalendar/EmitterMixin';
	export { default as ListenerMixin, ListenerInterface } from 'fullcalendar/ListenerMixin';
	export { default as Model } from 'fullcalendar/Model';
	export { default as Constraints } from 'fullcalendar/Constraints';
	export { default as UnzonedRange } from 'fullcalendar/UnzonedRange';
	export { default as ComponentFootprint } from 'fullcalendar/ComponentFootprint';
	export { default as BusinessHourGenerator } from 'fullcalendar/BusinessHourGenerator';
	export { default as EventDef } from 'fullcalendar/EventDef';
	export { default as EventDefMutation } from 'fullcalendar/EventDefMutation';
	export { default as EventSourceParser } from 'fullcalendar/EventSourceParser';
	export { default as EventSource } from 'fullcalendar/EventSource';
	export { defineThemeSystem } from 'fullcalendar/ThemeRegistry';
	export { default as EventInstanceGroup } from 'fullcalendar/EventInstanceGroup';
	export { default as ArrayEventSource } from 'fullcalendar/ArrayEventSource';
	export { default as FuncEventSource } from 'fullcalendar/FuncEventSource';
	export { default as JsonFeedEventSource } from 'fullcalendar/JsonFeedEventSource';
	export { default as EventFootprint } from 'fullcalendar/EventFootprint';
	export { default as Class } from 'fullcalendar/Class';
	export { default as Mixin } from 'fullcalendar/Mixin';
	export { default as CoordCache } from 'fullcalendar/CoordCache';
	export { default as DragListener } from 'fullcalendar/DragListener';
	export { default as Promise } from 'fullcalendar/Promise';
	export { default as TaskQueue } from 'fullcalendar/TaskQueue';
	export { default as RenderQueue } from 'fullcalendar/RenderQueue';
	export { default as Scroller } from 'fullcalendar/Scroller';
	export { default as Theme } from 'fullcalendar/Theme';
	export { default as DateComponent } from 'fullcalendar/DateComponent';
	export { default as InteractiveDateComponent } from 'fullcalendar/InteractiveDateComponent';
	export { default as Calendar } from 'fullcalendar/Calendar';
	export { default as View } from 'fullcalendar/View';
	export { defineView, getViewConfig } from 'fullcalendar/ViewRegistry';
	export { default as DayTableMixin } from 'fullcalendar/DayTableMixin';
	export { default as BusinessHourRenderer } from 'fullcalendar/BusinessHourRenderer';
	export { default as EventRenderer } from 'fullcalendar/EventRenderer';
	export { default as FillRenderer } from 'fullcalendar/FillRenderer';
	export { default as HelperRenderer } from 'fullcalendar/HelperRenderer';
	export { default as ExternalDropping } from 'fullcalendar/ExternalDropping';
	export { default as EventResizing } from 'fullcalendar/EventResizing';
	export { default as EventPointing } from 'fullcalendar/EventPointing';
	export { default as EventDragging } from 'fullcalendar/EventDragging';
	export { default as DateSelecting } from 'fullcalendar/DateSelecting';
	export { default as StandardInteractionsMixin } from 'fullcalendar/StandardInteractionsMixin';
	export { default as AgendaView } from 'fullcalendar/AgendaView';
	export { default as TimeGrid } from 'fullcalendar/TimeGrid';
	export { default as DayGrid } from 'fullcalendar/DayGrid';
	export { default as BasicView } from 'fullcalendar/BasicView';
	export { default as MonthView } from 'fullcalendar/MonthView';
	export { default as ListView } from 'fullcalendar/ListView';
}
declare module 'fullcalendar/BootstrapTheme' {
	import Theme from 'fullcalendar/Theme';
	export class Default extends Theme {
	}
	export default Default;
}
declare module 'fullcalendar/src/types/jquery-hooks' {
	import * as moment from 'moment';
	import Calendar from 'fullcalendar/Calendar';
	import View from 'fullcalendar/View';
	import EventSource from 'fullcalendar/EventSource';
	import { RangeInput, MomentInput, OptionsInput, EventObjectInput, EventSourceInput } from 'fullcalendar/src/types/input-types'; global  {
	    interface JQueryStatic {
	        fullCalendar: object;
	    }
	    interface JQuery {
	        fullCalendar(options?: OptionsInput): JQuery;
	        fullCalendar(method: 'getCalendar'): Calendar;
	        fullCalendar(method: 'getView'): View;
	        fullCalendar(method: 'destroy'): JQuery;
	        fullCalendar(method: 'option', name: string | object, value?: any): any;
	        fullCalendar(method: 'isValidViewType', viewType: string): boolean;
	        fullCalendar(method: 'changeView', viewName: string, dateOrRange: RangeInput | MomentInput): JQuery;
	        fullCalendar(method: 'zoomTo', newDate: moment.Moment, viewType?: string): JQuery;
	        fullCalendar(method: 'prev'): JQuery;
	        fullCalendar(method: 'next'): JQuery;
	        fullCalendar(method: 'prevYear'): JQuery;
	        fullCalendar(method: 'nextYear'): JQuery;
	        fullCalendar(method: 'today'): JQuery;
	        fullCalendar(method: 'gotoDate', zonedDateInput: any): JQuery;
	        fullCalendar(method: 'incrementDate', delta: any): JQuery;
	        fullCalendar(method: 'getDate'): moment.Moment;
	        fullCalendar(method: 'render'): JQuery;
	        fullCalendar(method: 'select', zonedStartInput: MomentInput, zonedEndInput?: MomentInput, resourceId?: string): JQuery;
	        fullCalendar(method: 'unselect'): JQuery;
	        fullCalendar(method: 'moment', ...args: any[]): moment.Moment;
	        fullCalendar(method: 'getNow'): moment.Moment;
	        fullCalendar(method: 'rerenderEvents'): JQuery;
	        fullCalendar(method: 'refetchEvents'): JQuery;
	        fullCalendar(method: 'renderEvents', eventInputs: EventObjectInput[], isSticky?: boolean): JQuery;
	        fullCalendar(method: 'renderEvent', eventInput: EventObjectInput, isSticky?: boolean): JQuery;
	        fullCalendar(method: 'removeEvents', legacyQuery: any): JQuery;
	        fullCalendar(method: 'clientEvents', legacyQuery: any): any;
	        fullCalendar(method: 'updateEvents', eventPropsArray: EventObjectInput[]): JQuery;
	        fullCalendar(method: 'updateEvent', eventProps: EventObjectInput): JQuery;
	        fullCalendar(method: 'getEventSources'): EventSource;
	        fullCalendar(method: 'getEventSourceById', id: any): EventSource;
	        fullCalendar(method: 'addEventSource', sourceInput: EventSourceInput): JQuery;
	        fullCalendar(method: 'removeEventSources', sourceMultiQuery: any): JQuery;
	        fullCalendar(method: 'removeEventSource', sourceQuery: any): JQuery;
	        fullCalendar(method: 'refetchEventSources', sourceMultiQuery: any): JQuery;
	    }
	}
}
declare module 'fullcalendar/src/main' {
	import * as exportHooks from 'fullcalendar/src/exports';
	import 'fullcalendar/src/moment-ext';
	import 'fullcalendar/src/date-formatting';
	import 'fullcalendar/src/models/event-source/config';
	import 'fullcalendar/src/theme/config';
	import 'fullcalendar/src/basic/config';
	import 'fullcalendar/src/agenda/config';
	import 'fullcalendar/src/list/config';
	import 'fullcalendar/src/types/jquery-hooks';
	export = exportHooks;
}
declare module 'fullcalendar/plugins/gcal/GcalEventSource' {
	/// <reference types="jquery" />
	import { EventSource } from 'fullcalendar';
	export class Default extends EventSource {
	    static API_BASE: string;
	    googleCalendarApiKey: any;
	    googleCalendarId: any;
	    googleCalendarError: any;
	    ajaxSettings: any;
	    static parse(rawInput: any, calendar: any): any;
	    fetch(start: any, end: any, timezone: any): JQueryPromise<{}>;
	    gcalItemsToRawEventDefs(items: any, gcalTimezone: any): any;
	    gcalItemToRawEventDef(item: any, gcalTimezone: any): {
	        id: any;
	        title: any;
	        start: any;
	        end: any;
	        url: any;
	        location: any;
	        description: any;
	    };
	    buildUrl(): string;
	    buildRequestParams(start: any, end: any, timezone: any): any;
	    reportError(message: any, apiErrorObjs?: any): void;
	    getPrimitive(): any;
	    applyManualStandardProps(rawProps: any): any;
	    applyMiscProps(rawProps: any): void;
	}
	export default Default;
}
declare module 'fullcalendar' {
	import main = require('fullcalendar/src/main');
	export = main;
}
