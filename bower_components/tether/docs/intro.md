<script src="dist/js/tether.js"></script>
<script src="docs/js/markAttachment.js"></script>
<script src="docs/js/intro.js"></script>
<link rel="stylesheet" href="docs/css/intro.css"></link>

Tether
======

Tether is a JavaScript library for efficiently making an absolutely positioned
element stay next to another element on the page. For example, you might
want a tooltip or dialog to open, and remain, next to the relevant item
on the page.

Tether includes the ability to constrain the element within the viewport, its
scroll parent, any other element on the page, or a fixed bounding box.  When it
exceeds those constraints it can be pinned to the edge, flip to the other
side of its target, or hide itself.

Tether optimizes its location placement to result in the minimum amount of
'jankyness' as the page is scrolled and resized.  The page can maintain 60fps
scrolling even with dozens or hundreds of tethers on screen (pop open the
devtools timeline as you scroll this page).

Tether is 5kb minified and gzipped, and supports IE9+, and all modern
browsers.

<h2 class="projects-header">Projects Built With Tether</h2>
<p class="projects-paragraph">
<a href="http://github.hubspot.com/select/docs/welcome"><span>Select</span><img src="http://github.hubspot.com/os-icons/select-icon.png" /></a>
<a href="http://github.hubspot.com/drop/docs/welcome"><span>Drop</span><img src="http://github.hubspot.com/os-icons/drop-icon.png" /></a>
<a href="http://github.hubspot.com/tooltip/docs/welcome"><span>Tooltip</span><img src="http://github.hubspot.com/os-icons/tooltip-icon.png" /></a>
<a href="http://github.hubspot.com/shepherd/docs/welcome"><span>Shepherd</span><img src="http://github.hubspot.com/os-icons/shepherd-icon.png" /></a>
</p>

Usage
-----

The element to be moved is called the 'element'.
The element in the page it's to be attached to is called the 'target'.

To use Tether, you define a point on the target and a point on the element.
Tether moves the element to keep those two points on top of each other.

That point is called the attachment (we've marked it in the examples with
a red <span class="attachment-mark"></span>).  For example, if you'd like
the element to sit on the left of the target:

<pre class="pre-with-output"><code class="lang-javascript" data-example='usage'>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top right',
  targetAttachment: 'top left'
});
</code></pre><output data-example='usage'></output>

Attachment
----------

You can move the attachment points of both the element and the target.

For example, lets move the element's attachment:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: <mark>'bottom left'</mark>,
  targetAttachment: 'top left'
});
</code></pre><output></output>

We can also change the target's attachment point:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'bottom left',
  targetAttachment: <mark>'bottom right'</mark>
});
</code></pre><output></output>

There are two more attachment points we haven't seen yet, center and middle:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: <mark>'middle center'</mark>,
  targetAttachment: <mark>'middle center'</mark>
});
</code></pre><output></output>

All told, Tether provides six built in attachment positions:

- left
- center
- right
- top
- middle
- bottom

The syntax of the attachment properties is: `"vertical-attachment horizontal-attachment"`.

You must always supply an `attachment`.  If you don't supply a `target-attachment`, it is
assumed to be the mirror image of `attachment`.

### Offset

The six attachment points we provide are not always enough to place the element
exactly where you want it.  To correct this, we provide two more properties,
`offset` and `targetOffset`.

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top right',
  targetAttachment: 'top left',
  <mark>offset: '0 10px'</mark>
});
</code></pre><output></output>

As you can see, we've moved the attachment point of the element 10px to the right.
We can also move the attachment point of the target:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top right',
  targetAttachment: 'top left',
  offset: '0 10px',
  <mark>targetOffset: '20px 0'</mark>
});
</code></pre><output></output>

The offset properties also accept percentages. Percentages in `offset` refer to
the height and width of the element, `targetOffset` the height and width of
the target.

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top right',
  targetAttachment: 'top left',
  targetOffset: <mark>'0 75%'</mark>
});
</code></pre><output></output>

The syntax of the offset properties is `"vertical-offset horizontal-offset"`

Tether offers a couple of special attachments, using the `targetModifier`
option:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: scrollBox,
  attachment: 'middle right',
  targetAttachment: 'middle left',
  targetModifier: 'scroll-handle'
});
</code></pre><output></output>

Set the target to `document.body` to have the element follow the page's scroll bar.

The `targetModifier` `visible` can be used to attach an element to the visible part
of an element:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: document.body,
  attachment: 'middle center',
  targetAttachment: 'middle center',
  <mark>targetModifier: 'visible'</mark>
});
</code></pre><output deactivated></output>

<pre class="pre-with-output"><code class="lang-javascript" data-example="scroll-visible">new Tether({
  element: yellowBox,
  <mark>target: scrollBox</mark>,
  attachment: 'middle center',
  targetAttachment: 'middle center',
  targetModifier: 'visible'
});
</code></pre><output class="no-green scroll-page" data-example="scroll-visible"></output>

Constraints
-----------

