Events
======

Datepicker triggers a number of events in certain circumstances.  All events have extra data attached to the event object that is passed to any event handlers

::

    $('.datepicker').datepicker()
        .on(picker_event, function(e) {
            // `e` here contains the extra attributes
        });

* ``date``: the relevant Date object, in local timezone.  For a multidate picker, this will be the latest date picked.
* ``dates``: an Array of Date objects, in local timezone, when using a multidate picker.
* ``format([ix], [format])``: a function to make formatting ``date`` easier.  ``ix`` can be the index of a Date in the ``dates`` array to format; if absent, the last date selected will be used.  ``format`` can be any format string that datepicker supports; if absent, the format set on the datepicker will be used.  Both arguments are optional.


show
----

Fired when the date picker is displayed.


hide
----

Fired when the date picker is hidden.


clearDate
---------

Fired when the date is cleared, normally when the "clear" button (enabled with the ``clearBtn`` option) is pressed.


changeDate
----------

Fired when the date is changed.


changeMonth
-----------

Fired when the *view* month is changed from year view.


changeYear
----------

Fired when the *view* year is changed from decade view.


changeDecade
------------

Fired when the *view* decade is changed from century view.


changeCentury
-------------

Fired when the *view* century is changed from millennium view.
