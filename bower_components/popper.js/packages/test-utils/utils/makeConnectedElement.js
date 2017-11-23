import makeElement from './makeElement';

/**
 * Create an element that's connected to the DOM.
 */
export default function makeConnectedElement() {
  const jasmineWrapper = document.getElementById('jasmineWrapper');
  return jasmineWrapper.appendChild(makeElement());
}
