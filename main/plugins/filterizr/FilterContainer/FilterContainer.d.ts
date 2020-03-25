import { FilterizrState } from '../types';
import FilterizrOptions from '../FilterizrOptions';
import FilterItems from '../FilterItems';
import FilterizrElement from '../FilterizrElement';
import StyledFilterContainer from './StyledFilterContainer';
/**
 * Resembles the grid of items within Filterizr.
 */
export default class FilterContainer extends FilterizrElement {
    filterItems: FilterItems;
    protected styledNode: StyledFilterContainer;
    private _filterizrState;
    constructor(node: Element, options: FilterizrOptions);
    readonly styles: StyledFilterContainer;
    filterizrState: FilterizrState;
    destroy(): void;
    /**
     * Turn the HTML elements in the grid to FilterItem
     * instances and return a collection of them.
     * @throws when no filter items are found in the grid.
     */
    makeFilterItems(options: FilterizrOptions): FilterItems;
    insertItem(node: HTMLElement): void;
    removeItem(node: HTMLElement): void;
    setHeight(newHeight: number): void;
    bindEvents(): void;
    unbindEvents(): void;
}
