## Classes

<dl>
<dt><a href="#Popper">Popper</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#dataObject">dataObject</a></dt>
<dd><p>The <code>dataObject</code> is an object containing all the informations used by Popper.js
this object get passed to modifiers and to the <code>onCreate</code> and <code>onUpdate</code> callbacks.</p>
</dd>
<dt><a href="#referenceObject">referenceObject</a></dt>
<dd><p>The <code>referenceObject</code> is an object that provides an interface compatible with Popper.js
and lets you use it as replacement of a real DOM node.<br />
You can use this method to position a popper relatively to a set of coordinates
in case you don&#39;t have a DOM node to use as reference.</p>
<pre><code>new Popper(referenceObject, popperNode);
</code></pre><p>NB: This feature isn&#39;t supported in Internet Explorer 10</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#modifiers">modifiers</a> : <code>object</code></dt>
<dd><p>Modifiers are plugins used to alter the behavior of your poppers.<br />
Popper.js uses a set of 9 modifiers to provide all the basic functionalities
needed by the library.</p>
<p>Usually you don&#39;t want to override the <code>order</code>, <code>fn</code> and <code>onLoad</code> props.
All the other properties are configurations that could be tweaked.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#ModifierFn">ModifierFn(data, options)</a> ⇒ <code><a href="#dataObject">dataObject</a></code></dt>
<dd><p>Modifier function, each modifier can have a function of this type assigned
to its <code>fn</code> property.<br />
These functions will be called on each update, this means that you must
make sure they are performant enough to avoid performance bottlenecks.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#onUpdate">onUpdate</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#onCreate">onCreate</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="Popper"></a>

## Popper
**Kind**: global class  

