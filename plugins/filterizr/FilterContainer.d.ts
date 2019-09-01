import { RawOptionsCallbacks } from './FilterizrOptions/defaultOptions';
import FilterizrOptions from './FilterizrOptions/FilterizrOptions';
import FilterItems from './FilterItems';
/**
 * Resembles the grid of items within Filterizr.
 */
export default class FilterContainer {
    node: Element;
    options: FilterizrOptions;
    filterItems: FilterItems;
    dimensions: {
        width: number;
        height: number;
    };
    private onTransitionEndHandler?;
    constructor(node: Element, options: FilterizrOptions);
    destroy(): void;
    /**
     * Turn the HTML elements in the grid to FilterItem
     * instances and return a collection of them.
     */
    makeFilterItems(options: FilterizrOptions): FilterItems;
    /**
     * Inserts a new item into the grid.
     * @param node - HTML node to instantiate as FilterItem and append to the grid
     * @param options - Filterizr options
     */
    insertItem(node: Element, options: FilterizrOptions): void;
    calculateColumns(): number;
    updateDimensions(): void;
    updateHeight(newHeight: number): void;
    bindEvents(callbacks: RawOptionsCallbacks): void;
    unbindEvents(callbacks: RawOptionsCallbacks): void;
    trigger(eventType: string): void;
    private updateWidth;
}
