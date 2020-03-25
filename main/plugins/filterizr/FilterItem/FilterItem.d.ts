import { Position } from '../types/interfaces';
import FilterizrOptions from '../FilterizrOptions';
import FilterizrElement from '../FilterizrElement';
import StyledFilterItem from './StyledFilterItem';
/**
 * Resembles an item in the grid of Filterizr.
 */
export default class FilterItem extends FilterizrElement {
    protected styledNode: StyledFilterItem;
    private filteredOut;
    private lastPosition;
    private sortData;
    constructor(node: Element, index: number, options: FilterizrOptions);
    readonly styles: StyledFilterItem;
    /**
     * Destroys the FilterItem instance
     */
    destroy(): void;
    /**
     * Filters in a specific FilterItem out of the grid.
     */
    filterIn(targetPosition: Position): void;
    /**
     * Filters out a specific FilterItem out of the grid.
     */
    filterOut(): void;
    /**
     * Returns true if the text contents of the FilterItem match the search term
     * @param searchTerm to look up
     */
    contentsMatchSearch(searchTerm: string): boolean;
    /**
     * Returns all categories of the grid items data-category attribute
     * with a regexp regarding all whitespace.
     */
    getCategories(): string[];
    /**
     * Returns the value of the sort attribute
     * @param sortAttribute "index", "sortData" or custom user data-attribute by which to sort
     */
    getSortAttribute(sortAttribute: string): string | number;
    protected bindEvents(): void;
    protected unbindEvents(): void;
}
