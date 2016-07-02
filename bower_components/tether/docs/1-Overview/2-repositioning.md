Repositioning
-----

Tethers will be automatically repositioned when the page is resized, and when any element containing the Tether is scrolled.
If the element moves for some other reason (e.g. with JavaScript), Tether won't know to reposition the element.

#### Manually Repositioning

The simplest way to reposition every Tether on the page is to call `Tether.position()`.  It will efficiently reposition every
Tether in a single repaint, making it more efficient than manually repositioning many Tethers individually.

```javascript
Tether.position()
```

#### Repositioning a Single Tether

If you have many Tethers on screen, it may be more efficient to just reposition the tether that needs it.  You can do this
by calling the `.position` method on the Tether instance:

```javascript
tether = new Tether({ ... })

// Later:
tether.position()
```

#### Tethering Hidden Elements

If you are creating a tether involving elements which are `display: none`, or not actually in the DOM, 
your Tether may not be able to position itself properly.  One way around this is to
ensure that a position call happens after all layouts have finished:

```javascript
myElement.style.display = 'block'

tether = new Tether({ ... })

setTimeout(function(){
  tether.position();
})
```

In general however, you shouldn't have any trouble if both the element and the target are visible and in the DOM when you
create the Tether.  If that is not the case, create the Tether disabled (option `enabled`: `false`), and enable it when
the elements are ready.
