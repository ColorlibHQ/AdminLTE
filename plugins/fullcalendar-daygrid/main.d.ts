declare module "@fullcalendar/daygrid/DayGridDateProfileGenerator" {
    import { DateProfileGenerator, DateRange } from "@fullcalendar/core";
    export { DayGridDateProfileGenerator as default, DayGridDateProfileGenerator };
    class DayGridDateProfileGenerator extends DateProfileGenerator {
        buildRenderRange(currentRange: any, currentRangeUnit: any, isRangeAllDay: any): DateRange;
    }
}

declare module "@fullcalendar/daygrid/Popover" {
    export interface PopoverOptions {
        className?: string;
        content?: (el: HTMLElement) => void;
        parentEl: HTMLElement;
        autoHide?: boolean;
        top?: number;
        left?: number;
        right?: number;
        viewportConstrain?: boolean;
    }
    export { Popover as default, Popover };
    class Popover {
        isHidden: boolean;
        options: PopoverOptions;
        el: HTMLElement;
        margin: number;
        constructor(options: PopoverOptions);
        show(): void;
        hide(): void;
        render(): void;
        documentMousedown: (ev: any) => void;
        destroy(): void;
        position(): void;
        trigger(name: any): void;
    }
}

declare module "@fullcalendar/daygrid/SimpleDayGridEventRenderer" {
    import { FgEventRenderer, Seg } from "@fullcalendar/core";
    export { SimpleDayGridEventRenderer as default, SimpleDayGridEventRenderer };
    abstract class SimpleDayGridEventRenderer extends FgEventRenderer {
        renderSegHtml(seg: Seg, mirrorInfo: any): string;
        computeEventTimeFormat(): {
            hour: string;
            minute: string;
            omitZeroMinute: boolean;
            meridiem: string;
        };
        computeDisplayEventEnd(): boolean;
    }
}

declare module "@fullcalendar/daygrid/DayGridEventRenderer" {
    import { Seg } from "@fullcalendar/core";
    import DayGrid from "@fullcalendar/daygrid/DayGrid";
    import SimpleDayGridEventRenderer from "@fullcalendar/daygrid/SimpleDayGridEventRenderer";
    export { DayGridEventRenderer as default, DayGridEventRenderer };
    class DayGridEventRenderer extends SimpleDayGridEventRenderer {
        dayGrid: DayGrid;
        rowStructs: any;
        constructor(dayGrid: DayGrid);
        attachSegs(segs: Seg[], mirrorInfo: any): void;
        detachSegs(): void;
        renderSegRows(segs: Seg[]): any[];
        renderSegRow(row: any, rowSegs: any): {
            row: any;
            tbodyEl: HTMLTableSectionElement;
            cellMatrix: any[];
            segMatrix: any[];
            segLevels: any[];
            segs: any;
        };
        buildSegLevels(segs: Seg[]): any[];
        groupSegRows(segs: Seg[]): any[];
        computeDisplayEventEnd(): boolean;
    }
}

declare module "@fullcalendar/daygrid/DayGridMirrorRenderer" {
    import { Seg } from "@fullcalendar/core";
    import DayGridEventRenderer from "@fullcalendar/daygrid/DayGridEventRenderer";
    export { DayGridMirrorRenderer as default, DayGridMirrorRenderer };
    class DayGridMirrorRenderer extends DayGridEventRenderer {
        attachSegs(segs: Seg[], mirrorInfo: any): void;
    }
}

declare module "@fullcalendar/daygrid/DayGridFillRenderer" {
    import { FillRenderer, Seg } from "@fullcalendar/core";
    import DayGrid, { DayGridSeg } from "@fullcalendar/daygrid/DayGrid";
    export { DayGridFillRenderer as default, DayGridFillRenderer };
    class DayGridFillRenderer extends FillRenderer {
        fillSegTag: string;
        dayGrid: DayGrid;
        constructor(dayGrid: DayGrid);
        renderSegs(type: string, segs: DayGridSeg[]): void;
        attachSegs(type: any, segs: Seg[]): any[];
        renderFillRow(type: any, seg: Seg): HTMLElement;
    }
}

declare module "@fullcalendar/daygrid/DayTile" {
    import { DateComponent, Seg, Hit, DateMarker, ComponentContext, EventInstanceHash } from "@fullcalendar/core";
    import SimpleDayGridEventRenderer from "@fullcalendar/daygrid/SimpleDayGridEventRenderer";
    export interface DayTileProps {
        date: DateMarker;
        fgSegs: Seg[];
        eventSelection: string;
        eventDragInstances: EventInstanceHash;
        eventResizeInstances: EventInstanceHash;
    }
    export { DayTile as default, DayTile };
    class DayTile extends DateComponent<DayTileProps> {
        segContainerEl: HTMLElement;
        private renderFrame;
        private renderFgEvents;
        private renderEventSelection;
        private renderEventDrag;
        private renderEventResize;
        constructor(context: ComponentContext, el: HTMLElement);
        render(props: DayTileProps): void;
        destroy(): void;
        _renderFrame(date: DateMarker): void;
        queryHit(positionLeft: number, positionTop: number, elWidth: number, elHeight: number): Hit | null;
    }
    export class DayTileEventRenderer extends SimpleDayGridEventRenderer {
        dayTile: DayTile;
        constructor(dayTile: any);
        attachSegs(segs: Seg[]): void;
        detachSegs(segs: Seg[]): void;
    }
}

