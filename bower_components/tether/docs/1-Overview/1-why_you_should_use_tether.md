## Why You Should Use Tether

Virtually every app includes some sort of overlay attached to an element on the page.
Things like [tooltips](http://github.hubspot.com/tooltip/docs/welcome),
[dropdowns](http://github.hubspot.com/select/docs/welcome), [hover-activated info boxes](http://github.hubspot.com/drop/docs/welcome), etc.

Those elements need to be attached to something on the page.  Actually placing them next to
the element in the DOM causes problems though, if any parent element is anything
but `overflow: visible`, the element gets cut off.  So you need absolute positioning
in the body.

Some of the time absolute positioning is right, but what about if the thing we're
attached to is fixed to the center of the screen?  We'll have to move it every
time the user scrolls.  What about if the element is in a scrollable container,
if the overlay is inside of it (so no clipping), it would be cool if the code
were smart enough to move it inside when that area is scrolled.  That way we
need to reposition it even less.

It would also be nice if the code could somehow figure out whether positioning it
from the top, bottom, left, or right would result in the fewest repositionings
as the user scrolls or resizes.

Most of the time you're building these elements it would be nice for the element to
flip to the other side of the element if it hits the edge of the screen, or a scrollable
container it might be in.  It would be nice if we could confine the element
to within some area, or even hide it when it leaves.

It would be nice for the element to be repositioned with CSS transforms
rather than top and left when possible, to allow the positioning to be done entirely
in the GPU.

Now that the positioning is so fancy, you're going to use it for more and more
elements.  It would be cool if the library could optimize all of their repositioning
into a single repaint.

All of that is baked into Tether.

### tl;dr

- Optimized GPU-accelerated repositioning for 60fps scrolling
- Reliable positioning on any possible corner, edge or point in between.
- Support for repositioning or pinning the element when it would be offscreen
- Designed to be embeddable in other libraries
