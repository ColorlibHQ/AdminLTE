import { Dictionary } from './types/interfaces/Dictionary';
import FilterizrOptions from './FilterizrOptions/FilterizrOptions';
export interface Position {
    left: number;
    top: number;
}
/**
 * Resembles an item in the grid of Filterizr.
 */
export default class FilterItem {
    node: Element;
    options: FilterizrOptions;
    dimensions: {
        width: number;
        height: number;
    };
    private data;
    private sortData;
    private index;
    private filteredOut;
    private lastPosition;
    private onTransitionEndHandler;
    constructor(node: Element, index: number, options: FilterizrOptions);
    /**
     * Destroys the FilterItem instance
     */
    destroy(): void;
    /**
     * Filters in a specific FilterItem out of the grid.
     * @param targetPosition the position towards which the element should animate
     * @param cssOptions for the animation
     */
    filterIn(targetPosition: Position, cssOptions: Dictionary): void;
    /**
     * Filters out a specific FilterItem out of the grid.
     * @param cssOptions for the animation
     */
    filterOut(cssOptions: Dictionary): void;
    /**
     * Helper method to calculate the animation delay for a given grid item
     * @param delay in ms
     * @param delayMode can be 'alternate' or 'progressive'
     */
    getTransitionDelay(delay: number, delayMode: 'progressive' | 'alternate'): number;
    /**
     * Returns true if the text contents of the FilterItem match the search term
     * @param searchTerm to look up
     * @return if the innerText matches the term
     */
    contentsMatchSearch(searchTerm: string): boolean;
    /**
     * Recalculates the dimensions of the element and updates them in the state
     */
    updateDimensions(): void;
    /**
     * Returns all categories of the grid items data-category attribute
     * with a regexp regarding all whitespace.
     * @return {String[]} an array of the categories the item belongs to
     */
    getCategories(): string[];
    /**
     * Returns the value of the sort attribute
     * @param sortAttribute "index", "sortData" or custom user data-attribute by which to sort
     */
    getSortAttribute(sortAttribute: string): string | number;
    /**
     * Helper method for the search method of Filterizr
     * @return {String} innerText of the FilterItem in lowercase
     */
    private getContentsLowercase;
    /**
     * Sets up the events related to the FilterItem instance
     */
    private bindEvents;
    /**
     * Removes all events related to the FilterItem instance
     */
    private unbindEvents;
    /**
     * Calculates and returns the transition css property based on options.
     */
    private getTransitionStyle;
    /**
     * Sets the transition css property as an inline style on the FilterItem.
     *
     * The idea here is that during the very first render items should assume
     * their positions directly.
     *
     * Following renders should actually trigger the transitions, which is why
     * we need to delay setting the transition property.
     *
     * Unfortunately, JavaScript code executes on the same thread as the
     * browser's rendering. Everything that needs to be drawn waits for
     * JavaScript execution to complete. Thus, we need to use a setTimeout
     * here to defer setting the transition style at the first rendering cycle.
     */
    private setTransitionStyle;
}
