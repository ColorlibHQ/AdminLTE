import { Position } from './FilterItem';
import FilterContainer from './FilterContainer';
/**
 * Calculates and returns an array of objects representing
 * the next positions the FilterItems are supposed to assume.
 * @param layout name of helper method to be used
 * @param filterizr instance
 */
declare const getLayoutPositions: (layout: string, filterContainer: FilterContainer) => Position[];
export default getLayoutPositions;
