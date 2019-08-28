import { SpinnerOptions } from './SpinnerOptions';
import { RawOptionsCallbacks } from './RawOptionsCallbacks';
import { Layout } from '..';
export interface BaseOptions {
    animationDuration?: number;
    callbacks?: RawOptionsCallbacks;
    controlsSelector?: string;
    delay?: number;
    delayMode?: 'alternate' | 'progressive';
    easing?: string;
    filterOutCss?: object;
    filterInCss?: object;
    gridItemsSelector?: string;
    gutterPixels?: number;
    layout?: Layout;
    multifilterLogicalOperator?: 'or' | 'and';
    searchTerm?: string;
    setupControls?: boolean;
    spinner?: SpinnerOptions;
}
