import { Dictionary } from './types/interfaces/Dictionary';
import FilterItem from './FilterItem';
/**
 * A function to check that all elements of an array are found within another array.
 * @param {Array} arr1 is the array of strings to be checked
 * @param {Array} arr2 is the array of strings to check against
 * @return {Boolean} whether all string of arr1 are contained in arr2
 */
declare const allStringsOfArray1InArray2: (arr1: string[], arr2: string[]) => boolean;
export { allStringsOfArray1InArray2 };
/**
 * Given a CSS prop it will normalize the syntax for JS
 * e.g. transform background-color to backgroundColor
 * @param {String} cssProp prop name
 * @return {String} normalized name
 */
declare const getNormalizedCssPropName: (cssProp: string) => string;
export { getNormalizedCssPropName };
/**
 * Set inline styles on an HTML node
 * @param {HTMLElement} node - HTML node
 * @param {Object} styles - object with styles
 * @returns {undefined}
 */
declare function setStylesOnHTMLNode(node: Element, styles: any): void;
export { setStylesOnHTMLNode };
/**
 * Returns an object with value/key pairs of all data
 * attributes on an HTML element, disregarding the
 * two data attributes that are reserved for internal
 * usage by Filterizr
 * @param {Object} node - HTML node
 * @returns {Object} map of data attributes / values
 */
declare function getDataAttributesOfHTMLNode(node: Element): Dictionary;
export { getDataAttributesOfHTMLNode };
/**
 * Check that a DOM element has a data-attribute present
 * @param {Object} node element
 * @param {String} dataAttributeName name of data attribute
 * @return {Boolean} data attribute exists
 */
declare function checkDataAttributeExists(node: Element, dataAttributeName: string): boolean;
export { checkDataAttributeExists };
/**
 * A very simple function to perform a basic
 * deep clone of an object.
 * @param {Object} o is the object to perform the deep clone on
 * @return {Object} deep clone
 */
declare const makeShallowClone: (o: any) => Dictionary;
export { makeShallowClone };
/**
 * A function to recursively merge an object, copying over all
 * properties of the old object missing from the target object.
 * In case a prop in is an object, the method is called recursively.
 * This is a non-mutating method.
 * @param {Object} old is the old object from which the missing props are copied.
 * @param {Object} target is the target object with the updated values.
 */
declare const merge: (old: any, target: any) => Dictionary;
export { merge };
/**
 * A function get the intersection of two arrays. IE9+.
 * @param {Array} arr1 is the first array of which to get the intersection
 * @param {Array} arr2 is the second array of which to get the intersection
 */
declare const intersection: (arr1: any[], arr2: any[]) => any;
export { intersection };
/**
 * Debounce of Underscore.js
 */
declare const debounce: (func: Function, wait: number, immediate: boolean) => Function;
export { debounce };
/**
 * Fisher-Yates shuffle ES6 non-mutating implementation.
 * @param {Array} array the array to shuffle
 * @return {Array} shuffled array without mutating the initial array.
 */
declare const shuffle: (array: any[]) => any[];
export { shuffle };
/**
 * Simple method to check if two arrays of FilterItems
 * are sorted in the same manner or not.
 * @param {Array} arr1 the first array of FilterItems
 * @param {Array} arr2 the second array of FilterItems
 * @return {Boolean} equality
 */
declare const filterItemArraysHaveSameSorting: (filterItemsA: FilterItem[], filterItemsB: FilterItem[]) => boolean;
export { filterItemArraysHaveSameSorting };
/**
 * Simple non-mutating sorting function for arrays of objects by a property
 * @param {Array} array to sort
 * @param {Function} propFn fetches the property by which to sort
 * @return {Array} a new sorted array
 */
declare const sortBy: (array: any[], propFn: Function) => any[];
export { sortBy };
/**
 * Error checking method to restrict a prop to some allowed values
 * @param {String} name of the option key in the options object
 * @param {String|Number|Object|Function|Array|Boolean} value of the option
 * @param {String} type of the property
 * @param {Array} allowed accepted values for option
 * @param {String} furtherHelpLink a link to docs for further help
 */
declare const checkOptionForErrors: (name: string, value: string | number | boolean | object | Function | any[], type?: string, allowed?: RegExp | any[], furtherHelpLink?: string) => void;
export { checkOptionForErrors };
/**
 * Wrapper around document.querySelector, will function as
 * an identity function if an HTML element is passed in
 * @param {HTMLElement|string} nodeOrSelector
 */
declare const getHTMLElement: (selectorOrNode: string | HTMLElement) => HTMLElement;
export { getHTMLElement };
/**
 * A Regexp to validate potential values for the CSS easing property of transitions.
 */
declare const cssEasingValuesRegexp: RegExp;
export { cssEasingValuesRegexp };
/**
 * Possible animation states for Filterizr
 */
declare const FILTERIZR_STATE: {
    IDLE: string;
    FILTERING: string;
    SORTING: string;
    SHUFFLING: string;
};
export { FILTERIZR_STATE };
/**
 * Transition end events with vendor prefixing
 */
declare const TRANSITION_END_EVENTS: string[];
export { TRANSITION_END_EVENTS };
/**
 * A no-operation function
 */
declare const noop: () => void;
export { noop };
