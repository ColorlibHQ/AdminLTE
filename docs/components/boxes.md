---
layout: page
title: Boxes Components
---

There are two types of boxes, info boxes & small boxes. Both boxes are used to display statistical snippets. 


##### Info Box
{: .text-bold .text-dark .mt-4}

<div class="row">
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box">
      <span class="info-box-icon bg-info"><i class="far fa-envelope"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Messages</span>
        <span class="info-box-number">1,410</span>
      </div>
    </div>
  </div>
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box bg-success">
      <span class="info-box-icon"><i class="far fa-flag"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Bookmarks</span>
        <span class="info-box-number">410</span>
      </div>
    </div>
  </div>
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box bg-gradient-warning">
      <span class="info-box-icon"><i class="far fa-copy"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Uploads</span>
        <span class="info-box-number">13,648</span>
      </div>
    </div>
  </div>
</div>

<div class="row" markdown="1">
```html
<div class="info-box">
  <span class="info-box-icon bg-info"><i class="far fa-envelope"></i></span>
  <div class="info-box-content">
    <span class="info-box-text">Messages</span>
    <span class="info-box-number">1,410</span>
  </div>
</div>
```
{: .col-md-4 .col-sm-6 .col-12}
```html
<div class="info-box bg-success">
  <span class="info-box-icon"><i class="far fa-flag"></i></span>
  <div class="info-box-content">
    <span class="info-box-text">Bookmarks</span>
    <span class="info-box-number">410</span>
  </div>
</div>
```
{: .col-md-4 .col-sm-6 .col-12}
```html
<div class="info-box bg-gradient-warning">
  <span class="info-box-icon"><i class="far fa-copy"></i></span>
  <div class="info-box-content">
    <span class="info-box-text">Uploads</span>
    <span class="info-box-number">13,648</span>
  </div>
</div>
```
{: .col-md-4 .col-sm-6 .col-12}
</div>

##### Info Box with Progress Bar
{: .text-bold .text-dark .mt-4}

<div class="row">
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box">
      <span class="info-box-icon bg-info"><i class="far fa-bookmark"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Bookmarks</span>
        <span class="info-box-number">41,410</span>
        <div class="progress">
          <div class="progress-bar bg-info" style="width: 70%"></div>
        </div>
        <span class="progress-description">
          70% Increase in 30 Days
        </span>
      </div>
    </div>
  </div>
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box bg-success">
      <span class="info-box-icon"><i class="far fa-thumbs-up"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Likes</span>
        <span class="info-box-number">41,410</span>
        <div class="progress">
          <div class="progress-bar" style="width: 70%"></div>
        </div>
        <span class="progress-description">
          70% Increase in 30 Days
        </span>
      </div>
    </div>
  </div>
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box bg-gradient-warning">
      <span class="info-box-icon"><i class="far fa-calendar-alt"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Events</span>
        <span class="info-box-number">41,410</span>
        <div class="progress">
          <div class="progress-bar" style="width: 70%"></div>
        </div>
        <span class="progress-description">
          70% Increase in 30 Days
        </span>
      </div>
    </div>
  </div>
</div>

<div class="row" markdown="1">
```html
<div class="info-box">
  <span class="info-box-icon bg-info"><i class="far fa-bookmark"></i></span>
  <div class="info-box-content">
    <span class="info-box-text">Bookmarks</span>
    <span class="info-box-number">41,410</span>
    <div class="progress">
      <div class="progress-bar bg-info" style="width: 70%"></div>
    </div>
    <span class="progress-description">
      70% Increase in 30 Days
    </span>
  </div>
</div>
```
{: .col-md-4 .col-sm-6 .col-12 .max-height-300}
```html
<div class="info-box bg-success">
  <span class="info-box-icon"><i class="far fa-thumbs-up"></i></span>
  <div class="info-box-content">
    <span class="info-box-text">Likes</span>
    <span class="info-box-number">41,410</span>
    <div class="progress">
      <div class="progress-bar" style="width: 70%"></div>
    </div>
    <span class="progress-description">
      70% Increase in 30 Days
    </span>
  </div>
</div>
```
{: .col-md-4 .col-sm-6 .col-12 .max-height-300}
```html
<div class="info-box bg-gradient-warning">
  <span class="info-box-icon"><i class="far fa-calendar-alt"></i></span>
  <div class="info-box-content">
    <span class="info-box-text">Events</span>
    <span class="info-box-number">41,410</span>
    <div class="progress">
      <div class="progress-bar" style="width: 70%"></div>
    </div>
    <span class="progress-description">
      70% Increase in 30 Days
    </span>
  </div>
</div>
```
{: .col-md-4 .col-sm-6 .col-12 .max-height-300}
</div>


