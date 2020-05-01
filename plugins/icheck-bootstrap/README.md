# icheck-bootstrap

<a href="#" target="_blank"><img src="https://img.shields.io/badge/bower-v3.0.1-blue.svg" alt="bower version"></a>
<a href="https://www.npmjs.com/package/icheck-bootstrap" target="_blank"><img src="https://img.shields.io/badge/npm-v3.0.1-blue.svg" alt="npm version"></a>
<a href="https://www.nuget.org/packages/icheck-bootstrap" target="_blank"><img src="https://img.shields.io/badge/nuget-v3.0.1-blue.svg" alt="nuget version"></a>
[![](https://data.jsdelivr.com/v1/package/npm/icheck-bootstrap/badge)](https://www.jsdelivr.com/package/npm/icheck-bootstrap)

Did you had a problem customizing html checkboxes and radio buttons? icheck-bootstrap is pure css solution for displaying twitter bootstrap style checkboxes and radio buttons. Try [Demo](https://bantikyan.github.io/icheck-bootstrap/).

You may also like to try [icheck-material](https://github.com/bantikyan/icheck-material).

## Table of contents

* <a href="#user-content-getting-started">Getting started</a>
* <a href="#user-content-html-syntax">HTML syntax</a>
* <a href="#user-content-aspnet-mvc-syntax">ASP.NET MVC syntax</a>
* <a href="#user-content-color-schemes">Color schemes</a>
* <a href="#user-content-license">License</a>

## Getting started

Several quick start options are available:

* [Download the latest release](https://github.com//bantikyan/icheck-bootstrap/archive/3.0.1.zip)
* Install with [Bower](https://bower.io): <code>bower install icheck-bootstrap</code>
* Install with [npm](https://www.npmjs.com/package/icheck-bootstrap): <code>npm install icheck-bootstrap</code>
* Install with [Nuget](https://www.nuget.org/packages/icheck-bootstrap/): <code>Install-Package icheck-bootstrap</code>
* Use CDN [jsDelivr](https://www.jsdelivr.com/package/npm/icheck-bootstrap)

## HTML syntax

#### checkbox example

```
<div class="icheck-primary">
    <input type="checkbox" id="someCheckboxId" />
    <label for="someCheckboxId">Click to check</label>
</div>
```

#### radio buttons example

```
<div class="icheck-primary">
    <input type="radio" id="someRadioId1" name="someGroupName" />
    <label for="someRadioId1">Option 1</label>
</div>
<div class="icheck-primary">
    <input type="radio" id="someRadioId2" name="someGroupName" />
    <label for="someRadioId2">Option 2</label>
</div>
```

#### inline styling

To have checkboxes or radio buttons inline use .icheck-inline class

```
<div class="icheck-primary icheck-inline">
    <input type="checkbox" id="chb1" />
    <label for="chb1">Label 1</label>
</div>
<div class="icheck-primary icheck-inline">
    <input type="checkbox" id="chb2" />
    <label for="chb2">Label 2</label>
</div>
```

#### disabled

Use disabled attribute on your input (checkbox or radio) to have disabled style.

#### no label

To have components without label, you still have to have label control with empty text.

```
<div class="icheck-primary">
    <input type="checkbox" id="someCheckboxId" />
    <label for="someCheckboxId"></label>
</div>
```

## ASP.NET MVC syntax

#### checkbox example

```
<div class="icheck-primary">
    @Html.CheckBoxFor(m => m.SomeProperty, new { id = "someCheckboxId" })
    <label for="someCheckboxId">Click to check</label>
</div>
```

#### radio buttons example

```
<div class="icheck-primary">
    @Html.RadioButtonFor(m => m.SomeProperty, SomeValue1, new { id = "someRadioId1" }) 
    <label for="someRadioId1">Option 1</label>
</div>
<div class="icheck-primary">
    @Html.RadioButtonFor(m => m.SomeProperty, SomeValue2, new { id = "someRadioId2" })
    <label for="someRadioId2">Option 2</label>
</div>
```

## Color schemes

Try [Demo](https://bantikyan.github.io/icheck-bootstrap/)

<b>Twitter Bootstrap:</b> As you can see in previous examples, icheck-primary class used for styling.
You can use following classes for Twitter Bootstrap color scheme:

<code>.icheck-default</code><br/>
<code>.icheck-primary</code><br/>
<code>.icheck-success</code><br/>
<code>.icheck-info</code><br/>
<code>.icheck-warning</code><br/>
<code>.icheck-danger</code>

<b>Flat UI Colors:</b> Also you can use one of the really nice colors from [flatuicolors.com](https://flatuicolors.com/)

<code>.icheck-turquoise</code><br/>
<code>.icheck-emerland</code><br/>
<code>.icheck-peterriver</code><br/>
<code>.icheck-amethyst</code><br/>
<code>.icheck-wetasphalt</code><br/>
<code>.icheck-greensea</code><br/>
<code>.icheck-nephritis</code><br/>
<code>.icheck-belizehole</code><br/>
<code>.icheck-wisteria</code><br/>
<code>.icheck-midnightblue</code><br/>
<code>.icheck-sunflower</code><br/>
<code>.icheck-carrot</code><br/>
<code>.icheck-alizarin</code><br/>
<code>.icheck-clouds</code><br/>
<code>.icheck-concrete</code><br/>
<code>.icheck-orange</code><br/>
<code>.icheck-pumpkin</code><br/>
<code>.icheck-pomegranate</code><br/>
<code>.icheck-silver</code><br/>
<code>.icheck-asbestos</code><br/>

## License

icheck-bootstrap released under the [MIT license](https://github.com/bantikyan/icheck-bootstrap/blob/master/LICENSE). Feel free to use it in personal and commercial projects.
