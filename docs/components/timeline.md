---
layout: page
title: Timeline Component
---

The timeline component displays an event history. You can use it for descriptions of events that occurred in a particular time section.

##### Default

```html
<!-- Main node for this component -->
<div class="timeline">
  <!-- Timeline time label -->
  <div class="time-label">
    <span class="bg-green">23 Aug. 2019</span>
  </div>
  <div>
  <!-- Before each timeline item corresponds to one icon on the left scale -->
    <i class="fas fa-envelope bg-blue"></i>
    <!-- Timeline item -->
    <div class="timeline-item">
    <!-- Time -->
      <span class="time"><i class="fas fa-clock"></i> 12:05</span>
      <!-- Header. Optional -->
      <h3 class="timeline-header"><a href="#">Support Team</a> sent you an email</h3>
      <!-- Body -->
      <div class="timeline-body">
        Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
        weebly ning heekya handango imeem plugg dopplr jibjab, movity
        jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
        quora plaxo ideeli hulu weebly balihoo...
      </div>
      <!-- Placement of additional controls. Optional -->
      <div class="timeline-footer">
        <a class="btn btn-primary btn-sm">Read more</a>
        <a class="btn btn-danger btn-sm">Delete</a>
      </div>
    </div>
  </div>
  <!-- The last icon means the story is complete -->
  <div>
    <i class="fas fa-clock bg-gray"></i>
  </div>
</div>
```
{: .max-height-300}

##### Extra style

There is an additional class for styling. It darkens the elements, highlighting it against the general background.
You can use it with adding `.timeline-inverse` to `.timeline`.

```html
<div class="timeline timeline-inverse">
  <!-- ... Item ... -->
</div>
```
