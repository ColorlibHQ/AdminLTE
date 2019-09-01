import { Filter } from '../types';
import { RawOptions, Destructible } from '../types/interfaces';
import FilterizrOptions from '../FilterizrOptions';
import FilterContainer from '../FilterContainer';
import FilterItem from '../FilterItem';
export default class Filterizr implements Destructible {
    /**
     * Main Filterizr classes exported as static members
     */
    static FilterContainer: typeof FilterContainer;
    static FilterItem: typeof FilterItem;
    static defaultOptions: RawOptions;
    /**
     * Static method that receives the jQuery object and extends
     * its prototype with a .filterizr method.
     */
    static installAsJQueryPlugin: Function;
    options: FilterizrOptions;
    private windowEventReceiver;
    private filterContainer;
    private filterControls?;
    private imagesHaveLoaded;
    private spinner?;
    constructor(selectorOrNode?: string | HTMLElement, userOptions?: RawOptions);
    private readonly filterItems;
    /**
     * Filters the items in the grid by a category
     * @param category by which to filter
     */
    filter(category: Filter): void;
    destroy(): void;
    /**
     * Inserts a new FilterItem into the grid
     */
    insertItem(node: HTMLElement): Promise<void>;
    /**
     * Removes a FilterItem from the grid
     */
    removeItem(node: HTMLElement): void;
    /**
     * Sorts the FilterItems in the grid
     * @param sortAttr the attribute by which to perform the sort
     * @param sortOrder ascending or descending
     */
    sort(sortAttr?: string, sortOrder?: 'asc' | 'desc'): void;
    /**
     * Searches through the FilterItems for a given string and adds an additional filter layer.
     */
    search(searchTerm?: string): void;
    /**
     * Shuffles the FilterItems in the grid, making sure their positions have changed.
     */
    shuffle(): void;
    /**
     * Updates the perferences of the users for rendering the Filterizr grid,
     * additionally performs error checking on the new options passed.
     * @param newOptions to override the defaults.
     */
    setOptions(newOptions: RawOptions): void;
    /**
     * Performs multifiltering with AND/OR logic.
     * @param toggledFilter the filter to toggle
     */
    toggleFilter(toggledFilter: string): void;
    private render;
    /**
     * Initialization sequence of Filterizr when the grid is first loaded
     */
    private initialize;
    private bindEvents;
    /**
     * Resolves when the images of the grid have finished loading into the DOM
     */
    private waitForImagesToLoad;
}