##### Small Box
{: .text-bold .text-dark .mt-4}

<div class="row">
  <div class="col-lg-4 col-md-6 col-sm-6 col-12">
    <div class="small-box bg-info">
      <div class="inner">
        <h3>150</h3>
        <p>New Orders</p>
      </div>
      <div class="icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <a href="#" class="small-box-footer">
        More info <i class="fas fa-arrow-circle-right"></i>
      </a>
    </div>
  </div>
  <div class="col-lg-4 col-md-6 col-sm-6 col-12">
    <div class="small-box bg-gradient-success">
      <div class="inner">
        <h3>44</h3>
        <p>User Registrations</p>
      </div>
      <div class="icon">
        <i class="fas fa-user-plus"></i>
      </div>
      <a href="#" class="small-box-footer">
        More info <i class="fas fa-arrow-circle-right"></i>
      </a>
    </div>
  </div>
</div>

<div class="row" markdown="1">
```html
<div class="small-box bg-info">
  <div class="inner">
    <h3>150</h3>
    <p>New Orders</p>
  </div>
  <div class="icon">
    <i class="fas fa-shopping-cart"></i>
  </div>
  <a href="#" class="small-box-footer">
    More info <i class="fas fa-arrow-circle-right"></i>
  </a>
</div>
```
{: .col-md-4 .col-sm-6 .col-12 .max-height-300}
```html
<div class="small-box bg-gradient-success">
  <div class="inner">
    <h3>44</h3>
    <p>User Registrations</p>
  </div>
  <div class="icon">
    <i class="fas fa-user-plus"></i>
  </div>
  <a href="#" class="small-box-footer">
    More info <i class="fas fa-arrow-circle-right"></i>
  </a>
</div>
```
{: .col-md-4 .col-sm-6 .col-12 .max-height-300}
</div>



##### Loading Style
{: .text-bold .text-dark .mt-5}
To simulate a loading state, simply place this code before the `.info-box` / `.small-box` closing tag. 

> ##### Tip!
> We recommend `.fa-2x` for Info Boxes and `.fa-3x` for Small Boxes to get a nicely sized loading icon, <br> like in this documentation. 
{: .quote-info}

```html
<div class="overlay">
  <i class="fas fa-2x fa-sync-alt fa-spin"></i>
</div>
```

<div class="row">
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box clearfix">
      <span class="info-box-icon bg-info"><i class="far fa-envelope"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Messages</span>
        <span class="info-box-number">1,410</span>
      </div>
      <div class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box">
      <span class="info-box-icon bg-info"><i class="far fa-bookmark"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Bookmarks</span>
        <span class="info-box-number">41,410</span>
        <div class="progress">
          <div class="progress-bar bg-info" style="width: 70%"></div>
        </div>
        <span class="progress-description">
          70% Increase in 30 Days
        </span>
      </div>
      <div class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-md-6 col-sm-6 col-12">
    <div class="small-box bg-info">
      <div class="inner">
        <h3>150</h3>
        <p>New Orders</p>
      </div>
      <div class="icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <a href="#" class="small-box-footer">
        More info <i class="fas fa-arrow-circle-right"></i>
      </a>
      <div class="overlay">
        <i class="fas fa-3x fa-sync-alt fa-spin"></i>
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
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box clearfix">
      <span class="info-box-icon bg-info"><i class="far fa-envelope"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Messages</span>
        <span class="info-box-number">1,410</span>
      </div>
      <div class="overlay dark">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-md-4 col-sm-6 col-12">
    <div class="info-box">
      <span class="info-box-icon bg-info"><i class="far fa-bookmark"></i></span>
      <div class="info-box-content">
        <span class="info-box-text">Bookmarks</span>
        <span class="info-box-number">41,410</span>
        <div class="progress">
          <div class="progress-bar bg-info" style="width: 70%"></div>
        </div>
        <span class="progress-description">
          70% Increase in 30 Days
        </span>
      </div>
      <div class="overlay dark">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-md-6 col-sm-6 col-12">
    <div class="small-box bg-info">
      <div class="inner">
        <h3>150</h3>
        <p>New Orders</p>
      </div>
      <div class="icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <a href="#" class="small-box-footer">
        More info <i class="fas fa-arrow-circle-right"></i>
      </a>
      <div class="overlay dark">
        <i class="fas fa-3x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
</div>
