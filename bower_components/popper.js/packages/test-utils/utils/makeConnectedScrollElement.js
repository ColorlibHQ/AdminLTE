import makeConnectedElement from './makeConnectedElement';

/**
 * Create a scrollable element that's connected to the DOM.
 */
export default function makeConnectedScrollElement() {
  const elem = makeConnectedElement();
  elem.style.overflow = 'scroll';
  return elem;
}
