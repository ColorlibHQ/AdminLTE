Keyboard support
================

The datepicker includes keyboard navigation.  The "focused date" is kept track of and highlighted (as with mouse hover) during keyboard nav, and is cleared when a date is toggled or the picker is hidden.

up, down, left, right arrow keys
--------------------------------

By themselves, left/right will move focus backward/forward one day, up/down will move focus back/forward one week.

With the shift key, up/left will move focus backward one month, down/right will move focus forward one month.

With the ctrl key, up/left will move focus backward one year, down/right will move focus forward one year.

Shift+ctrl behaves the same as ctrl -- that is, it does not change both month and year simultaneously, only the year.

enter
-----

When the picker is visible, enter will toggle the focused date (if there is one).  When the picker is not visible, enter will have normal effects -- submitting the current form, etc.

When the date is deselected, the ``clearDate`` event is triggered; otherwise, the ``changeDate`` event is triggered.  If ``autoclose`` is enabled, the picker will be hidden after selection or deselection.

escape
------

The escape key can be used to clear the focused date and hide and re-show the datepicker; hiding the picker is necessary if the user wants to manually edit the value.
