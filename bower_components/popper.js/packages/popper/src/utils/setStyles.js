import isNumeric from './isNumeric';

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
export default function setStyles(element, styles) {
  Object.keys(styles).forEach(prop => {
    let unit = '';
    // add unit if the value is numeric and is one of the following
    if (
      ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !==
        -1 &&
      isNumeric(styles[prop])
    ) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}
