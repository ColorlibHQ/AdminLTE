import computeAutoPlacement from './computeAutoPlacement';
import debounce from './debounce';
import findIndex from './findIndex';
import getBordersSize from './getBordersSize';
import getBoundaries from './getBoundaries';
import getBoundingClientRect from './getBoundingClientRect';
import getClientRect from './getClientRect';
import getOffsetParent from './getOffsetParent';
import getOffsetRect from './getOffsetRect';
import getOffsetRectRelativeToArbitraryNode from './getOffsetRectRelativeToArbitraryNode';
import getOuterSizes from './getOuterSizes';
import getParentNode from './getParentNode';
import getPopperOffsets from './getPopperOffsets';
import getReferenceOffsets from './getReferenceOffsets';
import getScroll from './getScroll';
import getScrollParent from './getScrollParent';
import getStyleComputedProperty from './getStyleComputedProperty';
import getSupportedPropertyName from './getSupportedPropertyName';
import getWindowSizes from './getWindowSizes';
import isFixed from './isFixed';
import isFunction from './isFunction';
import isModifierEnabled from './isModifierEnabled';
import isModifierRequired from './isModifierRequired';
import isNumeric from './isNumeric';
import removeEventListeners from './removeEventListeners';
import runModifiers from './runModifiers';
import setAttributes from './setAttributes';
import setStyles from './setStyles';
import setupEventListeners from './setupEventListeners';

/** @namespace Popper.Utils */
export {
  computeAutoPlacement,
  debounce,
  findIndex,
  getBordersSize,
  getBoundaries,
  getBoundingClientRect,
  getClientRect,
  getOffsetParent,
  getOffsetRect,
  getOffsetRectRelativeToArbitraryNode,
  getOuterSizes,
  getParentNode,
  getPopperOffsets,
  getReferenceOffsets,
  getScroll,
  getScrollParent,
  getStyleComputedProperty,
  getSupportedPropertyName,
  getWindowSizes,
  isFixed,
  isFunction,
  isModifierEnabled,
  isModifierRequired,
  isNumeric,
  removeEventListeners,
  runModifiers,
  setAttributes,
  setStyles,
  setupEventListeners,
};

// This is here just for backward compatibility with versions lower than v1.10.3
// you should import the utilities using named exports, if you want them all use:
// ```
// import * as PopperUtils from 'popper-utils';
// ```
// The default export will be removed in the next major version.
export default {
  computeAutoPlacement,
  debounce,
  findIndex,
  getBordersSize,
  getBoundaries,
  getBoundingClientRect,
  getClientRect,
  getOffsetParent,
  getOffsetRect,
  getOffsetRectRelativeToArbitraryNode,
  getOuterSizes,
  getParentNode,
  getPopperOffsets,
  getReferenceOffsets,
  getScroll,
  getScrollParent,
  getStyleComputedProperty,
  getSupportedPropertyName,
  getWindowSizes,
  isFixed,
  isFunction,
  isModifierEnabled,
  isModifierRequired,
  isNumeric,
  removeEventListeners,
  runModifiers,
  setAttributes,
  setStyles,
  setupEventListeners,
};
