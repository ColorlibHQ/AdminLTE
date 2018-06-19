jQuery Knob
=============

- canvas based ; no png or jpg sprites.
- touch, mouse and mousewheel, keyboard events implemented.
- downward compatible ; overloads an input element.

Example
-------

```html
<input type="text" value="75" class="dial">

<script>
    $(function() {
        $(".dial").knob();
    });
</script>
```

Options
-------

Options are provided as attributes 'data-option':

```html
<input type="text" class="dial" data-min="-50" data-max="50">
```

... or in the "knob()" call :

```javascript
$(".dial").knob({
    'min':-50,
    'max':50
});
```

The following options are supported :

Behaviors :
* min : min value | default=0.
* max : max value | default=100.
* step : step size | default=1.
* angleOffset : starting angle in degrees | default=0.
* angleArc : arc size in degrees | default=360.
* stopper : stop at min & max on keydown/mousewheel | default=true.
* readOnly : disable input and events | default=false.
* rotation : direction of progression | default=clockwise.

UI :
* cursor : display mode "cursor", cursor size could be changed passing a numeric value to the option, default width is used when passing boolean value "true" | default=gauge.
* thickness : gauge thickness.
* lineCap : gauge stroke endings. | default=butt, round=rounded line endings
* width : dial width.
* height : dial height.
* displayInput : default=true | false=hide input.
* displayPrevious : default=false | true=displays the previous value with transparency.
* fgColor : foreground color.
* inputColor : input value (number) color.
* font : font family.
* fontWeight : font weight.
* bgColor : background color.

Hooks
-------

```html
<script>
    $(".dial").knob({
        'release' : function (v) { /*make something*/ }
    });
</script>
```

* 'release' : executed on release

    Parameters :
    + value : int, current value

* 'change' : executed at each change of the value

    Parameters :
    + value : int, current value

* 'draw' : when drawing the canvas

    Context :
    - this.g : canvas context 2D (see Canvas documentation)
    - this.$ : jQuery wrapped element
    - this.o : options
    - this.i : input
    - ... console.log(this);

* 'cancel' : triggered on [esc] keydown

* 'format' : allows to format output (add unit %, ms ...)

The scope (this) of each hook function is the current Knob instance (refer to the demo code).

Example
-------

```html
<input type="text" value="75" class="dial">

<script>
    $(".dial").knob({
        'change' : function (v) { console.log(v); }
    });
</script>
```

Dynamically configure
-------

```html
<script>
    $('.dial').trigger(
        'configure',
        {
            "min":10,
            "max":40,
            "fgColor":"#FF0000",
            "skin":"tron",
            "cursor":true
        }
    );
</script>
```

Set the value
-------

```html
<script>
    $('.dial')
        .val(27)
        .trigger('change');
</script>
```

Supported browser
-------

Tested on Chrome, Safari, Firefox, IE>=8.0 (IE8.0 with excanvas).

![secretplan](https://raw.github.com/aterrien/jQuery-Knob/master/secretplan.jpg)
