import Filterizr from './Filterizr';
import { Destructible } from './types/interfaces';
export default class FilterControls implements Destructible {
    private filterControls;
    private filterizr;
    private multiFilterControls;
    private searchControls;
    private selector;
    private shuffleControls;
    private sortAscControls;
    private sortDescControls;
    /**
     * @param filterizr keep a ref to the Filterizr object to control actions
     * @param selector selector of controls in case of multiple Filterizr instances
     */
    constructor(filterizr: Filterizr, selector?: string);
    destroy(): void;
    private initialize;
}
