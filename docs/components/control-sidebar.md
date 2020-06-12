---
layout: page
title: Control Sidebar Component
---

Control sidebar is the right sidebar. It can be used for many purposes and is extremely easy to create. The sidebar ships with two different show/hide styles. The first allows the sidebar to slide over the content. The second pushes the content to make space for the sidebar. Either of these methods can be set through the [JavaScript options]({% link javascript/control-sidebar.md %}). 

The following code should be placed within the `.wrapper` div. I prefer to place it right after the footer.

##### Control Sidebar Push
{: .text-bold .text-dark}

By adding the `.control-sidebar-push` to `body`, the sidebar pushes the content away instead of overlaying the content.
You can also add `.control-sidebar-push-slide` to `body`, to push the content away with an transition.

##### Dark Sidebar Markup
{: .text-bold .text-dark}

```html
  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
    <div class="p-3">
      <!-- Content of the sidebar goes here -->
    </div>
  </aside>
  <!-- /.control-sidebar -->
```

##### Light Sidebar Markup
{: .text-bold .text-dark .mt-5}

```html
  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-light">
    <!-- Control sidebar content goes here -->
    <div class="p-3">
      <!-- Content of the sidebar goes here -->
    </div>
  </aside>
  <!-- /.control-sidebar -->
```

##### Control Sidebar Toggle Markup
{: .text-bold .text-dark .mt-5}

Once you create the sidebar, you will need a toggle button to open/close it. By adding the attribute data-toggle="control-sidebar" to any button, it will automatically act as the toggle button. 

```html
<a class="nav-link" data-widget="control-sidebar" href="#">Toggle Control Sidebar</a>
```
