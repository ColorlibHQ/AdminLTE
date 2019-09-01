import { Position } from '../FilterItem';
import FilterContainer from '../FilterContainer';
/**
 * Vertical layout algorithm that arranges all FilterItems in one column. Their height may vary.
 * @param filterizr instance.
 */
declare const getVerticalLayoutPositions: (filterContainer: FilterContainer) => Position[];
export default getVerticalLayoutPositions;
