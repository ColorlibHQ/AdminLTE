import placements from '../methods/placements';

// Get rid of `auto` `auto-start` and `auto-end`
const validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
export default function clockwise(placement, counter = false) {
  const index = validPlacements.indexOf(placement);
  const arr = validPlacements
    .slice(index + 1)
    .concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}
