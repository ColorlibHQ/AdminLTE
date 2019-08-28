import { Position } from '../FilterItem';
import FilterContainer from '../FilterContainer';
/**
 * Horizontal layout algorithm that arranges all FilterItems in one row. Their width may vary.
 * @param filterContainer instance.
 */
declare const getHorizontalLayoutPositions: (filterContainer: FilterContainer) => Position[];
export default getHorizontalLayoutPositions;
