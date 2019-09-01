import { Position } from './../types/interfaces';
import StyledFilterizrElement from '../StyledFilterizrElement';
import FilterizrOptions from '../FilterizrOptions';
export default class StyledFilterItem extends StyledFilterizrElement {
    private _index;
    constructor(node: HTMLElement, index: number, options: FilterizrOptions);
    initialize(): void;
    setFilteredStyles(position: Position, cssOptions: object): void;
    updateTransitionStyle(): void;
    updateWidth(): void;
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
    enableTransitions(): Promise<void>;
    disableTransitions(): void;
    setZIndex(zIndex: number): void;
    removeZIndex(): void;
    removeWidth(): void;
}
