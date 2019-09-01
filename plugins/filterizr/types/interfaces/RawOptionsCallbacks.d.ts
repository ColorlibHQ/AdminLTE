export interface RawOptionsCallbacks {
    onInit?: EventListener;
    onFilteringStart?: EventListener;
    onFilteringEnd?: EventListener;
    onShufflingStart?: EventListener;
    onShufflingEnd?: EventListener;
    onSortingStart?: EventListener;
    onSortingEnd?: EventListener;
    onTransitionEnd?: EventListener;
}