declare module "@fullcalendar/daygrid/DayBgRow" {
    import { ComponentContext, DateMarker, DateProfile } from "@fullcalendar/core";
    export interface DayBgCell {
        date: DateMarker;
        htmlAttrs?: string;
    }
    export interface DayBgRowProps {
        cells: DayBgCell[];
        dateProfile: DateProfile;
        renderIntroHtml?: () => string;
    }
    export { DayBgRow as default, DayBgRow };
    class DayBgRow {
        context: ComponentContext;
        constructor(context: ComponentContext);
        renderHtml(props: DayBgRowProps): string;
    }
}

declare module "@fullcalendar/daygrid/DayGrid" {
    import { PositionCache, DateMarker, DateComponent, EventSegUiInteractionState, Seg, DateProfile } from "@fullcalendar/core";
    import Popover from "@fullcalendar/daygrid/Popover";
    import DayGridEventRenderer from "@fullcalendar/daygrid/DayGridEventRenderer";
    import DayTile from "@fullcalendar/daygrid/DayTile";
    export interface RenderProps {
        renderNumberIntroHtml: (row: number, dayGrid: DayGrid) => string;
        renderBgIntroHtml: () => string;
        renderIntroHtml: () => string;
        colWeekNumbersVisible: boolean;
        cellWeekNumbersVisible: boolean;
    }
    export interface DayGridSeg extends Seg {
        row: number;
        firstCol: number;
        lastCol: number;
    }
    export interface DayGridCell {
        date: DateMarker;
        htmlAttrs?: string;
    }
    export interface DayGridProps {
        dateProfile: DateProfile;
        cells: DayGridCell[][];
        businessHourSegs: DayGridSeg[];
        bgEventSegs: DayGridSeg[];
        fgEventSegs: DayGridSeg[];
        dateSelectionSegs: DayGridSeg[];
        eventSelection: string;
        eventDrag: EventSegUiInteractionState | null;
        eventResize: EventSegUiInteractionState | null;
        isRigid: boolean;
    }
    export { DayGrid as default, DayGrid };
    class DayGrid extends DateComponent<DayGridProps> {
        eventRenderer: DayGridEventRenderer;
        renderProps: RenderProps;
        rowCnt: number;
        colCnt: number;
        bottomCoordPadding: number;
        rowEls: HTMLElement[];
        cellEls: HTMLElement[];
        isCellSizesDirty: boolean;
        rowPositions: PositionCache;
        colPositions: PositionCache;
        segPopover: Popover;
        segPopoverTile: DayTile;
        private renderCells;
        private renderBusinessHours;
        private renderDateSelection;
        private renderBgEvents;
        private renderFgEvents;
        private renderEventSelection;
        private renderEventDrag;
        private renderEventResize;
        constructor(context: any, el: any, renderProps: RenderProps);
        render(props: DayGridProps): void;
        destroy(): void;
        getCellRange(row: any, col: any): {
            start: Date;
            end: Date;
        };
        updateSegPopoverTile(date?: any, segs?: any): void;
        _renderCells(cells: DayGridCell[][], isRigid: boolean): void;
        _unrenderCells(): void;
        renderDayRowHtml(row: any, isRigid: any): string;
        getIsNumbersVisible(): boolean;
        getIsDayNumbersVisible(): boolean;
        renderNumberTrHtml(row: number): string;
        renderNumberCellsHtml(row: any): string;
        renderNumberCellHtml(date: any): string;
        updateSize(isResize: boolean): void;
        buildPositionCaches(): void;
        buildColPositions(): void;
        buildRowPositions(): void;
        positionToHit(leftPosition: any, topPosition: any): {
            row: any;
            col: any;
            dateSpan: {
                range: {
                    start: Date;
                    end: Date;
                };
                allDay: boolean;
            };
            dayEl: HTMLElement;
            relativeRect: {
                left: any;
                right: any;
                top: any;
                bottom: any;
            };
        };
        getCellEl(row: any, col: any): HTMLElement;
        _renderEventDrag(state: EventSegUiInteractionState): void;
        _unrenderEventDrag(state: EventSegUiInteractionState): void;
        _renderEventResize(state: EventSegUiInteractionState): void;
        _unrenderEventResize(state: EventSegUiInteractionState): void;
        removeSegPopover(): void;
        limitRows(levelLimit: any): void;
        computeRowLevelLimit(row: any): (number | false);
        limitRow(row: any, levelLimit: any): void;
        unlimitRow(row: any): void;
        renderMoreLink(row: any, col: any, hiddenSegs: any): HTMLElement;
        showSegPopover(row: any, col: any, moreLink: HTMLElement, segs: any): void;
        resliceDaySegs(segs: any, dayDate: any): any[];
        getMoreLinkText(num: any): any;
        getCellSegs(row: any, col: any, startLevel?: any): any[];
    }
}

