---
layout: page
title: Cards Component
---

The card component is the most widely used component through out this template. You can use it for anything from displaying charts to just blocks of text. It comes in many different styles that we will explore below.

##### Default Card Markup
{: .text-bold .text-dark .mt-5}


<div class="card">
  <div class="card-header">
    <h3 class="card-title">Default Card Example</h3>
    <div class="card-tools">
      <span class="badge badge-primary">Label</span>
    </div>
  </div>
  <div class="card-body">
    The body of the card
  </div>
  <div class="card-footer">
    The footer of the card
  </div>
</div>

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Default Card Example</h3>
    <div class="card-tools">
      <!-- Buttons, labels, and many other things can be placed here! -->
      <!-- Here is a label for example -->
      <span class="badge badge-primary">Label</span>
    </div>
    <!-- /.card-tools -->
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    The body of the card
  </div>
  <!-- /.card-body -->
  <div class="card-footer">
    The footer of the card
  </div>
  <!-- /.card-footer -->
</div>
<!-- /.card -->
```
{: .max-height-300}

##### Card Variants
{: .text-bold .text-dark .mt-5}
You can change the style of the box by adding any of the contextual classes.

<div class="row">
  <div class="col-sm-3">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Default Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title">Primary Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-secondary">
      <div class="card-header">
        <h3 class="card-title">Secondary Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-success">
      <div class="card-header">
        <h3 class="card-title">Success Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-3">
    <div class="card card-info">
      <div class="card-header">
        <h3 class="card-title">Info Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-warning">
      <div class="card-header">
        <h3 class="card-title">Warning Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-danger">
      <div class="card-header">
        <h3 class="card-title">Danger Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-dark">
      <div class="card-header">
        <h3 class="card-title">Dark Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
</div>

```html
<div class="card">...</div>
<div class="card card-primary">...</div>
<div class="card card-secondary">...</div>
<div class="card card-success">...</div>
<div class="card card-info">...</div>
<div class="card card-warning">...</div>
<div class="card card-danger">...</div>
<div class="card card-dark">...</div>
```


<div class="row">
  <div class="col-sm-3">
    <div class="card card-outline">
      <div class="card-header">
        <h3 class="card-title">Default Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-outline card-primary">
      <div class="card-header">
        <h3 class="card-title">Primary Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-outline card-secondary">
      <div class="card-header">
        <h3 class="card-title">Secondary Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-outline card-success">
      <div class="card-header">
        <h3 class="card-title">Success Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-3">
    <div class="card card-outline card-info">
      <div class="card-header">
        <h3 class="card-title">Info Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-outline card-warning">
      <div class="card-header">
        <h3 class="card-title">Warning Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-outline card-danger">
      <div class="card-header">
        <h3 class="card-title">Danger Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card card-outline card-dark">
      <div class="card-header">
        <h3 class="card-title">Dark Card Example</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="card-footer">
        The footer of the card
      </div>
    </div>
  </div>
</div>

```html
<div class="card card-outline card-primary">...</div>
<div class="card card-outline card-secondary">...</div>
<div class="card card-outline card-success">...</div>
<div class="card card-outline card-info">...</div>
<div class="card card-outline card-warning">...</div>
<div class="card card-outline card-danger">...</div>
<div class="card card-outline card-dark">...</div>
```