If you have tried any of the previous examples, you'll notice that it's pretty
easy to scroll the regions in such a way that the element is hanging out on
its own, with no target in sight.

Constraints allow you to control what happens when the tethered element would
have to fall outside of a defined region to maintain the attachment.

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'middle left',
  targetAttachment: 'middle left',
  <mark>constraints</mark>: [
    {
      to: 'scrollParent',
      pin: true
    }
  ]
});
</code></pre><output></output>

We've created a constraint which will keep the element within its scroll
parent by 'pinning' it to the edges if it tries to escape.  For the sake
of the example, we're also highlighting the pinned edge in red.

Specify an array of sides if you'd only like to pin those edges:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'middle left',
  targetAttachment: 'middle left',
  constraints: [
    {
      to: 'scrollParent',
      pin: <mark>['top']</mark>
    }
  ]
});
</code></pre><output></output>

You might want to allow the element to change its attachment, if doing so
would keep more of it within its assigned region:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  constraints: [
    {
      to: 'scrollParent',
      <mark>attachment: 'together'</mark>
    }
  ]
});
</code></pre><output></output>

If you scroll the example a bit, you'll see it flip the attachment when necessary.
You can combine `pin` and `attachment` as well:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  constraints: [
    {
      to: 'scrollParent',
      attachment: 'together',
      <mark>pin: true</mark>
    }
  ]
});
</code></pre><output></output>

Attachment will accept any of these values:

- `element`: Only change the element's attachment
- `target`: Only change the target's attachment
- `both`: Change either's attachment (or both), as needed
- `together`: Change both the element's and target's attachment at the same time (to
'flip' the element to the other side of the attachment)
- `none`: Don't allow changes to attachment (the default)

Together is the option you will use most commonly:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top right',
  targetAttachment: 'bottom left',
  constraints: [
    {
      to: 'scrollParent',
      attachment: <mark>'together'</mark>
    }
  ]
});
</code></pre><output></output>

You can also provide different settings for the vertical and horizontal attachments:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  constraints: [
    {
      to: 'scrollParent',
      attachment: <mark>'together none'</mark>
    }
  ]
});
</code></pre><output></output>

Whenever the element is out of the constrained area, we add the `tether-out-of-bounds`
class to it.  If you add some CSS to make items with that class `display: none`, the
tether will hide.

<pre class="pre-with-output"><code class="lang-javascript" data-example="hide">new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'middle center',
  targetAttachment: 'middle center',
  constraints: [
    {
      to: 'scrollParent'
    }
  ]
});
</code></pre><output data-example="hide"></output>

You can also constrain the element to the viewport, you'll have to scroll the
page to see this one.

<pre class="pre-with-output"><code class="lang-javascript" data-example="window">new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  constraints: [
    {
      to: <mark>'window'</mark>,
      attachment: 'together'
    }
  ]
});
</code></pre><output data-example="window" class="scroll-page"></output>

You can, of course, use pin with the window as well to
make it always visible no matter where the user scrolls:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  constraints: [
    {
      to: 'window',
      attachment: 'together',
      <mark>pin: true</mark>
    }
  ]
});
</code></pre><output deactivated class="scroll-page visible-enabled"></output>

`to` can be any of:

- `'scrollParent'`
- `'window'`
- any DOM element
- an array of bound points relative to the body `[X1, Y1, X2, Y2]`

You can also provide multiple constraints, keeping in mind that they are
processed in the order supplied (the last one always has the final word).

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  constraints: [
    {
      to: <mark>'scrollParent'</mark>,
      pin: true
    },
    {
      to: <mark>'window'</mark>,
      attachment: 'together'
    }
  ]
});
</code></pre><output></output>

Optimization
------------

### Element Moving

The goal of Tether's optimizer is to not have to change the positioning
CSS as the page is scrolled or resized.  To accomplish this it looks at the
last few positions, finds commonalities, and uses them to decide whether to
position the element absolutely or with fixed positioning.

If the element is fully contained within its scroll parent, its DOM node
can also be moved inside the scroll parent, to avoid repaints as the
container is scrolled.

<pre class="pre-with-output"><code class="lang-javascript" data-example="optimizer">new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  targetAttachment: 'bottom left'
});
</code></pre><output data-example="optimizer"></output>

We are moving where the DOM node is, so if you have CSS which styles elements
within the offset parent, you may see some rendering changes.  Also note
that this optimization works best if the scroll parent is the offset parent.
In other words, **the scroll parent should be made position relative, fixed or
absolute to enable this optimization.**

If you do see stylistic changes occur when the element is moved,
you might want to disable this optimization.  You can do that by
setting `optimizations.moveElement` to false.

<pre class="pre-with-output"><code class="lang-javascript" data-example="optimizer2">new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  optimizations: {
    <mark>moveElement: false</mark>
  }
});
</code></pre><output data-example="optimizer2"></output>

### GPU

By default tether positions elements using CSS transforms.  These transforms allow the
tethered element to be moved as its own layer to not force a repaint of the underlying
page.

This method of positioning can cause some issues however, including color shifts and artifacts.

