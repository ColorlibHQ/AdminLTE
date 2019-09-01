/**
 * Wrapper around document.querySelector, will function as
 * an identity function if an HTML element is passed in
 * @param {HTMLElement|string} nodeOrSelector
 */
export declare const getHTMLElement: (selectorOrNode: string | HTMLElement) => HTMLElement;
