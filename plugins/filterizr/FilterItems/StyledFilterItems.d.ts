import StyledFilterizrElements from '../StyledFilterizrElements';
import FilterItem from '../FilterItem/FilterItem';
export default class StyledFilterItems extends StyledFilterizrElements {
    private _filterItems;
    constructor(elements: FilterItem[]);
    resetDisplay(): void;
    removeWidth(): void;
    updateWidth(): void;
    updateTransitionStyle(): void;
    disableTransitions(): void;
    enableTransitions(): Promise<void>;
    updateWidthWithTransitionsDisabled(): void;
}
