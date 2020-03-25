import FilterizrOptions from './FilterizrOptions/FilterizrOptions';
import FilterContainer from './FilterContainer';
import FilterItem from './FilterItem';
import { Filter } from './ActiveFilter';
import { RawOptions } from './FilterizrOptions/defaultOptions';
export default class Filterizr {
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
    private browserWindow;
    private filterContainer;
    private filterControls?;
    private filterizrState;
    constructor(selectorOrNode?: string | HTMLElement, userOptions?: RawOptions);
    private readonly filterItems;
    /**
     * Filters the items in the grid by a category
     * @param category by which to filter
     */
    filter(category: Filter): void;
    destroy(): void;
    /**
     * Inserts a new FilterItem in the Filterizr grid
     * @param node DOM node to append
     */
    insertItem(node: HTMLElement): void;
    /**
     * Sorts the FilterItems in the grid
     * @param sortAttr the attribute by which to perform the sort
     * @param sortOrder ascending or descending
     */
    sort(sortAttr?: string, sortOrder?: 'asc' | 'desc'): void;
    /**
     * Searches through the FilterItems for a given string and adds an additional filter layer.
     * @param searchTerm the term for which to search
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
    private onTransitionEndCallback;
    private rebindFilterContainerEvents;
    private bindEvents;
    /**
     * If it contains images it makes use of the imagesloaded npm package
     * to trigger the first render after the images have finished loading
     * in the DOM. Otherwise, overlapping can occur if the images do not
     * have the height attribute explicitly set on them.
     *
     * In case the grid contains no images, then a simple render is performed.
     */
    private renderWithImagesLoaded;
    private updateDimensionsAndRerender;
}
