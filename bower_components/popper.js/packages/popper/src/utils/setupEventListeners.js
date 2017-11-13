import getScrollParent from './getScrollParent';
import getWindow from './getWindow';

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  const isBody = scrollParent.nodeName === 'BODY';
  const target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(
      getScrollParent(target.parentNode),
      event,
      callback,
      scrollParents
    );
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
export default function setupEventListeners(
  reference,
  options,
  state,
  updateBound
) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  const scrollElement = getScrollParent(reference);
  attachToScrollParents(
    scrollElement,
    'scroll',
    state.updateBound,
    state.scrollParents
  );
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}
