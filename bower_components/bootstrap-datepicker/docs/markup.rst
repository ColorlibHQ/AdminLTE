Markup
=======

The following are examples of supported markup.  On their own, these will not provide a datepicker widget; you will need to instantiate the datepicker on the markup.


input
-----

The simplest case: focusing the input (clicking or tabbing into it) will show the picker.

.. code-block:: html

    <input type="text" class="form-control" value="02-16-2012">

.. figure:: _static/screenshots/markup_input.png
    :align: center

component
---------

Adding the ``date`` class to an ``input-group`` bootstrap component will allow the ``input-group-addon`` elements to trigger the picker.

.. code-block:: html

    <div class="input-group date">
        <input type="text" class="form-control" value="12-02-2012">
        <div class="input-group-addon">
            <span class="glyphicon glyphicon-th"></span>
        </div>
    </div>

.. figure:: _static/screenshots/markup_component.png
    :align: center

.. _daterange:

date-range
----------

Using the ``input-daterange`` construct with multiple child inputs will instantiate one picker per input and link them together to allow selecting ranges.

.. code-block:: html

    <div class="input-group input-daterange">
        <input type="text" class="form-control" value="2012-04-05">
        <div class="input-group-addon">to</div>
        <input type="text" class="form-control" value="2012-04-19">
    </div>

.. figure:: _static/screenshots/markup_daterange.png
    :align: center

Note that that ``input-daterange`` itself does not implement the ``datepicker`` methods. Methods should be directly called to the inputs. For example:

::

    $('.input-daterange input').each(function() {
        $(this).datepicker('clearDates');
    });

inline or embedded
------------------

Instantiating the datepicker on a simple div will give an embedded picker that is always visible.

.. code-block:: html

    <div data-date="12/03/2012"></div>

.. figure:: _static/screenshots/markup_inline.png
    :align: center


Example to save the embedded datepicker value to a hidden field

.. code-block:: html

    <div id="datepicker" data-date="12/03/2012"></div>
    <input type="hidden" id="my_hidden_input">

::

    $('#datepicker').datepicker();
    $('#datepicker').on('changeDate', function() {
        $('#my_hidden_input').val(
            $('#datepicker').datepicker('getFormattedDate')
        );
    });
