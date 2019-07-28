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
You can change the style of the card by adding any of the contextual classes.

###### Default
{: .text-bold .text-dark}

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

###### Outline
{: .text-bold .text-dark}

<div class="row">
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
</div>
<div class="row">
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


###### Background Color
{: .text-bold .text-dark}

<div class="row">
  <div class="col-sm-3">
    <div class="card bg-primary">
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
    <div class="card bg-secondary">
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
    <div class="card bg-success">
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
  <div class="col-sm-3">
    <div class="card bg-info">
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
</div>
<div class="row">
  <div class="col-sm-3">
    <div class="card bg-warning">
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
    <div class="card bg-danger">
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
    <div class="card bg-dark">
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
<div class="card bg-primary">...</div>
<div class="card bg-secondary">...</div>
<div class="card bg-success">...</div>
<div class="card bg-info">...</div>
<div class="card bg-warning">...</div>
<div class="card bg-danger">...</div>
<div class="card bg-dark">...</div>
```


###### Gradient Background Color
{: .text-bold .text-dark}

<div class="row">
  <div class="col-sm-3">
    <div class="card bg-gradient-primary">
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
    <div class="card bg-gradient-secondary">
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
    <div class="card bg-gradient-success">
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
  <div class="col-sm-3">
    <div class="card bg-gradient-info">
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
</div>
<div class="row">
  <div class="col-sm-3">
    <div class="card bg-gradient-warning">
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
    <div class="card bg-gradient-danger">
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
    <div class="card bg-gradient-dark">
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
<div class="card bg-gradient-primary">...</div>
<div class="card bg-gradient-secondary">...</div>
<div class="card bg-gradient-success">...</div>
<div class="card bg-gradient-info">...</div>
<div class="card bg-gradient-warning">...</div>
<div class="card bg-gradient-danger">...</div>
<div class="card bg-gradient-dark">...</div>
```


##### Card Tools
{: .text-bold .text-dark .mt-5}
Cards can contain tools to deploy a specific event or provide simple info. The following examples makes use of multiple AdminLTE components within the header of the card.

AdminLTE data-widget attribute provides cards with the ability to collapse or be removed. The buttons are placed in the card-tools which is placed in the card-header. 

```html
<div class="card card-primary">
  <div class="card-header">
    <h3 class="card-title">Card Tools</h3>

    <div class="card-tools">
      <!-- This will cause the card to maximize when clicked -->
      <button type="button" class="btn btn-tool" data-widget="maximize"><i class="fas fa-expand"></i></button>
      <!-- This will cause the card to collapse when clicked -->
      <button type="button" class="btn btn-tool" data-widget="collapse"><i class="fas fa-minus"></i></button>
      <!-- This will cause the card to be removed when clicked -->
      <button type="button" class="btn btn-tool" data-widget="remove"><i class="fas fa-times"></i></button>
    </div>
    <!-- /.card-tools -->
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    The body of the card
  </div>
  <!-- /.card-body -->
</div>
<!-- /.card -->
```
{: .max-height-300}


##### Loading Style
{: .text-bold .text-dark .mt-5}
To simulate a loading state, simply place this code before the `.card` closing tag. 

```html
<div class="overlay">
  <i class="fas fa-2x fa-sync-alt fa-spin"></i>
</div>
```

<div class="row">
  <div class="col-md-3">
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title">Loading state</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card card-outline card-primary">
      <div class="card-header">
        <h3 class="card-title">Loading state</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card bg-primary">
      <div class="card-header">
        <h3 class="card-title">Loading state</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card bg-gradient-primary">
      <div class="card-header">
        <h3 class="card-title">Loading state</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
</div>


You can also use a dark loading style with adding `.dark` to `.overlay` like this code.
```html
<div class="overlay dark">
  <i class="fas fa-2x fa-sync-alt fa-spin"></i>
</div>
```

<div class="row">
  <div class="col-md-3">
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title">Loading state (dark)</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="overlay dark">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card card-outline card-primary">
      <div class="card-header">
        <h3 class="card-title">Loading state (dark)</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="overlay dark">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card bg-primary">
      <div class="card-header">
        <h3 class="card-title">Loading state (dark)</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="overlay dark">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card bg-gradient-primary">
      <div class="card-header">
        <h3 class="card-title">Loading state (dark)</h3>
      </div>
      <div class="card-body">
        The body of the card
      </div>
      <div class="overlay dark">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
</div>
