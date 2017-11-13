import computeAutoPlacement from '../utils/computeAutoPlacement';
import getReferenceOffsets from '../utils/getReferenceOffsets';
import getPopperOffsets from '../utils/getPopperOffsets';
import runModifiers from '../utils/runModifiers';

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
export default function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  let data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {},
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(
    this.state,
    this.popper,
    this.reference
  );

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(
    this.options.placement,
    data.offsets.reference,
    this.popper,
    this.reference,
    this.options.modifiers.flip.boundariesElement,
    this.options.modifiers.flip.padding
  );

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(
    this.popper,
    data.offsets.reference,
    data.placement
  );
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