* [Popper](#Popper)
    * [new Popper(reference, popper, options)](#new_Popper_new)
    * [.Defaults](#Popper.Defaults) : <code>Object</code>
        * [.placement](#Popper.Defaults.placement)
        * [.eventsEnabled](#Popper.Defaults.eventsEnabled)
        * [.removeOnDestroy](#Popper.Defaults.removeOnDestroy)
        * [.modifiers](#Popper.Defaults.modifiers)
        * [.onCreate()](#Popper.Defaults.onCreate)
        * [.onUpdate()](#Popper.Defaults.onUpdate)
    * [.placements](#Popper.placements) : <code>enum</code>
    * [.update()](#Popper.update)
    * [.destroy()](#Popper.destroy)
    * [.enableEventListeners()](#Popper.enableEventListeners)
    * [.disableEventListeners()](#Popper.disableEventListeners)
    * [.scheduleUpdate()](#Popper.scheduleUpdate)

<a name="new_Popper_new"></a>

### new Popper(reference, popper, options)
Create a new Popper.js instance

**Returns**: <code>Object</code> - instance - The generated Popper.js instance  

| Param | Type | Description |
| --- | --- | --- |
| reference | <code>HTMLElement</code> \| [<code>referenceObject</code>](#referenceObject) | The reference element used to position the popper |
| popper | <code>HTMLElement</code> | The HTML element used as popper. |
| options | <code>Object</code> | Your custom options to override the ones defined in [Defaults](#defaults) |

<a name="Popper.Defaults"></a>

### Popper.Defaults : <code>Object</code>
Default options provided to Popper.js constructor.<br />
These can be overriden using the `options` argument of Popper.js.<br />
To override an option, simply pass as 3rd argument an object with the same
structure of this object, example:
```
new Popper(ref, pop, {
  modifiers: {
    preventOverflow: { enabled: false }
  }
})
```

**Kind**: static property of [<code>Popper</code>](#Popper)  

* [.Defaults](#Popper.Defaults) : <code>Object</code>
    * [.placement](#Popper.Defaults.placement)
    * [.eventsEnabled](#Popper.Defaults.eventsEnabled)
    * [.removeOnDestroy](#Popper.Defaults.removeOnDestroy)
    * [.modifiers](#Popper.Defaults.modifiers)
    * [.onCreate()](#Popper.Defaults.onCreate)
    * [.onUpdate()](#Popper.Defaults.onUpdate)

<a name="Popper.Defaults.placement"></a>

#### Defaults.placement
Popper's placement

**Kind**: static property of [<code>Defaults</code>](#Popper.Defaults)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| placement | [<code>placements</code>](#Popper.placements) | <code>&#x27;bottom&#x27;</code> | 

<a name="Popper.Defaults.eventsEnabled"></a>

#### Defaults.eventsEnabled
Whether events (resize, scroll) are initially enabled

**Kind**: static property of [<code>Defaults</code>](#Popper.Defaults)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| eventsEnabled | <code>Boolean</code> | <code>true</code> | 

<a name="Popper.Defaults.removeOnDestroy"></a>

#### Defaults.removeOnDestroy
Set to true if you want to automatically remove the popper when
you call the `destroy` method.

**Kind**: static property of [<code>Defaults</code>](#Popper.Defaults)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| removeOnDestroy | <code>Boolean</code> | <code>false</code> | 

<a name="Popper.Defaults.modifiers"></a>

#### Defaults.modifiers
List of modifiers used to modify the offsets before they are applied to the popper.
They provide most of the functionalities of Popper.js

**Kind**: static property of [<code>Defaults</code>](#Popper.Defaults)  
**Properties**

| Type |
| --- |
| [<code>modifiers</code>](#modifiers) | 

<a name="Popper.Defaults.onCreate"></a>

#### Defaults.onCreate()
Callback called when the popper is created.<br />
By default, is set to no-op.<br />
Access Popper.js instance with `data.instance`.

**Kind**: static method of [<code>Defaults</code>](#Popper.Defaults)  
**Properties**

| Type |
| --- |
| [<code>onCreate</code>](#onCreate) | 

<a name="Popper.Defaults.onUpdate"></a>

#### Defaults.onUpdate()
Callback called when the popper is updated, this callback is not called
on the initialization/creation of the popper, but only on subsequent
updates.<br />
By default, is set to no-op.<br />
Access Popper.js instance with `data.instance`.

**Kind**: static method of [<code>Defaults</code>](#Popper.Defaults)  
**Properties**

| Type |
| --- |
| [<code>onUpdate</code>](#onUpdate) | 

<a name="Popper.placements"></a>

### Popper.placements : <code>enum</code>
List of accepted placements to use as values of the `placement` option.<br />
Valid placements are:
- `auto`
- `top`
- `right`
- `bottom`
- `left`

Each placement can have a variation from this list:
- `-start`
- `-end`

Variations are interpreted easily if you think of them as the left to right
written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
is right.<br />
Vertically (`left` and `right`), `start` is top and `end` is bottom.

Some valid examples are:
- `top-end` (on top of reference, right aligned)
- `right-start` (on right of reference, top aligned)
- `bottom` (on bottom, centered)
- `auto-right` (on the side with more space available, alignment depends by placement)

**Kind**: static enum of [<code>Popper</code>](#Popper)  
**Read only**: true  
<a name="Popper.update"></a>

### Popper.update()
Updates the position of the popper, computing the new offsets and applying
the new style.<br />
Prefer `scheduleUpdate` over `update` because of performance reasons.

**Kind**: static method of [<code>Popper</code>](#Popper)  
<a name="Popper.destroy"></a>

### Popper.destroy()
Destroy the popper

**Kind**: static method of [<code>Popper</code>](#Popper)  
<a name="Popper.enableEventListeners"></a>

### Popper.enableEventListeners()
It will add resize/scroll events and start recalculating
position of the popper element when they are triggered.

**Kind**: static method of [<code>Popper</code>](#Popper)  
<a name="Popper.disableEventListeners"></a>

### Popper.disableEventListeners()
It will remove resize/scroll events and won't recalculate popper position
when they are triggered. It also won't trigger onUpdate callback anymore,
unless you call `update` method manually.

**Kind**: static method of [<code>Popper</code>](#Popper)  
<a name="Popper.scheduleUpdate"></a>

### Popper.scheduleUpdate()
Schedule an update, it will run on the next UI update available

**Kind**: static method of [<code>Popper</code>](#Popper)  
<a name="dataObject"></a>

## dataObject
The `dataObject` is an object containing all the informations used by Popper.js
this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.

**Kind**: global variable  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data.instance | <code>Object</code> | The Popper.js instance |
| data.placement | <code>String</code> | Placement applied to popper |
| data.originalPlacement | <code>String</code> | Placement originally defined on init |
| data.flipped | <code>Boolean</code> | True if popper has been flipped by flip modifier |
| data.hide | <code>Boolean</code> | True if the reference element is out of boundaries, useful to know when to hide the popper. |
| data.arrowElement | <code>HTMLElement</code> | Node used as arrow by arrow modifier |
| data.styles | <code>Object</code> | Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`) |
| data.arrowStyles | <code>Object</code> | Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`) |
| data.boundaries | <code>Object</code> | Offsets of the popper boundaries |
| data.offsets | <code>Object</code> | The measurements of popper, reference and arrow elements. |
| data.offsets.popper | <code>Object</code> | `top`, `left`, `width`, `height` values |
| data.offsets.reference | <code>Object</code> | `top`, `left`, `width`, `height` values |
| data.offsets.arrow | <code>Object</code> | `top` and `left` offsets, only one of them will be different from 0 |

<a name="referenceObject"></a>

## referenceObject
The `referenceObject` is an object that provides an interface compatible with Popper.js
and lets you use it as replacement of a real DOM node.<br />
You can use this method to position a popper relatively to a set of coordinates
in case you don't have a DOM node to use as reference.

```
new Popper(referenceObject, popperNode);
```

NB: This feature isn't supported in Internet Explorer 10

**Kind**: global variable  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data.getBoundingClientRect | <code>function</code> | A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method. |
| data.clientWidth | <code>number</code> | An ES6 getter that will return the width of the virtual reference element. |
| data.clientHeight | <code>number</code> | An ES6 getter that will return the height of the virtual reference element. |

<a name="modifiers"></a>

## modifiers : <code>object</code>
Modifiers are plugins used to alter the behavior of your poppers.<br />
Popper.js uses a set of 9 modifiers to provide all the basic functionalities
needed by the library.

Usually you don't want to override the `order`, `fn` and `onLoad` props.
All the other properties are configurations that could be tweaked.

**Kind**: global namespace  

* [modifiers](#modifiers) : <code>object</code>
    * [~shift](#modifiers..shift)
        * [.order](#modifiers..shift.order)
        * [.enabled](#modifiers..shift.enabled)
        * [.fn](#modifiers..shift.fn)
    * [~offset](#modifiers..offset)
        * [.order](#modifiers..offset.order)
        * [.enabled](#modifiers..offset.enabled)
        * [.fn](#modifiers..offset.fn)
        * [.offset](#modifiers..offset.offset)
    * [~preventOverflow](#modifiers..preventOverflow)
        * [.order](#modifiers..preventOverflow.order)
        * [.enabled](#modifiers..preventOverflow.enabled)
        * [.fn](#modifiers..preventOverflow.fn)
        * [.priority](#modifiers..preventOverflow.priority)
        * [.padding](#modifiers..preventOverflow.padding)
        * [.boundariesElement](#modifiers..preventOverflow.boundariesElement)
    * [~keepTogether](#modifiers..keepTogether)
        * [.order](#modifiers..keepTogether.order)
        * [.enabled](#modifiers..keepTogether.enabled)
        * [.fn](#modifiers..keepTogether.fn)
    * [~arrow](#modifiers..arrow)
        * [.order](#modifiers..arrow.order)
        * [.enabled](#modifiers..arrow.enabled)
        * [.fn](#modifiers..arrow.fn)
        * [.element](#modifiers..arrow.element)
    * [~flip](#modifiers..flip)
        * [.order](#modifiers..flip.order)
        * [.enabled](#modifiers..flip.enabled)
        * [.fn](#modifiers..flip.fn)
        * [.behavior](#modifiers..flip.behavior)
        * [.padding](#modifiers..flip.padding)
        * [.boundariesElement](#modifiers..flip.boundariesElement)
    * [~inner](#modifiers..inner)
        * [.order](#modifiers..inner.order)
        * [.enabled](#modifiers..inner.enabled)
        * [.fn](#modifiers..inner.fn)
    * [~hide](#modifiers..hide)
        * [.order](#modifiers..hide.order)
        * [.enabled](#modifiers..hide.enabled)
        * [.fn](#modifiers..hide.fn)
    * [~computeStyle](#modifiers..computeStyle)
        * [.order](#modifiers..computeStyle.order)
        * [.enabled](#modifiers..computeStyle.enabled)
        * [.fn](#modifiers..computeStyle.fn)
        * [.gpuAcceleration](#modifiers..computeStyle.gpuAcceleration)
        * [.x](#modifiers..computeStyle.x)
        * [.y](#modifiers..computeStyle.y)
    * [~applyStyle](#modifiers..applyStyle)
        * [.order](#modifiers..applyStyle.order)
        * [.enabled](#modifiers..applyStyle.enabled)
        * [.fn](#modifiers..applyStyle.fn)
        * [.onLoad](#modifiers..applyStyle.onLoad)
        * ~~[.gpuAcceleration](#modifiers..applyStyle.gpuAcceleration)~~

<a name="modifiers..shift"></a>

### modifiers~shift
Modifier used to shift the popper on the start or end of its reference
element.<br />
It will read the variation of the `placement` property.<br />
It can be one either `-end` or `-start`.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~shift](#modifiers..shift)
    * [.order](#modifiers..shift.order)
    * [.enabled](#modifiers..shift.enabled)
    * [.fn](#modifiers..shift.fn)

<a name="modifiers..shift.order"></a>

#### shift.order
**Kind**: static property of [<code>shift</code>](#modifiers..shift)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>100</code> | Index used to define the order of execution |

<a name="modifiers..shift.enabled"></a>

#### shift.enabled
**Kind**: static property of [<code>shift</code>](#modifiers..shift)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..shift.fn"></a>

#### shift.fn
**Kind**: static property of [<code>shift</code>](#modifiers..shift)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..offset"></a>

### modifiers~offset
The `offset` modifier can shift your popper on both its axis.

It accepts the following units:
- `px` or unitless, interpreted as pixels
- `%` or `%r`, percentage relative to the length of the reference element
- `%p`, percentage relative to the length of the popper element
- `vw`, CSS viewport width unit
- `vh`, CSS viewport height unit

For length is intended the main axis relative to the placement of the popper.<br />
This means that if the placement is `top` or `bottom`, the length will be the
`width`. In case of `left` or `right`, it will be the height.

You can provide a single value (as `Number` or `String`), or a pair of values
as `String` divided by a comma or one (or more) white spaces.<br />
The latter is a deprecated method because it leads to confusion and will be
removed in v2.<br />
Additionally, it accepts additions and subtractions between different units.
Note that multiplications and divisions aren't supported.

Valid examples are:
```
10
'10%'
'10, 10'
'10%, 10'
'10 + 10%'
'10 - 5vh + 3%'
'-10px + 5vh, 5px - 6%'
```
> **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
> with their reference element, unfortunately, you will have to disable the `flip` modifier.
> More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~offset](#modifiers..offset)
    * [.order](#modifiers..offset.order)
    * [.enabled](#modifiers..offset.enabled)
    * [.fn](#modifiers..offset.fn)
    * [.offset](#modifiers..offset.offset)

<a name="modifiers..offset.order"></a>

#### offset.order
**Kind**: static property of [<code>offset</code>](#modifiers..offset)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>200</code> | Index used to define the order of execution |

<a name="modifiers..offset.enabled"></a>

#### offset.enabled
**Kind**: static property of [<code>offset</code>](#modifiers..offset)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..offset.fn"></a>

#### offset.fn
**Kind**: static property of [<code>offset</code>](#modifiers..offset)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..offset.offset"></a>

#### offset.offset
**Kind**: static property of [<code>offset</code>](#modifiers..offset)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| offset | <code>Number</code> \| <code>String</code> | <code>0</code> | The offset value as described in the modifier description |

<a name="modifiers..preventOverflow"></a>

### modifiers~preventOverflow
Modifier used to prevent the popper from being positioned outside the boundary.

An scenario exists where the reference itself is not within the boundaries.<br />
We can say it has "escaped the boundaries" — or just "escaped".<br />
In this case we need to decide whether the popper should either:

- detach from the reference and remain "trapped" in the boundaries, or
- if it should ignore the boundary and "escape with its reference"

When `escapeWithReference` is set to`true` and reference is completely
outside its boundaries, the popper will overflow (or completely leave)
the boundaries in order to remain attached to the edge of the reference.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~preventOverflow](#modifiers..preventOverflow)
    * [.order](#modifiers..preventOverflow.order)
    * [.enabled](#modifiers..preventOverflow.enabled)
    * [.fn](#modifiers..preventOverflow.fn)
    * [.priority](#modifiers..preventOverflow.priority)
    * [.padding](#modifiers..preventOverflow.padding)
    * [.boundariesElement](#modifiers..preventOverflow.boundariesElement)

<a name="modifiers..preventOverflow.order"></a>

#### preventOverflow.order
**Kind**: static property of [<code>preventOverflow</code>](#modifiers..preventOverflow)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>300</code> | Index used to define the order of execution |

<a name="modifiers..preventOverflow.enabled"></a>

#### preventOverflow.enabled
**Kind**: static property of [<code>preventOverflow</code>](#modifiers..preventOverflow)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..preventOverflow.fn"></a>

#### preventOverflow.fn
**Kind**: static property of [<code>preventOverflow</code>](#modifiers..preventOverflow)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..preventOverflow.priority"></a>

#### preventOverflow.priority
**Kind**: static property of [<code>preventOverflow</code>](#modifiers..preventOverflow)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| priority | <code>Array</code> | <code>[&#x27;left&#x27;,&#x27;right&#x27;,&#x27;top&#x27;,&#x27;bottom&#x27;]</code> | Popper will try to prevent overflow following these priorities by default, then, it could overflow on the left and on top of the `boundariesElement` |

<a name="modifiers..preventOverflow.padding"></a>

#### preventOverflow.padding
**Kind**: static property of [<code>preventOverflow</code>](#modifiers..preventOverflow)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| padding | <code>number</code> | <code>5</code> | Amount of pixel used to define a minimum distance between the boundaries and the popper this makes sure the popper has always a little padding between the edges of its container |

<a name="modifiers..preventOverflow.boundariesElement"></a>

#### preventOverflow.boundariesElement
**Kind**: static property of [<code>preventOverflow</code>](#modifiers..preventOverflow)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| boundariesElement | <code>String</code> \| <code>HTMLElement</code> | <code>&#x27;scrollParent&#x27;</code> | Boundaries used by the modifier, can be `scrollParent`, `window`, `viewport` or any DOM element. |

<a name="modifiers..keepTogether"></a>

### modifiers~keepTogether
Modifier used to make sure the reference and its popper stay near eachothers
without leaving any gap between the two. Expecially useful when the arrow is
enabled and you want to assure it to point to its reference element.
It cares only about the first axis, you can still have poppers with margin
between the popper and its reference element.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~keepTogether](#modifiers..keepTogether)
    * [.order](#modifiers..keepTogether.order)
    * [.enabled](#modifiers..keepTogether.enabled)
    * [.fn](#modifiers..keepTogether.fn)

<a name="modifiers..keepTogether.order"></a>

#### keepTogether.order
**Kind**: static property of [<code>keepTogether</code>](#modifiers..keepTogether)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>400</code> | Index used to define the order of execution |

<a name="modifiers..keepTogether.enabled"></a>

#### keepTogether.enabled
**Kind**: static property of [<code>keepTogether</code>](#modifiers..keepTogether)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..keepTogether.fn"></a>

#### keepTogether.fn
**Kind**: static property of [<code>keepTogether</code>](#modifiers..keepTogether)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..arrow"></a>

### modifiers~arrow
This modifier is used to move the `arrowElement` of the popper to make
sure it is positioned between the reference element and its popper element.
It will read the outer size of the `arrowElement` node to detect how many
pixels of conjuction are needed.

It has no effect if no `arrowElement` is provided.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~arrow](#modifiers..arrow)
    * [.order](#modifiers..arrow.order)
    * [.enabled](#modifiers..arrow.enabled)
    * [.fn](#modifiers..arrow.fn)
    * [.element](#modifiers..arrow.element)

<a name="modifiers..arrow.order"></a>

#### arrow.order
**Kind**: static property of [<code>arrow</code>](#modifiers..arrow)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>500</code> | Index used to define the order of execution |

<a name="modifiers..arrow.enabled"></a>

#### arrow.enabled
**Kind**: static property of [<code>arrow</code>](#modifiers..arrow)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..arrow.fn"></a>

#### arrow.fn
**Kind**: static property of [<code>arrow</code>](#modifiers..arrow)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..arrow.element"></a>

#### arrow.element
**Kind**: static property of [<code>arrow</code>](#modifiers..arrow)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>String</code> \| <code>HTMLElement</code> | <code>&#x27;[x-arrow]&#x27;</code> | Selector or node used as arrow |

<a name="modifiers..flip"></a>

### modifiers~flip
Modifier used to flip the popper's placement when it starts to overlap its
reference element.

Requires the `preventOverflow` modifier before it in order to work.

**NOTE:** this modifier will interrupt the current update cycle and will
restart it if it detects the need to flip the placement.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~flip](#modifiers..flip)
    * [.order](#modifiers..flip.order)
    * [.enabled](#modifiers..flip.enabled)
    * [.fn](#modifiers..flip.fn)
    * [.behavior](#modifiers..flip.behavior)
    * [.padding](#modifiers..flip.padding)
    * [.boundariesElement](#modifiers..flip.boundariesElement)

<a name="modifiers..flip.order"></a>

#### flip.order
**Kind**: static property of [<code>flip</code>](#modifiers..flip)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>600</code> | Index used to define the order of execution |

<a name="modifiers..flip.enabled"></a>

#### flip.enabled
**Kind**: static property of [<code>flip</code>](#modifiers..flip)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..flip.fn"></a>

#### flip.fn
**Kind**: static property of [<code>flip</code>](#modifiers..flip)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..flip.behavior"></a>

#### flip.behavior
**Kind**: static property of [<code>flip</code>](#modifiers..flip)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| behavior | <code>String</code> \| <code>Array</code> | <code>&#x27;flip&#x27;</code> | The behavior used to change the popper's placement. It can be one of `flip`, `clockwise`, `counterclockwise` or an array with a list of valid placements (with optional variations). |

<a name="modifiers..flip.padding"></a>

#### flip.padding
**Kind**: static property of [<code>flip</code>](#modifiers..flip)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| padding | <code>number</code> | <code>5</code> | The popper will flip if it hits the edges of the `boundariesElement` |

<a name="modifiers..flip.boundariesElement"></a>

#### flip.boundariesElement
**Kind**: static property of [<code>flip</code>](#modifiers..flip)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| boundariesElement | <code>String</code> \| <code>HTMLElement</code> | <code>&#x27;viewport&#x27;</code> | The element which will define the boundaries of the popper position, the popper will never be placed outside of the defined boundaries (except if keepTogether is enabled) |

<a name="modifiers..inner"></a>

### modifiers~inner
Modifier used to make the popper flow toward the inner of the reference element.
By default, when this modifier is disabled, the popper will be placed outside
the reference element.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~inner](#modifiers..inner)
    * [.order](#modifiers..inner.order)
    * [.enabled](#modifiers..inner.enabled)
    * [.fn](#modifiers..inner.fn)

<a name="modifiers..inner.order"></a>

#### inner.order
**Kind**: static property of [<code>inner</code>](#modifiers..inner)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>700</code> | Index used to define the order of execution |

<a name="modifiers..inner.enabled"></a>

#### inner.enabled
**Kind**: static property of [<code>inner</code>](#modifiers..inner)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>false</code> | Whether the modifier is enabled or not |

<a name="modifiers..inner.fn"></a>

#### inner.fn
**Kind**: static property of [<code>inner</code>](#modifiers..inner)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..hide"></a>

### modifiers~hide
Modifier used to hide the popper when its reference element is outside of the
popper boundaries. It will set a `x-out-of-boundaries` attribute which can
be used to hide with a CSS selector the popper when its reference is
out of boundaries.

Requires the `preventOverflow` modifier before it in order to work.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~hide](#modifiers..hide)
    * [.order](#modifiers..hide.order)
    * [.enabled](#modifiers..hide.enabled)
    * [.fn](#modifiers..hide.fn)

<a name="modifiers..hide.order"></a>

#### hide.order
**Kind**: static property of [<code>hide</code>](#modifiers..hide)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>800</code> | Index used to define the order of execution |

<a name="modifiers..hide.enabled"></a>

#### hide.enabled
**Kind**: static property of [<code>hide</code>](#modifiers..hide)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..hide.fn"></a>

#### hide.fn
**Kind**: static property of [<code>hide</code>](#modifiers..hide)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..computeStyle"></a>

### modifiers~computeStyle
Computes the style that will be applied to the popper element to gets
properly positioned.

Note that this modifier will not touch the DOM, it just prepares the styles
so that `applyStyle` modifier can apply it. This separation is useful
in case you need to replace `applyStyle` with a custom implementation.

This modifier has `850` as `order` value to maintain backward compatibility
with previous versions of Popper.js. Expect the modifiers ordering method
to change in future major versions of the library.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~computeStyle](#modifiers..computeStyle)
    * [.order](#modifiers..computeStyle.order)
    * [.enabled](#modifiers..computeStyle.enabled)
    * [.fn](#modifiers..computeStyle.fn)
    * [.gpuAcceleration](#modifiers..computeStyle.gpuAcceleration)
    * [.x](#modifiers..computeStyle.x)
    * [.y](#modifiers..computeStyle.y)

<a name="modifiers..computeStyle.order"></a>

#### computeStyle.order
**Kind**: static property of [<code>computeStyle</code>](#modifiers..computeStyle)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>850</code> | Index used to define the order of execution |

<a name="modifiers..computeStyle.enabled"></a>

#### computeStyle.enabled
**Kind**: static property of [<code>computeStyle</code>](#modifiers..computeStyle)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..computeStyle.fn"></a>

#### computeStyle.fn
**Kind**: static property of [<code>computeStyle</code>](#modifiers..computeStyle)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..computeStyle.gpuAcceleration"></a>

#### computeStyle.gpuAcceleration
**Kind**: static property of [<code>computeStyle</code>](#modifiers..computeStyle)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gpuAcceleration | <code>Boolean</code> | <code>true</code> | If true, it uses the CSS 3d transformation to position the popper. Otherwise, it will use the `top` and `left` properties. |

<a name="modifiers..computeStyle.x"></a>

#### computeStyle.x
**Kind**: static property of [<code>computeStyle</code>](#modifiers..computeStyle)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>string</code> | <code>&quot;&#x27;bottom&#x27;&quot;</code> | Where to anchor the X axis (`bottom` or `top`). AKA X offset origin. Change this if your popper should grow in a direction different from `bottom` |

<a name="modifiers..computeStyle.y"></a>

#### computeStyle.y
**Kind**: static property of [<code>computeStyle</code>](#modifiers..computeStyle)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>string</code> | <code>&quot;&#x27;left&#x27;&quot;</code> | Where to anchor the Y axis (`left` or `right`). AKA Y offset origin. Change this if your popper should grow in a direction different from `right` |

<a name="modifiers..applyStyle"></a>

### modifiers~applyStyle
Applies the computed styles to the popper element.

All the DOM manipulations are limited to this modifier. This is useful in case
you want to integrate Popper.js inside a framework or view library and you
want to delegate all the DOM manipulations to it.

Note that if you disable this modifier, you must make sure the popper element
has its position set to `absolute` before Popper.js can do its work!

Just disable this modifier and define you own to achieve the desired effect.

**Kind**: inner property of [<code>modifiers</code>](#modifiers)  

* [~applyStyle](#modifiers..applyStyle)
    * [.order](#modifiers..applyStyle.order)
    * [.enabled](#modifiers..applyStyle.enabled)
    * [.fn](#modifiers..applyStyle.fn)
    * [.onLoad](#modifiers..applyStyle.onLoad)
    * ~~[.gpuAcceleration](#modifiers..applyStyle.gpuAcceleration)~~

<a name="modifiers..applyStyle.order"></a>

#### applyStyle.order
**Kind**: static property of [<code>applyStyle</code>](#modifiers..applyStyle)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>number</code> | <code>900</code> | Index used to define the order of execution |

<a name="modifiers..applyStyle.enabled"></a>

#### applyStyle.enabled
**Kind**: static property of [<code>applyStyle</code>](#modifiers..applyStyle)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | <code>Boolean</code> | <code>true</code> | Whether the modifier is enabled or not |

<a name="modifiers..applyStyle.fn"></a>

#### applyStyle.fn
**Kind**: static property of [<code>applyStyle</code>](#modifiers..applyStyle)  
**Properties**

| Type |
| --- |
| [<code>ModifierFn</code>](#ModifierFn) | 

<a name="modifiers..applyStyle.onLoad"></a>

#### applyStyle.onLoad
**Kind**: static property of [<code>applyStyle</code>](#modifiers..applyStyle)  
**Properties**

| Type |
| --- |
| <code>function</code> | 

<a name="modifiers..applyStyle.gpuAcceleration"></a>

#### ~~applyStyle.gpuAcceleration~~
***Deprecated***

**Kind**: static property of [<code>applyStyle</code>](#modifiers..applyStyle)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gpuAcceleration | <code>Boolean</code> | <code>true</code> | If true, it uses the CSS 3d transformation to position the popper. Otherwise, it will use the `top` and `left` properties. |

<a name="ModifierFn"></a>

## ModifierFn(data, options) ⇒ [<code>dataObject</code>](#dataObject)
Modifier function, each modifier can have a function of this type assigned
to its `fn` property.<br />
These functions will be called on each update, this means that you must
make sure they are performant enough to avoid performance bottlenecks.

**Kind**: global function  
**Returns**: [<code>dataObject</code>](#dataObject) - The data object, properly modified  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>dataObject</code>](#dataObject) | The data object generated by `update` method |
| options | <code>Object</code> | Modifiers configuration and options |

<a name="onUpdate"></a>

## onUpdate : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| data | [<code>dataObject</code>](#dataObject) | 

<a name="onCreate"></a>

## onCreate : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| data | [<code>dataObject</code>](#dataObject) | 