If you experience these issues, you can disable this optimization by setting `optimizations.gpu`
to false:

<pre class="pre-with-output"><code class="lang-javascript" data-example>new Tether({
  element: yellowBox,
  target: greenBox,
  attachment: 'top left',
  optimizations: {
    <mark>gpu: false</mark>
  }
});
</code></pre><output></output>

Methods
-------

The `Tether` constructor we've been using in these examples returns us a
`Tether` object.

The `Tether` object has these methods:

- `setOptions({ options })` - Update any of the options (such as attachment)
- `disable()` - Disable the tethering
- `enable()` - Enable the tethering
- `destroy()` - Disable and remove all references
- `position()` - Manually trigger a repositioning

Options
-------

The full list of options which can be passed to the `Tether` constructor and
`setOptions`:

- `element`: The DOM element, jQuery element, or a selector string of an element which will be moved
- `target`: The DOM element, jQuery element, or a selector string of an element which the `element` will be attached to
- `attachment`: A string of the form `'vert-attachment horiz-attachment'`
  - `vert-attachment` can be any of `'top'`, `'middle'`, `'bottom'`
  - `horiz-attachment` can be any of `'left'`, `'center'`, `'right'`
- `targetAttachment`: A string similar to `attachment`.
  The one difference is that, if it's not provided, targetAttachment will assume the mirror
  image of `attachment`.
- `offset`: A string of the form `'vert-offset horiz-offset'`
  - `vert-offset` and `horiz-offset` can be of the form `"20px"` or `"55%"`
- `targetOffset`: A string similar to `offset`, but refering to the offset of the target
- `targetModifier`: Can be set to `'visible'` or `'scroll-handle'`
- `enabled`: Should the tether be enabled initially? Defaults to `true`.
- `classes`: A hash of classes which should be changed or disabled
- `classPrefix`: The prefix placed at the beginning of the default classes, defaults to `'tether'`
- `optimizations`: A hash of optimizations, used to disable them
- `constraints`: An array of constraint definition objects.  Each definition is of the form:
  - `to`: A DOM element, bounding box, the string `'window'`, or the string `'scrollParent'`
  - `pin`: `true` or an array of strings representing the sides of the constraint
  - `attachment`: A string of the form `"vert-modifier horiz-modifier"`, or a single value
  representing both
    - Each modifier should be one of `"none"`, `"together"`, `"element"`, `"target"`, or `"both"`.
  - `outOfBoundsClass`: An alternative to `"tether-out-of-bounds"`, useful if the class
  needs to be differentiated from that of another constraint.
  - `pinnedClass`: An alternative to `"tether-pinned"`, similar to `outOfBoundsClass`.

Classes
-------

Tether adds a variety of classes to the element and target to allow you to style
them based on their tethering.

You can change the prefix of the classes with the `classPrefix` option.  It is `'tether'` by
default, but you could, for example, change it to be `'bill'` if you were building the bill
library and all the classes would be `'bill-*'`.

```javascript
new Tether({
  classPrefix: 'bill'
});
```

The sass/css is similarily configurable, see
[tooltip](https://github.com/HubSpot/tooltip/blob/master/sass/tooltip-theme-arrows.sass#L14) for
an example of how to make your own prefixed css file.

All classes can be changed or disabled with the `classes` option.  For example, to change the
`tether-element` class to be `my-box`:

```javascript
new Tether({
  classes: {
    element: 'my-box'
  }
});
```

You can also disable classes you're not going to use:

```javascript
new Tether({
  classes: {
    out-of-bounds: false
  }
});
```

- `tether-element` is added to the element
- `tether-target` is added to the target
- `tether-enabled` is added to both elements when tether is not disabled
- `tether-element-attached-[left,right,top,bottom,middle,center]` is added to both
elements based on the elements attachment, if the element becomes detached (for
example, if it's pinned), that class is removed.  The class reflects how the
element is actually attached, so if a constraint changes the attachment, that
change will be reflected in the class.
- `tether-target-attached-[left,right,top,bottom,middle,center]` is added to both
elements based on the target's attachment.  All of the characteristics are the
same as for element-attached.

### Constraint-related Classes

- `tether-out-of-bounds`, `tether-out-of-bounds-[side]` are added to both the element and the target
when the element is placed outside of its constraint.
- `tether-pinned`, `tether-pinned-[side]` are added to both the element and target when a constraint
has pinned the element to the [side] of the container.

Browser Support
---------------

Tether supports IE9+, and all modern browsers.

Google doesn't support IE8, Microsoft is dropping support in a few months, and not supporting it saves
us a whole lot of trouble.  If you are interested in adding support, get in touch, we're happy to accept
a PR.

Contributing
------------

Please contribute! Tether is developed in Coffeescript, but if that's problematic for you, feel free
to submit pull requests which just change the JavaScript files, we can adapt them as needed.

To build Tether, you need:

- Node.js

#### Instructions

- Install the build tool

```bash
npm install -g gulp
```

- Install the project

```bash
# In the project directory
npm install
```

- Build / Watch

```bash
gulp
```
