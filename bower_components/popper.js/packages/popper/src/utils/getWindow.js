/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
export default function getWindow(element) {
  const ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}