declare module "@fullcalendar/daygrid/AbstractDayGridView" {
    import { ScrollComponent, View, ComponentContext, ViewSpec, DateProfileGenerator } from "@fullcalendar/core";
    import DayGrid from "@fullcalendar/daygrid/DayGrid";
    export { DayGridView as default, DayGridView };
    abstract class DayGridView extends View {
        scroller: ScrollComponent;
        dayGrid: DayGrid;
        colWeekNumbersVisible: boolean;
        weekNumberWidth: number;
        constructor(context: ComponentContext, viewSpec: ViewSpec, dateProfileGenerator: DateProfileGenerator, parentEl: HTMLElement);
        destroy(): void;
        renderSkeletonHtml(): string;
        weekNumberStyleAttr(): string;
        hasRigidRows(): boolean;
        updateSize(isResize: boolean, viewHeight: number, isAuto: boolean): void;
        updateBaseSize(isResize: boolean, viewHeight: number, isAuto: boolean): void;
        computeScrollerHeight(viewHeight: any): number;
        setGridHeight(height: any, isAuto: any): void;
        computeDateScroll(timeMs: number): {
            top: number;
        };
        queryDateScroll(): {
            top: number;
        };
        applyDateScroll(scroll: any): void;
        renderHeadIntroHtml: () => string;
        renderDayGridNumberIntroHtml: (row: number, dayGrid: DayGrid) => string;
        renderDayGridBgIntroHtml: () => string;
        renderDayGridIntroHtml: () => string;
    }
}

declare module "@fullcalendar/daygrid/SimpleDayGrid" {
    import { DateProfile, EventStore, EventUiHash, DateSpan, EventInteractionState, DayTable, Duration, DateComponent, DateRange, Slicer, Hit, ComponentContext } from "@fullcalendar/core";
    import { default as DayGrid, DayGridSeg } from "@fullcalendar/daygrid/DayGrid";
    export interface SimpleDayGridProps {
        dateProfile: DateProfile | null;
        dayTable: DayTable;
        nextDayThreshold: Duration;
        businessHours: EventStore;
        eventStore: EventStore;
        eventUiBases: EventUiHash;
        dateSelection: DateSpan | null;
        eventSelection: string;
        eventDrag: EventInteractionState | null;
        eventResize: EventInteractionState | null;
        isRigid: boolean;
    }
    export { SimpleDayGrid as default, SimpleDayGrid };
    class SimpleDayGrid extends DateComponent<SimpleDayGridProps> {
        dayGrid: DayGrid;
        private slicer;
        constructor(context: ComponentContext, dayGrid: DayGrid);
        destroy(): void;
        render(props: SimpleDayGridProps): void;
        buildPositionCaches(): void;
        queryHit(positionLeft: number, positionTop: number): Hit;
    }
    export class DayGridSlicer extends Slicer<DayGridSeg, [DayTable]> {
        sliceRange(dateRange: DateRange, dayTable: DayTable): DayGridSeg[];
    }
}

declare module "@fullcalendar/daygrid/DayGridView" {
    import { DayHeader, ComponentContext, ViewSpec, DateProfileGenerator, DateProfile, ViewProps, DayTable } from "@fullcalendar/core";
    import AbstractDayGridView from "@fullcalendar/daygrid/AbstractDayGridView";
    import SimpleDayGrid from "@fullcalendar/daygrid/SimpleDayGrid";
    export { DayGridView as default, DayGridView };
    class DayGridView extends AbstractDayGridView {
        header: DayHeader;
        simpleDayGrid: SimpleDayGrid;
        dayTable: DayTable;
        private buildDayTable;
        constructor(_context: ComponentContext, viewSpec: ViewSpec, dateProfileGenerator: DateProfileGenerator, parentEl: HTMLElement);
        destroy(): void;
        render(props: ViewProps): void;
    }
    export function buildDayTable(dateProfile: DateProfile, dateProfileGenerator: DateProfileGenerator): DayTable;
}

declare module "@fullcalendar/daygrid" {
    export { default as SimpleDayGrid, DayGridSlicer } from "@fullcalendar/daygrid/SimpleDayGrid";
    export { default as DayGrid, DayGridSeg } from "@fullcalendar/daygrid/DayGrid";
    export { default as AbstractDayGridView } from "@fullcalendar/daygrid/AbstractDayGridView";
    export { default as DayGridView, buildDayTable as buildBasicDayTable } from "@fullcalendar/daygrid/DayGridView";
    export { default as DayBgRow } from "@fullcalendar/daygrid/DayBgRow";
    const _default_6: import("@fullcalendar/core/plugin-system").PluginDef;
    export default _default_6;
}