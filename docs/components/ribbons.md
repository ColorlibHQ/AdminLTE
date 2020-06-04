---
layout: page
title: Ribbons Component
---

The ribbons component is a easy way to display informations above any content. The `.ribbon-warpper` needs to be inside a element with _position:relative;_. In this docs page we place the ribbon always inside `<div class="position-relative p-3 bg-gray" style="height: 180px"></div>` for demo purpose but it can placed inside cards, table rows & many more.

The ribbon comes in three sizes to display more text or use larger font sizes, default (only `.ribbon-wrapper`), large (`.ribbon-wrapper` with `.ribbon-lg`), extra large (`.ribbon-wrapper` with `.ribbon-xl`).

##### Example Markup 
{: .text-bold .text-dark .mt-5}

<div class="position-relative p-3 bg-gray" style="height: 180px">
  <div class="ribbon-wrapper">
    <div class="ribbon bg-primary">
      Ribbon
    </div>
  </div>
  Ribbon Default <br />
  <small>.ribbon-wrapper.ribbon-lg .ribbon</small>
</div>

```html
  <div class="ribbon-wrapper">
    <div class="ribbon bg-primary">
      Ribbon
    </div>
  </div>
```
{: .max-height-300}

##### Ribbon Size Variations
{: .text-bold .text-dark .mt-5}
<div class="row">
  <div class="col-sm-4">
    <div class="position-relative p-3 bg-gray" style="height: 180px">
      <div class="ribbon-wrapper">
        <div class="ribbon bg-primary">
          Ribbon
        </div>
      </div>
      Ribbon Default <br />
      <small>.ribbon-wrapper.ribbon-lg .ribbon</small>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="position-relative p-3 bg-gray" style="height: 180px">
      <div class="ribbon-wrapper ribbon-lg">
        <div class="ribbon bg-info">
          Ribbon Large
        </div>
      </div>
      Ribbon Large <br />
      <small>.ribbon-wrapper.ribbon-lg .ribbon</small>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="position-relative p-3 bg-gray" style="height: 180px">
      <div class="ribbon-wrapper ribbon-xl">
        <div class="ribbon bg-secondary">
          Ribbon Extra Large
        </div>
      </div>
      Ribbon Extra Large <br />
      <small>.ribbon-wrapper.ribbon-xl .ribbon</small>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-4" markdown="1">
```html
  <div class="ribbon-wrapper">
    <div class="ribbon bg-primary">
      Ribbon
    </div>
  </div>
```
  </div>
  <div class="col-sm-4" markdown="1">
```html
  <div class="ribbon-wrapper ribbon-lg">
    <div class="ribbon bg-info">
      Ribbon Large
    </div>
  </div>
```
  </div>
  <div class="col-sm-4" markdown="1">
```html
  <div class="ribbon-wrapper ribbon-xl">
    <div class="ribbon bg-secondary">
      Ribbon Extra Large
    </div>
  </div>
```
  </div>
</div>

##### Text Size Variations
{: .text-bold .text-dark .mt-5}

<div class="row">
  <div class="col-sm-4">
    <div class="position-relative p-3 bg-gray" style="height: 180px">
      <div class="ribbon-wrapper ribbon-lg">
        <div class="ribbon bg-success text-lg">
          Ribbon
        </div>
      </div>
      Ribbon Large <br /> with Large Text <br />
      <small>.ribbon-wrapper.ribbon-lg .ribbon.text-lg</small>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="position-relative p-3 bg-gray" style="height: 180px">
      <div class="ribbon-wrapper ribbon-xl">
        <div class="ribbon bg-warning text-lg">
          Ribbon
        </div>
      </div>
      Ribbon Extra Large <br /> with Large Text <br />
      <small>.ribbon-wrapper.ribbon-xl .ribbon.text-lg</small>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="position-relative p-3 bg-gray" style="height: 180px">
      <div class="ribbon-wrapper ribbon-xl">
        <div class="ribbon bg-danger text-xl">
          Ribbon
        </div>
      </div>
      Ribbon Extra Large <br /> with Extra Large Text <br />
      <small>.ribbon-wrapper.ribbon-xl .ribbon.text-xl</small>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-4" markdown="1">
```html
<div class="ribbon-wrapper ribbon-lg">
  <div class="ribbon bg-success text-lg">
    Ribbon
  </div>
</div>
```
  </div>
  <div class="col-sm-4" markdown="1">
```html
<div class="ribbon-wrapper ribbon-xl">
  <div class="ribbon bg-warning text-lg">
    Ribbon
  </div>
</div>
```
  </div>
  <div class="col-sm-4" markdown="1">
```html
<div class="ribbon-wrapper ribbon-xl">
  <div class="ribbon bg-danger text-xl">
    Ribbon
  </div>
</div>
```
  </div>
</div>

##### Image Example Code
{: .text-bold .text-dark .mt-5}

```html
<div class="position-relative">
    <img src="../../dist/img/photo1.png" alt="Photo 1" class="img-fluid">
    <div class="ribbon-wrapper ribbon-lg">
        <div class="ribbon bg-success text-lg">
            Ribbon
        </div>
    </div>
</div>
```
