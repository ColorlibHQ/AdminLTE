Extending Tether
-----

Tether has a module system which can be used to modify Tether's positioning, or just do something each time the Tether is moved.

Tether has an array called `Tether.modules`, push onto it to add a module:

```coffeescript
Tether.modules.push
  position: ({top, left}) ->
    top += 10

    {top, left}
```

#### Position

Your position function can either return a new object with `top` and `left`, `null`/`undefined` to leave the coordinates unchanged, or
`false` to cancel the positioning.

The position function is passed an object with the following elements:

```javascript
{
  left, // The element's new position, from the top left corner of the page
  top,
  targetAttachment, // The targetAttachment, with 'auto' resolved to an actual attachment
  targetPos, // The coordinates of the target
  attachment, // The attachment, as passed in the option
  elementPos, // The coordinates of the element
  offset, // The offset, after it's converted into pixels and the manual offset is added
  targetOffset, // The attachment is converted into an offset and is included in these values
  manualOffset, // The manual offset, in pixels
  manualTargetOffset
}
```

It is called with the Tether instance as its context (`this`).

#### Initialize

Modules can also have an `initialize` function which will be called when a new tether is created.  The initialize function
is also called with the Tether instance as its context.

```coffeescript
Tether.modules.push
  initialize: ->
    console.log "New Tether Created!", @
```

#### Examples

[Constraints](https://github.com/HubSpot/tether/blob/master/src/js/constraint.js) and [shift](https://github.com/HubSpot/tether/blob/master/src/js/shift.js) are both implemented as modules.
[Mark Attachment](https://github.com/HubSpot/tether/blob/master/src/js/markAttachment.js) is used by the docs.
