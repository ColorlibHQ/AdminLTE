(function () {
	'use strict';

	/*! DateTime picker for DataTables.net v1.0.1
	 *
	 * ©2020 SpryMedia Ltd, all rights reserved.
	 * License: MIT datatables.net/license/mit
	 */

	/**
	 * @summary     DateTime picker for DataTables.net
	 * @version     1.0.1
	 * @file        dataTables.dateTime.js
	 * @author      SpryMedia Ltd
	 * @contact     www.datatables.net/contact
	 */
	(function( factory ){
		if ( typeof define === 'function' && define.amd ) {
			// AMD
			define( ['jquery'], function ( $ ) {
				return factory( $, window, document );
			} );
		}
		else if ( typeof exports === 'object' ) {
			// CommonJS
			module.exports = function (root, $) {
				if ( ! root ) {
					root = window;
				}

				return factory( $, root, root.document );
			};
		}
		else {
			// Browser
			factory( jQuery, window, document );
		}
	}(function( $, window, document, undefined$1 ) {

	// Support libraries which support a Moment like API
	var dateLib = window.moment
		? window.moment
		: window.dayjs
			? window.dayjs
			: null;

	/*
	 * This file provides a DateTime GUI picker (calendar and time input). Only the
	 * format YYYY-MM-DD is supported without additional software, but the end user
	 * experience can be greatly enhanced by including the momentjs or dayjs library
	 * which provide date / time parsing and formatting options.
	 *
	 * This functionality is required because the HTML5 date and datetime input
	 * types are not widely supported in desktop browsers.
	 *
	 * Constructed by using:
	 *
	 *     new DateTime( input, opts )
	 *
	 * where `input` is the HTML input element to use and `opts` is an object of
	 * options based on the `DateTime.defaults` object.
	 */
	var DateTime = function ( input, opts ) {
		this.c = $.extend( true, {}, DateTime.defaults, opts );
		var classPrefix = this.c.classPrefix;
		var i18n = this.c.i18n;

		// Only IS8601 dates are supported without moment pr dayjs
		if ( ! dateLib && this.c.format !== 'YYYY-MM-DD' ) {
			throw "DateTime: Without momentjs or dayjs only the format 'YYYY-MM-DD' can be used";
		}

		// Min and max need to be `Date` objects in the config
		if (typeof this.c.minDate === 'string') {
			this.c.minDate = new Date(this.c.minDate);
		}
		if (typeof this.c.maxDate === 'string') {
			this.c.maxDate = new Date(this.c.maxDate);
		}

		// DOM structure
		var structure = $(
			'<div class="'+classPrefix+'">'+
				'<div class="'+classPrefix+'-date">'+
					'<div class="'+classPrefix+'-title">'+
						'<div class="'+classPrefix+'-iconLeft">'+
							'<button>'+i18n.previous+'</button>'+
						'</div>'+
						'<div class="'+classPrefix+'-iconRight">'+
							'<button>'+i18n.next+'</button>'+
						'</div>'+
						'<div class="'+classPrefix+'-label">'+
							'<span></span>'+
							'<select class="'+classPrefix+'-month"></select>'+
						'</div>'+
						'<div class="'+classPrefix+'-label">'+
							'<span></span>'+
							'<select class="'+classPrefix+'-year"></select>'+
						'</div>'+
					'</div>'+
					'<div class="'+classPrefix+'-calendar"></div>'+
				'</div>'+
				'<div class="'+classPrefix+'-time">'+
					'<div class="'+classPrefix+'-hours"></div>'+
					'<div class="'+classPrefix+'-minutes"></div>'+
					'<div class="'+classPrefix+'-seconds"></div>'+
				'</div>'+
				'<div class="'+classPrefix+'-error"></div>'+
			'</div>'
		);

		this.dom = {
			container: structure,
			date:      structure.find( '.'+classPrefix+'-date' ),
			title:     structure.find( '.'+classPrefix+'-title' ),
			calendar:  structure.find( '.'+classPrefix+'-calendar' ),
			time:      structure.find( '.'+classPrefix+'-time' ),
			error:     structure.find( '.'+classPrefix+'-error' ),
			input:     $(input)
		};

		this.s = {
			/** @type {Date} Date value that the picker has currently selected */
			d: null,

			/** @type {Date} Date of the calendar - might not match the value */
			display: null,

			/** @type {number} Used to select minutes in a range where the range base is itself unavailable */
			minutesRange: null,

			/** @type {number} Used to select minutes in a range where the range base is itself unavailable */
			secondsRange: null,

			/** @type {String} Unique namespace string for this instance */
			namespace: 'dateime-'+(DateTime._instance++),

			/** @type {Object} Parts of the picker that should be shown */
			parts: {
				date:    this.c.format.match( /[YMD]|L(?!T)|l/ ) !== null,
				time:    this.c.format.match( /[Hhm]|LT|LTS/ ) !== null,
				seconds: this.c.format.indexOf( 's' )   !== -1,
				hours12: this.c.format.match( /[haA]/ ) !== null
			}
		};

		this.dom.container
			.append( this.dom.date )
			.append( this.dom.time )
			.append( this.dom.error );

		this.dom.date
			.append( this.dom.title )
			.append( this.dom.calendar );

		this._constructor();
	};

	$.extend( DateTime.prototype, {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Public
		 */
		
		/**
		 * Destroy the control
		 */
		destroy: function () {
			this._hide(true);
			this.dom.container.off().empty();
			this.dom.input.off('.datetime');
		},

		errorMsg: function ( msg ) {
			var error = this.dom.error;

			if ( msg ) {
				error.html( msg );
			}
			else {
				error.empty();
			}

			return this;
		},

		hide: function () {
			this._hide();

			return this;
		},

		max: function ( date ) {
			this.c.maxDate = typeof date === 'string'
				? new Date(date)
				: date;

			this._optionsTitle();
			this._setCalander();

			return this;
		},

		min: function ( date ) {
			this.c.minDate = typeof date === 'string'
				? new Date(date)
				: date;

			this._optionsTitle();
			this._setCalander();

			return this;
		},

		/**
		 * Check if an element belongs to this control
		 *
		 * @param  {node} node Element to check
		 * @return {boolean}   true if owned by this control, false otherwise
		 */
		owns: function ( node ) {
			return $(node).parents().filter( this.dom.container ).length > 0;
		},

		/**
		 * Get / set the value
		 *
		 * @param  {string|Date} set   Value to set
		 * @param  {boolean} [write=true] Flag to indicate if the formatted value
		 *   should be written into the input element
		 */
		val: function ( set, write ) {
			if ( set === undefined$1 ) {
				return this.s.d;
			}

			if ( set instanceof Date ) {
				this.s.d = this._dateToUtc( set );
			}
			else if ( set === null || set === '' ) {
				this.s.d = null;
			}
			else if ( set === '--now' ) {
				this.s.d = new Date();
			}
			else if ( typeof set === 'string' ) {
				if ( dateLib ) {
					// Use moment or dayjs if possible (even for ISO8601 strings, since it
					// will correctly handle 0000-00-00 and the like)
					var m = dateLib.utc( set, this.c.format, this.c.locale, this.c.strict );
					this.s.d = m.isValid() ? m.toDate() : null;
				}
				else {
					// Else must be using ISO8601 without a date library (constructor would
					// have thrown an error otherwise)
					var match = set.match(/(\d{4})\-(\d{2})\-(\d{2})/ );
					this.s.d = match ?
						new Date( Date.UTC(match[1], match[2]-1, match[3]) ) :
						null;
				}
			}

			if ( write || write === undefined$1 ) {
				if ( this.s.d ) {
					this._writeOutput();
				}
				else {
					// The input value was not valid...
					this.dom.input.val( set );
				}
			}

			// We need a date to be able to display the calendar at all
			if ( ! this.s.d ) {
				this.s.d = this._dateToUtc( new Date() );
			}

			this.s.display = new Date( this.s.d.toString() );

			// Set the day of the month to be 1 so changing between months doesn't
	        // run into issues when going from day 31 to 28 (for example)
			this.s.display.setUTCDate( 1 );

			// Update the display elements for the new value
			this._setTitle();
			this._setCalander();
			this._setTime();

			return this;
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Constructor
		 */
		
		/**
		 * Build the control and assign initial event handlers
		 *
		 * @private
		 */
		_constructor: function () {
			var that = this;
			var classPrefix = this.c.classPrefix;
			var onChange = function () {
				that.c.onChange.call( that, that.dom.input.val(), that.s.d, that.dom.input );
			};

			if ( ! this.s.parts.date ) {
				this.dom.date.css( 'display', 'none' );
			}

			if ( ! this.s.parts.time ) {
				this.dom.time.css( 'display', 'none' );
			}

			if ( ! this.s.parts.seconds ) {
				this.dom.time.children('div.'+classPrefix+'-seconds').remove();
				this.dom.time.children('span').eq(1).remove();
			}

			// Render the options
			this._optionsTitle();

			window.allan = this;

			// When attached to a hidden input, we always show the input picker, and
			// do so inline
			if (this.dom.input.attr('type') === 'hidden') {
				this.dom.container.addClass('inline');
				this.c.attachTo = 'input';

				this.val( this.dom.input.val(), false );
				this._show();
			}

			// Trigger the display of the widget when clicking or focusing on the
			// input element
			this.dom.input
				.attr('autocomplete', 'off')
				.on('focus.datetime click.datetime', function () {
					// If already visible - don't do anything
					if ( that.dom.container.is(':visible') || that.dom.input.is(':disabled') ) {
						return;
					}

					// In case the value has changed by text
					that.val( that.dom.input.val(), false );

					that._show();
				} )
				.on('keyup.datetime', function () {
					// Update the calendar's displayed value as the user types
					if ( that.dom.container.is(':visible') ) {
						that.val( that.dom.input.val(), false );
					}
				} );

			// Main event handlers for input in the widget
			this.dom.container
				.on( 'change', 'select', function () {
					var select = $(this);
					var val = select.val();

					if ( select.hasClass(classPrefix+'-month') ) {
						// Month select
						that._correctMonth( that.s.display, val );
						that._setTitle();
						that._setCalander();
					}
					else if ( select.hasClass(classPrefix+'-year') ) {
						// Year select
						that.s.display.setUTCFullYear( val );
						that._setTitle();
						that._setCalander();
					}
					else if ( select.hasClass(classPrefix+'-hours') || select.hasClass(classPrefix+'-ampm') ) {
						// Hours - need to take account of AM/PM input if present
						if ( that.s.parts.hours12 ) {
							var hours = $(that.dom.container).find('.'+classPrefix+'-hours').val() * 1;
							var pm = $(that.dom.container).find('.'+classPrefix+'-ampm').val() === 'pm';

							that.s.d.setUTCHours( hours === 12 && !pm ?
								0 :
								pm && hours !== 12 ?
									hours + 12 :
									hours
							);
						}
						else {
							that.s.d.setUTCHours( val );
						}

						that._setTime();
						that._writeOutput( true );

						onChange();
					}
					else if ( select.hasClass(classPrefix+'-minutes') ) {
						// Minutes select
						that.s.d.setUTCMinutes( val );
						that._setTime();
						that._writeOutput( true );

						onChange();
					}
					else if ( select.hasClass(classPrefix+'-seconds') ) {
						// Seconds select
						that.s.d.setSeconds( val );
						that._setTime();
						that._writeOutput( true );

						onChange();
					}

					that.dom.input.focus();
					that._position();
				} )
				.on( 'click', function (e) {
					var d = that.s.d;
					var nodeName = e.target.nodeName.toLowerCase();
					var target = nodeName === 'span' ?
						e.target.parentNode :
						e.target;

					nodeName = target.nodeName.toLowerCase();

					if ( nodeName === 'select' ) {
						return;
					}

					e.stopPropagation();

					if ( nodeName === 'button' ) {
						var button = $(target);
						var parent = button.parent();

						if ( parent.hasClass('disabled') && ! parent.hasClass('range') ) {
							button.blur();
							return;
						}

						if ( parent.hasClass(classPrefix+'-iconLeft') ) {
							// Previous month
							that.s.display.setUTCMonth( that.s.display.getUTCMonth()-1 );
							that._setTitle();
							that._setCalander();

							that.dom.input.focus();
						}
						else if ( parent.hasClass(classPrefix+'-iconRight') ) {
							// Next month
							that._correctMonth( that.s.display, that.s.display.getUTCMonth()+1 );
							that._setTitle();
							that._setCalander();

							that.dom.input.focus();
						}
						else if ( button.parents('.'+classPrefix+'-time').length ) {
							var val = button.data('value');
							var unit = button.data('unit');

							if ( unit === 'minutes' ) {
								if ( parent.hasClass('disabled') && parent.hasClass('range') ) {
									that.s.minutesRange = val;
									that._setTime();
									return;
								}
								else {
									that.s.minutesRange = null;
								}
							}

							if ( unit === 'seconds' ) {
								if ( parent.hasClass('disabled') && parent.hasClass('range') ) {
									that.s.secondsRange = val;
									that._setTime();
									return;
								}
								else {
									that.s.secondsRange = null;
								}
							}

							// Specific to hours for 12h clock
							if ( val === 'am' ) {
								if ( d.getUTCHours() >= 12 ) {
									val = d.getUTCHours() - 12;
								}
								else {
									return;
								}
							}
							else if ( val === 'pm' ) {
								if ( d.getUTCHours() < 12 ) {
									val = d.getUTCHours() + 12;
								}
								else {
									return;
								}
							}

							var set = unit === 'hours' ?
								'setUTCHours' :
								unit === 'minutes' ?
									'setUTCMinutes' :
									'setSeconds';

							d[set]( val );
							that._setTime();
							that._writeOutput( true );
							onChange();
						}
						else {
							// Calendar click
							if ( ! d ) {
								d = that._dateToUtc( new Date() );
							}

							// Can't be certain that the current day will exist in
							// the new month, and likewise don't know that the
							// new day will exist in the old month, But 1 always
							// does, so we can change the month without worry of a
							// recalculation being done automatically by `Date`
							d.setUTCDate( 1 );
							d.setUTCFullYear( button.data('year') );
							d.setUTCMonth( button.data('month') );
							d.setUTCDate( button.data('day') );

							that._writeOutput( true );

							// Don't hide if there is a time picker, since we want to
							// be able to select a time as well.
							if ( ! that.s.parts.time ) {
								// This is annoying but IE has some kind of async
								// behaviour with focus and the focus from the above
								// write would occur after this hide - resulting in the
								// calendar opening immediately
								setTimeout( function () {
									that._hide();
								}, 10 );
							}
							else {
								that._setCalander();
							}

							onChange();
						}
					}
					else {
						// Click anywhere else in the widget - return focus to the
						// input element
						that.dom.input.focus();
					}
				} );
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Private
		 */

		/**
		 * Compare the date part only of two dates - this is made super easy by the
		 * toDateString method!
		 *
		 * @param  {Date} a Date 1
		 * @param  {Date} b Date 2
		 * @private
		 */
		_compareDates: function( a, b ) {
			// Can't use toDateString as that converts to local time
			return this._dateToUtcString(a) === this._dateToUtcString(b);
		},

		/**
		 * When changing month, take account of the fact that some months don't have
		 * the same number of days. For example going from January to February you
		 * can have the 31st of Jan selected and just add a month since the date
		 * would still be 31, and thus drop you into March.
		 *
		 * @param  {Date} date  Date - will be modified
		 * @param  {integer} month Month to set
		 * @private
		 */
		_correctMonth: function ( date, month ) {
			var days = this._daysInMonth( date.getUTCFullYear(), month );
			var correctDays = date.getUTCDate() > days;

			date.setUTCMonth( month );

			if ( correctDays ) {
				date.setUTCDate( days );
				date.setUTCMonth( month );
			}
		},

		/**
		 * Get the number of days in a method. Based on
		 * http://stackoverflow.com/a/4881951 by Matti Virkkunen
		 *
		 * @param  {integer} year  Year
		 * @param  {integer} month Month (starting at 0)
		 * @private
		 */
		_daysInMonth: function ( year, month ) {
			// 
			var isLeap = ((year % 4) === 0 && ((year % 100) !== 0 || (year % 400) === 0));
			var months = [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			return months[month];
		},

		/**
		 * Create a new date object which has the UTC values set to the local time.
		 * This allows the local time to be used directly for the library which
		 * always bases its calculations and display on UTC.
		 *
		 * @param  {Date} s Date to "convert"
		 * @return {Date}   Shifted date
		 */
		_dateToUtc: function ( s ) {
			return new Date( Date.UTC(
				s.getFullYear(), s.getMonth(), s.getDate(),
				s.getHours(), s.getMinutes(), s.getSeconds()
			) );
		},

		/**
		 * Create a UTC ISO8601 date part from a date object
		 *
		 * @param  {Date} d Date to "convert"
		 * @return {string} ISO formatted date
		 */
		_dateToUtcString: function ( d ) {
			return d.getUTCFullYear()+'-'+
				this._pad(d.getUTCMonth()+1)+'-'+
				this._pad(d.getUTCDate());
		},

		/**
		 * Hide the control and remove events related to its display
		 *
		 * @private
		 */
		_hide: function (destroy) {
			if (! destroy && this.dom.input.attr('type') === 'hidden') {
				return;
			}

			var namespace = this.s.namespace;

			this.dom.container.detach();

			$(window).off( '.'+namespace );
			$(document).off( 'keydown.'+namespace );
			$('div.dataTables_scrollBody').off( 'scroll.'+namespace );
			$('div.DTE_Body_Content').off( 'scroll.'+namespace );
			$('body').off( 'click.'+namespace );
		},

		/**
		 * Convert a 24 hour value to a 12 hour value
		 *
		 * @param  {integer} val 24 hour value
		 * @return {integer}     12 hour value
		 * @private
		 */
		_hours24To12: function ( val ) {
			return val === 0 ?
				12 :
				val > 12 ?
					val - 12 :
					val;
		},

		/**
		 * Generate the HTML for a single day in the calendar - this is basically
		 * and HTML cell with a button that has data attributes so we know what was
		 * clicked on (if it is clicked on) and a bunch of classes for styling.
		 *
		 * @param  {object} day Day object from the `_htmlMonth` method
		 * @return {string}     HTML cell
		 */
		_htmlDay: function( day )
		{
			if ( day.empty ) {
				return '<td class="empty"></td>';
			}

			var classes = [ 'selectable' ];
			var classPrefix = this.c.classPrefix;

			if ( day.disabled ) {
				classes.push( 'disabled' );
			}

			if ( day.today ) {
				classes.push( 'now' );
			}

			if ( day.selected ) {
				classes.push( 'selected' );
			}

			return '<td data-day="' + day.day + '" class="' + classes.join(' ') + '">' +
					'<button class="'+classPrefix+'-button '+classPrefix+'-day" type="button" ' +'data-year="' + day.year + '" data-month="' + day.month + '" data-day="' + day.day + '">' +
						'<span>'+day.day+'</span>'+
					'</button>' +
				'</td>';
		},


		/**
		 * Create the HTML for a month to be displayed in the calendar table.
		 * 
		 * Based upon the logic used in Pikaday - MIT licensed
		 * Copyright (c) 2014 David Bushell
		 * https://github.com/dbushell/Pikaday
		 *
		 * @param  {integer} year  Year
		 * @param  {integer} month Month (starting at 0)
		 * @return {string} Calendar month HTML
		 * @private
		 */
		_htmlMonth: function ( year, month ) {
			var now    = this._dateToUtc( new Date() ),
				days   = this._daysInMonth( year, month ),
				before = new Date( Date.UTC(year, month, 1) ).getUTCDay(),
				data   = [],
				row    = [];

			if ( this.c.firstDay > 0 ) {
				before -= this.c.firstDay;

				if (before < 0) {
					before += 7;
				}
			}

			var cells = days + before,
				after = cells;

			while ( after > 7 ) {
				after -= 7;
			}

			cells += 7 - after;

			var minDate = this.c.minDate;
			var maxDate = this.c.maxDate;

			if ( minDate ) {
				minDate.setUTCHours(0);
				minDate.setUTCMinutes(0);
				minDate.setSeconds(0);
			}

			if ( maxDate ) {
				maxDate.setUTCHours(23);
				maxDate.setUTCMinutes(59);
				maxDate.setSeconds(59);
			}

			for ( var i=0, r=0 ; i<cells ; i++ ) {
				var day      = new Date( Date.UTC(year, month, 1 + (i - before)) ),
					selected = this.s.d ? this._compareDates(day, this.s.d) : false,
					today    = this._compareDates(day, now),
					empty    = i < before || i >= (days + before),
					disabled = (minDate && day < minDate) ||
					           (maxDate && day > maxDate);

				var disableDays = this.c.disableDays;
				if ( Array.isArray( disableDays ) && $.inArray( day.getUTCDay(), disableDays ) !== -1 ) {
					disabled = true;
				}
				else if ( typeof disableDays === 'function' && disableDays( day ) === true ) {
					disabled = true;
				}

				var dayConfig = {
					day:      1 + (i - before),
					month:    month,
					year:     year,
					selected: selected,
					today:    today,
					disabled: disabled,
					empty:    empty
				};

				row.push( this._htmlDay(dayConfig) );

				if ( ++r === 7 ) {
					if ( this.c.showWeekNumber ) {
						row.unshift( this._htmlWeekOfYear(i - before, month, year) );
					}

					data.push( '<tr>'+row.join('')+'</tr>' );
					row = [];
					r = 0;
				}
			}

			var classPrefix = this.c.classPrefix;
			var className = classPrefix+'-table';
			if ( this.c.showWeekNumber ) {
				className += ' weekNumber';
			}

			// Show / hide month icons based on min/max
			if ( minDate ) {
				var underMin = minDate >= new Date( Date.UTC(year, month, 1, 0, 0, 0 ) );

				this.dom.title.find('div.'+classPrefix+'-iconLeft')
					.css( 'display', underMin ? 'none' : 'block' );
			}

			if ( maxDate ) {
				var overMax = maxDate < new Date( Date.UTC(year, month+1, 1, 0, 0, 0 ) );

				this.dom.title.find('div.'+classPrefix+'-iconRight')
					.css( 'display', overMax ? 'none' : 'block' );
			}

			return '<table class="'+className+'">' +
					'<thead>'+
						this._htmlMonthHead() +
					'</thead>'+
					'<tbody>'+
						data.join('') +
					'</tbody>'+
				'</table>';
		},

		/**
		 * Create the calendar table's header (week days)
		 *
		 * @return {string} HTML cells for the row
		 * @private
		 */
		_htmlMonthHead: function () {
			var a = [];
			var firstDay = this.c.firstDay;
			var i18n = this.c.i18n;

			// Take account of the first day shift
			var dayName = function ( day ) {
				day += firstDay;

				while (day >= 7) {
					day -= 7;
				}

				return i18n.weekdays[day];
			};
			
			// Empty cell in the header
			if ( this.c.showWeekNumber ) {
				a.push( '<th></th>' );
			}

			for ( var i=0 ; i<7 ; i++ ) {
				a.push( '<th>'+dayName( i )+'</th>' );
			}

			return a.join('');
		},

		/**
		 * Create a cell that contains week of the year - ISO8601
		 *
		 * Based on https://stackoverflow.com/questions/6117814/ and
		 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/
		 *
		 * @param  {integer} d Day of month
		 * @param  {integer} m Month of year (zero index)
		 * @param  {integer} y Year
		 * @return {string}   
		 * @private
		 */
		_htmlWeekOfYear: function ( d, m, y ) {
			var date = new Date( y, m, d, 0, 0, 0, 0 );

			// First week of the year always has 4th January in it
			date.setDate( date.getDate() + 4 - (date.getDay() || 7) );

			var oneJan = new Date( y, 0, 1 );
			var weekNum = Math.ceil( ( ( (date - oneJan) / 86400000) + 1)/7 );

			return '<td class="'+this.c.classPrefix+'-week">' + weekNum + '</td>';
		},

		/**
		 * Create option elements from a range in an array
		 *
		 * @param  {string} selector Class name unique to the select element to use
		 * @param  {array} values   Array of values
		 * @param  {array} [labels] Array of labels. If given must be the same
		 *   length as the values parameter.
		 * @private
		 */
		_options: function ( selector, values, labels ) {
			if ( ! labels ) {
				labels = values;
			}

			var select = this.dom.container.find('select.'+this.c.classPrefix+'-'+selector);
			select.empty();

			for ( var i=0, ien=values.length ; i<ien ; i++ ) {
				select.append( '<option value="'+values[i]+'">'+labels[i]+'</option>' );
			}
		},

		/**
		 * Set an option and update the option's span pair (since the select element
		 * has opacity 0 for styling)
		 *
		 * @param  {string} selector Class name unique to the select element to use
		 * @param  {*}      val      Value to set
		 * @private
		 */
		_optionSet: function ( selector, val ) {
			var select = this.dom.container.find('select.'+this.c.classPrefix+'-'+selector);
			var span = select.parent().children('span');

			select.val( val );

			var selected = select.find('option:selected');
			span.html( selected.length !== 0 ?
				selected.text() :
				this.c.i18n.unknown
			);
		},

		/**
		 * Create time options list.
		 *
		 * @param  {string} unit Time unit - hours, minutes or seconds
		 * @param  {integer} count Count range - 12, 24 or 60
		 * @param  {integer} val Existing value for this unit
		 * @param  {integer[]} allowed Values allow for selection
		 * @param  {integer} range Override range
		 * @private
		 */
		_optionsTime: function ( unit, count, val, allowed, range ) {
			var classPrefix = this.c.classPrefix;
			var container = this.dom.container.find('div.'+classPrefix+'-'+unit);
			var i, j;
			var render = count === 12 ?
				function (i) { return i; } :
				this._pad;
			var classPrefix = this.c.classPrefix;
			var className = classPrefix+'-table';
			var i18n = this.c.i18n;

			if ( ! container.length ) {
				return;
			}

			var a = '';
			var span = 10;
			var button = function (value, label, className) {
				// Shift the value for PM
				if ( count === 12 && typeof value === 'number' ) {
					if (val >= 12 ) {
						value += 12;
					}

					if (value == 12) {
						value = 0;
					}
					else if (value == 24) {
						value = 12;
					}
				}

				var selected = val === value || (value === 'am' && val < 12) || (value === 'pm' && val >= 12) ?
					'selected' :
					'';
				
				if (allowed && $.inArray(value, allowed) === -1) {
					selected += ' disabled';
				}

				if ( className ) {
					selected += ' '+className;
				}

				return '<td class="selectable '+selected+'">' +
					'<button class="'+classPrefix+'-button '+classPrefix+'-day" type="button" data-unit="'+unit+'" data-value="'+value+ '">' +
						'<span>'+label+'</span>'+
					'</button>' +
				'</td>';
			};

			if ( count === 12 ) {
				// Hours with AM/PM
				a += '<tr>';
				
				for ( i=1 ; i<=6 ; i++ ) {
					a += button(i, render(i));
				}
				a += button('am', i18n.amPm[0]);

				a += '</tr>';
				a += '<tr>';

				for ( i=7 ; i<=12 ; i++ ) {
					a += button(i, render(i));
				}
				a += button('pm', i18n.amPm[1]);
				a += '</tr>';

				span = 7;
			}
			else if ( count === 24 ) {
				// Hours - 24
				var c = 0;
				for (j=0 ; j<4 ; j++ ) {
					a += '<tr>';
					for ( i=0 ; i<6 ; i++ ) {
						a += button(c, render(c));
						c++;
					}
					a += '</tr>';
				}

				span = 6;
			}
			else {
				// Minutes and seconds
				a += '<tr>';
				for (j=0 ; j<60 ; j+=10 ) {
					a += button(j, render(j), 'range');
				}
				a += '</tr>';
				
				// Slight hack to allow for the different number of columns
				a += '</tbody></thead><table class="'+className+' '+className+'-nospace"><tbody>';

				var start = range !== null ?
					range :
					Math.floor( val / 10 )*10;

				a += '<tr>';
				for (j=start+1 ; j<start+10 ; j++ ) {
					a += button(j, render(j));
				}
				a += '</tr>';

				span = 6;
			}

			container
				.empty()
				.append(
					'<table class="'+className+'">'+
						'<thead><tr><th colspan="'+span+'">'+
							i18n[unit] +
						'</th></tr></thead>'+
						'<tbody>'+
							a+
						'</tbody>'+
					'</table>'
				);
		},

		/**
		 * Create the options for the month and year
		 *
		 * @param  {integer} year  Year
		 * @param  {integer} month Month (starting at 0)
		 * @private
		 */
		_optionsTitle: function () {
			var i18n = this.c.i18n;
			var min = this.c.minDate;
			var max = this.c.maxDate;
			var minYear = min ? min.getFullYear() : null;
			var maxYear = max ? max.getFullYear() : null;

			var i = minYear !== null ? minYear : new Date().getFullYear() - this.c.yearRange;
			var j = maxYear !== null ? maxYear : new Date().getFullYear() + this.c.yearRange;

			this._options( 'month', this._range( 0, 11 ), i18n.months );
			this._options( 'year', this._range( i, j ) );
		},

		/**
		 * Simple two digit pad
		 *
		 * @param  {integer} i      Value that might need padding
		 * @return {string|integer} Padded value
		 * @private
		 */
		_pad: function ( i ) {
			return i<10 ? '0'+i : i;
		},

		/**
		 * Position the calendar to look attached to the input element
		 * @private
		 */
		_position: function () {
			var offset = this.c.attachTo === 'input' ? this.dom.input.position() : this.dom.input.offset();
			var container = this.dom.container;
			var inputHeight = this.dom.input.outerHeight();

			if (container.hasClass('inline')) {
				container.insertAfter( this.dom.input );
				return;
			}

			if ( this.s.parts.date && this.s.parts.time && $(window).width() > 550 ) {
				container.addClass('horizontal');
			}
			else {
				container.removeClass('horizontal');
			}

			if(this.c.attachTo === 'input') {
				container
					.css( {
						top: offset.top + inputHeight,
						left: offset.left
					} )
					.insertAfter( this.dom.input );
			}
			else {
				container
					.css( {
						top: offset.top + inputHeight,
						left: offset.left
					} )
					.appendTo( 'body' );
			}

			var calHeight = container.outerHeight();
			var calWidth = container.outerWidth();
			var scrollTop = $(window).scrollTop();

			// Correct to the bottom
			if ( offset.top + inputHeight + calHeight - scrollTop > $(window).height() ) {
				var newTop = offset.top - calHeight;

				container.css( 'top', newTop < 0 ? 0 : newTop );
			}

			// Correct to the right
			if ( calWidth + offset.left > $(window).width() ) {
				var newLeft = $(window).width() - calWidth;

				// Account for elements which are inside a position absolute element
				if (this.c.attachTo === 'input') {
					newLeft -= $(container).offsetParent().offset().left;
				}

				container.css( 'left', newLeft < 0 ? 0 : newLeft );
			}
		},

		/**
		 * Create a simple array with a range of values
		 *
		 * @param  {integer} start   Start value (inclusive)
		 * @param  {integer} end     End value (inclusive)
		 * @param  {integer} [inc=1] Increment value
		 * @return {array}           Created array
		 * @private
		 */
		_range: function ( start, end, inc ) {
			var a = [];

			if ( ! inc ) {
				inc = 1;
			}

			for ( var i=start ; i<=end ; i+=inc ) {
				a.push( i );
			}

			return a;
		},

		/**
		 * Redraw the calendar based on the display date - this is a destructive
		 * operation
		 *
		 * @private
		 */
		_setCalander: function () {
			if ( this.s.display ) {
				this.dom.calendar
					.empty()
					.append( this._htmlMonth(
						this.s.display.getUTCFullYear(),
						this.s.display.getUTCMonth()
					) );
			}
		},

		/**
		 * Set the month and year for the calendar based on the current display date
		 *
		 * @private
		 */
		_setTitle: function () {
			this._optionSet( 'month', this.s.display.getUTCMonth() );
			this._optionSet( 'year', this.s.display.getUTCFullYear() );
		},

		/**
		 * Set the time based on the current value of the widget
		 *
		 * @private
		 */
		_setTime: function () {
			var that = this;
			var d = this.s.d;
			var hours = d ? d.getUTCHours() : 0;
			var allowed = function ( prop ) { // Backwards compt with `Increment` option
				return that.c[prop+'Available'] ?
					that.c[prop+'Available'] :
					that._range( 0, 59, that.c[prop+'Increment'] );
			};

			this._optionsTime( 'hours', this.s.parts.hours12 ? 12 : 24, hours, this.c.hoursAvailable );
			this._optionsTime( 'minutes', 60, d ? d.getUTCMinutes() : 0, allowed('minutes'), this.s.minutesRange );
			this._optionsTime( 'seconds', 60, d ? d.getSeconds() : 0, allowed('seconds'), this.s.secondsRange );
		},

		/**
		 * Show the widget and add events to the document required only while it
		 * is displayed
		 * 
		 * @private
		 */
		_show: function () {
			var that = this;
			var namespace = this.s.namespace;

			this._position();

			// Need to reposition on scroll
			$(window).on( 'scroll.'+namespace+' resize.'+namespace, function () {
				that._hide();
			} );

			$('div.DTE_Body_Content').on( 'scroll.'+namespace, function () {
				that._hide();
			} );

			$('div.dataTables_scrollBody').on( 'scroll.'+namespace, function () {
				that._hide();
			} );

			var offsetParent = this.dom.input[0].offsetParent;

			if ( offsetParent !== document.body ) {
				$(offsetParent).on( 'scroll.'+namespace, function () {
					that._hide();
				} );
			}

			// On tab focus will move to a different field (no keyboard navigation
			// in the date picker - this might need to be changed).
			$(document).on( 'keydown.'+namespace, function (e) {
				if (
					e.keyCode === 9  || // tab
					e.keyCode === 27 || // esc
					e.keyCode === 13    // return
				) {
					that._hide();
				}
			} );

			// Hide if clicking outside of the widget - but in a different click
			// event from the one that was used to trigger the show (bubble and
			// inline)
			setTimeout( function () {
				$('body').on( 'click.'+namespace, function (e) {
					var parents = $(e.target).parents();

					if ( ! parents.filter( that.dom.container ).length && e.target !== that.dom.input[0] ) {
						that._hide();
					}
				} );
			}, 10 );
		},

		/**
		 * Write the formatted string to the input element this control is attached
		 * to
		 *
		 * @private
		 */
		_writeOutput: function ( focus ) {
			var date = this.s.d;

			// Use moment or dayjs if possible - otherwise it must be ISO8601 (or the
			// constructor would have thrown an error)
			var out = dateLib ?
				dateLib.utc( date, undefined$1, this.c.locale, this.c.strict ).format( this.c.format ) :
				date.getUTCFullYear() +'-'+
					this._pad(date.getUTCMonth() + 1) +'-'+
					this._pad(date.getUTCDate());

				this.dom.input
					.val( out )
					.trigger('change', {write: date});
			
			if ( this.dom.input.attr('type') === 'hidden' ) {
				this.val(out, false);
			}

			if ( focus ) {
				this.dom.input.focus();
			}
		}
	} );

	/**
	 * Use a specificmoment compatible date library
	 */
	DateTime.use = function (lib) {
		dateLib = lib;
	};

	/**
	 * For generating unique namespaces
	 *
	 * @type {Number}
	 * @private
	 */
	DateTime._instance = 0;

	/**
	 * Defaults for the date time picker
	 *
	 * @type {Object}
	 */
	DateTime.defaults = {
		attachTo: 'body',

		// Not documented - could be an internal property
		classPrefix: 'dt-datetime',

		// function or array of ints
		disableDays: null,

		// first day of the week (0: Sunday, 1: Monday, etc)
		firstDay: 1,

		format: 'YYYY-MM-DD',

		hoursAvailable: null,

		i18n: {
			previous: 'Previous',
			next:     'Next',
			months:   [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
			weekdays: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
			amPm:     [ 'am', 'pm' ],
			hours:    'Hour',
			minutes:  'Minute',
			seconds:  'Second',
			unknown:  '-'
		},

		maxDate: null,

		minDate: null,

		minutesAvailable: null,

		minutesIncrement: 1, // deprecated

		strict: true,

		locale: 'en',

		onChange: function () {},

		secondsAvailable: null,

		secondsIncrement: 1, // deprecated

		// show the ISO week number at the head of the row
		showWeekNumber: false,

		// overruled by max / min date
		yearRange: 25
	};

	DateTime.version = '1.0.1';

	// Global export - if no conflicts
	if (! window.DateTime) {
		window.DateTime = DateTime;
	}

	// Make available via jQuery
	$.fn.dtDateTime = function (options) {
		return this.each(function() {
			new DateTime(this, options);
		});
	};

	// Attach to DataTables if present
	if ($.fn.dataTable) {
		$.fn.dataTable.DateTime = DateTime;
		$.fn.DataTable.DateTime = DateTime;
	}

	return DateTime;

	}));

	var $;
	var DataTable;
	var moment = window.moment;
	/**
	 * Sets the value of jQuery for use in the file
	 * @param jq the instance of jQuery to be set
	 */
	function setJQuery(jq) {
	    $ = jq;
	    DataTable = jq.fn.dataTable;
	}
	/**
	 * The Criteria class is used within SearchBuilder to represent a search criteria
	 */
	var Criteria = /** @class */ (function () {
	    function Criteria(table, opts, topGroup, index, depth) {
	        var _this = this;
	        if (index === void 0) { index = 0; }
	        if (depth === void 0) { depth = 1; }
	        // Check that the required version of DataTables is included
	        if (!DataTable || !DataTable.versionCheck || !DataTable.versionCheck('1.10.0')) {
	            throw new Error('SearchPane requires DataTables 1.10 or newer');
	        }
	        this.classes = $.extend(true, {}, Criteria.classes);
	        // Get options from user and any extra conditions/column types defined by plug-ins
	        this.c = $.extend(true, {}, Criteria.defaults, $.fn.dataTable.ext.searchBuilder, opts);
	        var i18n = this.c.i18n;
	        this.s = {
	            condition: undefined,
	            conditions: {},
	            data: undefined,
	            dataIdx: -1,
	            dataPoints: [],
	            depth: depth,
	            dt: table,
	            filled: false,
	            index: index,
	            momentFormat: false,
	            topGroup: topGroup,
	            type: '',
	            value: []
	        };
	        this.dom = {
	            buttons: $('<div/>')
	                .addClass(this.classes.buttonContainer),
	            condition: $('<select disabled/>')
	                .addClass(this.classes.condition)
	                .addClass(this.classes.dropDown)
	                .addClass(this.classes.italic)
	                .attr('autocomplete', 'hacking'),
	            conditionTitle: $('<option value="" disabled selected hidden/>')
	                .text(this.s.dt.i18n('searchBuilder.condition', i18n.condition)),
	            container: $('<div/>')
	                .addClass(this.classes.container),
	            data: $('<select/>')
	                .addClass(this.classes.data)
	                .addClass(this.classes.dropDown)
	                .addClass(this.classes.italic),
	            dataTitle: $('<option value="" disabled selected hidden/>')
	                .text(this.s.dt.i18n('searchBuilder.data', i18n.data)),
	            defaultValue: $('<select disabled/>')
	                .addClass(this.classes.value)
	                .addClass(this.classes.dropDown),
	            "delete": $('<button>&times</button>')
	                .addClass(this.classes["delete"])
	                .addClass(this.classes.button)
	                .attr('title', this.s.dt.i18n('searchBuilder.deleteTitle', i18n.deleteTitle))
	                .attr('type', 'button'),
	            left: $('<button>\<</button>')
	                .addClass(this.classes.left)
	                .addClass(this.classes.button)
	                .attr('title', this.s.dt.i18n('searchBuilder.leftTitle', i18n.leftTitle))
	                .attr('type', 'button'),
	            right: $('<button>\></button>')
	                .addClass(this.classes.right)
	                .addClass(this.classes.button)
	                .attr('title', this.s.dt.i18n('searchBuilder.rightTitle', i18n.rightTitle))
	                .attr('type', 'button'),
	            value: [
	                $('<select disabled/>').addClass(this.classes.value).addClass(this.classes.dropDown).addClass(this.classes.italic)
	            ],
	            valueTitle: $('<option value="--valueTitle--" selected/>').text(this.s.dt.i18n('searchBuilder.value', i18n.value))
	        };
	        // If the greyscale option is selected then add the class to add the grey colour to SearchBuilder
	        if (this.c.greyscale) {
	            $(this.dom.data).addClass(this.classes.greyscale);
	            $(this.dom.condition).addClass(this.classes.greyscale);
	            $(this.dom.defaultValue).addClass(this.classes.greyscale);
	            for (var _i = 0, _a = this.dom.value; _i < _a.length; _i++) {
	                var val = _a[_i];
	                $(val).addClass(this.classes.greyscale);
	            }
	        }
	        // For responsive design, adjust the criterias properties on the following events
	        this.s.dt.on('draw.dtsp', function () {
	            _this._adjustCriteria();
	        });
	        this.s.dt.on('buttons-action', function () {
	            _this._adjustCriteria();
	        });
	        $(window).on('resize.dtsp', DataTable.util.throttle(function () {
	            _this._adjustCriteria();
	        }));
	        this._buildCriteria();
	        return this;
	    }
	    /**
	     * Adds the left button to the criteria
	     */
	    Criteria.prototype.updateArrows = function (hasSiblings, redraw) {
	        if (hasSiblings === void 0) { hasSiblings = false; }
	        if (redraw === void 0) { redraw = true; }
	        // Empty the container and append all of the elements in the correct order
	        $(this.dom.container)
	            .empty()
	            .append(this.dom.data)
	            .append(this.dom.condition)
	            .append(this.dom.value[0]);
	        // Trigger the inserted events for the value elements as they are inserted
	        $(this.dom.value[0]).trigger('dtsb-inserted');
	        for (var i = 1; i < this.dom.value.length; i++) {
	            $(this.dom.container).append(this.dom.value[i]);
	            $(this.dom.value[i]).trigger('dtsb-inserted');
	        }
	        // If this is a top level criteria then don't let it move left
	        if (this.s.depth > 1) {
	            $(this.dom.buttons).append(this.dom.left);
	        }
	        // If the depthLimit of the query has been hit then don't add the right button
	        if ((this.c.depthLimit === false || this.s.depth < this.c.depthLimit) && hasSiblings) {
	            $(this.dom.buttons).append(this.dom.right);
	        }
	        else {
	            $(this.dom.right).remove();
	        }
	        $(this.dom.buttons).append(this.dom["delete"]);
	        $(this.dom.container).append(this.dom.buttons);
	        if (redraw) {
	            // A different combination of arrows and selectors may lead to a need for responsive to be triggered
	            this._adjustCriteria();
	        }
	    };
	    /**
	     * Destroys the criteria, removing listeners and container from the dom
	     */
	    Criteria.prototype.destroy = function () {
	        // Turn off listeners
	        $(this.dom.data).off('.dtsb');
	        $(this.dom.condition).off('.dtsb');
	        $(this.dom["delete"]).off('.dtsb');
	        for (var _i = 0, _a = this.dom.value; _i < _a.length; _i++) {
	            var val = _a[_i];
	            $(val).off('.dtsb');
	        }
	        // Remove container from the dom
	        $(this.dom.container).remove();
	    };
	    /**
	     * Passes in the data for the row and compares it against this single criteria
	     * @param rowData The data for the row to be compared
	     * @returns boolean Whether the criteria has passed
	     */
	    Criteria.prototype.search = function (rowData, rowIdx) {
	        var condition = this.s.conditions[this.s.condition];
	        if (this.s.condition !== undefined && condition !== undefined) {
	            // This check is in place for if a custom decimal character is in place
	            if (this.s.type.indexOf('num') !== -1 && this.s.dt.settings()[0].oLanguage.sDecimal !== '') {
	                rowData[this.s.dataIdx] = rowData[this.s.dataIdx].replace(this.s.dt.settings()[0].oLanguage.sDecimal, '.');
	            }
	            var filter = rowData[this.s.dataIdx];
	            // If orthogonal data is in place we need to get it's values for searching
	            if (this.c.orthogonal.search !== 'search') {
	                var settings = this.s.dt.settings()[0];
	                filter = settings.oApi._fnGetCellData(settings, rowIdx, this.s.dataIdx, typeof this.c.orthogonal === 'string' ?
	                    this.c.orthogonal :
	                    this.c.orthogonal.search);
	            }
	            if (this.s.type === 'array') {
	                // Make sure we are working with an array
	                if (!Array.isArray(filter)) {
	                    filter = [filter];
	                }
	                filter.sort();
	            }
	            return condition.search(filter, this.s.value, this);
	        }
	    };
	    /**
	     * Gets the details required to rebuild the criteria
	     */
	    Criteria.prototype.getDetails = function () {
	        var value = this.s.value;
	        // This check is in place for if a custom decimal character is in place
	        if (this.s.type.indexOf('num') !== -1 && this.s.dt.settings()[0].oLanguage.sDecimal !== '') {
	            for (var i = 0; i < this.s.value.length; i++) {
	                if (this.s.value[i].indexOf('.') !== -1) {
	                    value[i] = this.s.value[i].replace('.', this.s.dt.settings()[0].oLanguage.sDecimal);
	                }
	            }
	        }
	        return {
	            condition: this.s.condition,
	            data: this.s.data,
	            value: value
	        };
	    };
	    /**
	     * Getter for the node for the container of the criteria
	     * @returns JQuery<HTMLElement> the node for the container
	     */
	    Criteria.prototype.getNode = function () {
	        return this.dom.container;
	    };
	    /**
	     * Populates the criteria data, condition and value(s) as far as has been selected
	     */
	    Criteria.prototype.populate = function () {
	        this._populateData();
	        // If the column index has been found attempt to select a condition
	        if (this.s.dataIdx !== -1) {
	            this._populateCondition();
	            // If the condittion has been found attempt to select the values
	            if (this.s.condition !== undefined) {
	                this._populateValue();
	            }
	        }
	    };
	    /**
	     * Rebuilds the criteria based upon the details passed in
	     * @param loadedCriteria the details required to rebuild the criteria
	     */
	    Criteria.prototype.rebuild = function (loadedCriteria) {
	        // Check to see if the previously selected data exists, if so select it
	        var foundData = false;
	        var dataIdx;
	        this._populateData();
	        // If a data selection has previously been made attempt to find and select it
	        if (loadedCriteria.data !== undefined) {
	            var italic_1 = this.classes.italic;
	            var data_1 = this.dom.data;
	            $(this.dom.data).children('option').each(function () {
	                if ($(this).text() === loadedCriteria.data) {
	                    $(this).attr('selected', true);
	                    $(data_1).removeClass(italic_1);
	                    foundData = true;
	                    dataIdx = $(this).val();
	                }
	            });
	        }
	        // If the data has been found and selected then the condition can be populated and searched
	        if (foundData) {
	            this.s.data = loadedCriteria.data;
	            this.s.dataIdx = dataIdx;
	            $(this.dom.dataTitle).remove();
	            this._populateCondition();
	            $(this.dom.conditionTitle).remove();
	            var condition_1;
	            // Check to see if the previously selected condition exists, if so select it
	            $(this.dom.condition).children('option').each(function () {
	                if ((loadedCriteria.condition !== undefined &&
	                    $(this).val() === loadedCriteria.condition &&
	                    typeof loadedCriteria.condition === 'string')) {
	                    $(this).attr('selected', true);
	                    condition_1 = $(this).val();
	                }
	            });
	            this.s.condition = condition_1;
	            // If the condition has been found and selected then the value can be populated and searched
	            if (this.s.condition !== undefined) {
	                $(this.dom.conditionTitle).remove();
	                $(this.dom.condition).removeClass(this.classes.italic);
	                this._populateValue(loadedCriteria);
	            }
	            else {
	                $(this.dom.conditionTitle).prependTo(this.dom.condition).attr('selected', true);
	            }
	        }
	    };
	    /**
	     * Sets the listeners for the criteria
	     */
	    Criteria.prototype.setListeners = function () {
	        var _this = this;
	        $(this.dom.data)
	            .unbind('input change')
	            .on('input change', function () {
	            $(_this.dom.dataTitle).attr('selected', false);
	            $(_this.dom.data).removeClass(_this.classes.italic);
	            _this.s.dataIdx = $(_this.dom.data).children('option:selected').val();
	            _this.s.data = $(_this.dom.data).children('option:selected').text();
	            _this.c.orthogonal = _this._getOptions().orthogonal;
	            // When the data is changed, the values in condition and value may also change so need to renew them
	            _this._clearCondition();
	            _this._clearValue();
	            _this._populateCondition();
	            // If this criteria was previously active in the search then remove it from the search and trigger a new search
	            if (_this.s.filled) {
	                _this.s.filled = false;
	                _this.s.dt.draw();
	                _this.setListeners();
	            }
	            _this.s.dt.state.save();
	        });
	        $(this.dom.condition)
	            .unbind('input change')
	            .on('input change', function () {
	            $(_this.dom.conditionTitle).attr('selected', false);
	            $(_this.dom.condition).removeClass(_this.classes.italic);
	            var condDisp = $(_this.dom.condition).children('option:selected').val();
	            // Find the condition that has been selected and store it internally
	            for (var _i = 0, _a = Object.keys(_this.s.conditions); _i < _a.length; _i++) {
	                var cond = _a[_i];
	                if (cond === condDisp) {
	                    _this.s.condition = condDisp;
	                    break;
	                }
	            }
	            // When the condition is changed, the value selector may switch between a select element and an input element
	            _this._clearValue();
	            _this._populateValue();
	            for (var _b = 0, _c = _this.dom.value; _b < _c.length; _b++) {
	                var val = _c[_b];
	                // If this criteria was previously active in the search then remove it from the search and trigger a new search
	                if (_this.s.filled && $(_this.dom.container).has(val).length !== 0) {
	                    _this.s.filled = false;
	                    _this.s.dt.draw();
	                    _this.setListeners();
	                }
	            }
	            _this.s.dt.draw();
	        });
	    };
	    /**
	     * Adjusts the criteria to make SearchBuilder responsive
	     */
	    Criteria.prototype._adjustCriteria = function () {
	        // If this criteria is not present then don't bother adjusting it
	        if ($(document).has(this.dom.container).length === 0) {
	            return;
	        }
	        var valRight;
	        var valWidth;
	        var outmostval = this.dom.value[this.dom.value.length - 1];
	        // Calculate the width and right value of the outmost value element
	        if ($(this.dom.container).has(outmostval).length !== 0) {
	            valWidth = $(outmostval).outerWidth(true);
	            valRight = $(outmostval).offset().left + valWidth;
	        }
	        else {
	            return;
	        }
	        var leftOffset = $(this.dom.left).offset();
	        var rightOffset = $(this.dom.right).offset();
	        var clearOffset = $(this.dom["delete"]).offset();
	        var hasLeft = $(this.dom.container).has(this.dom.left).length !== 0;
	        var hasRight = $(this.dom.container).has(this.dom.right).length !== 0;
	        var buttonsLeft = hasLeft ?
	            leftOffset.left :
	            hasRight ?
	                rightOffset.left :
	                clearOffset.left;
	        // Perform the responsive calculations and redraw where necessary
	        if (buttonsLeft - valRight < 15 ||
	            (hasLeft && leftOffset.top !== clearOffset.top) ||
	            (hasRight && rightOffset.top !== clearOffset.top)) {
	            $(this.dom.container).parent().addClass(this.classes.vertical);
	            $(this.s.topGroup).trigger('dtsb-redrawContents');
	        }
	        else if (buttonsLeft -
	            ($(this.dom.data).offset().left +
	                $(this.dom.data).outerWidth(true) +
	                $(this.dom.condition).outerWidth(true) +
	                valWidth) > 15) {
	            $(this.dom.container).parent().removeClass(this.classes.vertical);
	            $(this.s.topGroup).trigger('dtsb-redrawContents');
	        }
	    };
	    /**
	     * Builds the elements of the dom together
	     */
	    Criteria.prototype._buildCriteria = function () {
	        // Append Titles for select elements
	        $(this.dom.data).append(this.dom.dataTitle);
	        $(this.dom.condition).append(this.dom.conditionTitle);
	        // Add elements to container
	        $(this.dom.container)
	            .append(this.dom.data)
	            .append(this.dom.condition);
	        for (var _i = 0, _a = this.dom.value; _i < _a.length; _i++) {
	            var val = _a[_i];
	            $(val).append(this.dom.valueTitle);
	            $(this.dom.container).append(val);
	        }
	        // Add buttons to container
	        $(this.dom.container)
	            .append(this.dom["delete"])
	            .append(this.dom.right);
	        this.setListeners();
	    };
	    /**
	     * Clears the condition select element
	     */
	    Criteria.prototype._clearCondition = function () {
	        $(this.dom.condition).empty();
	        $(this.dom.conditionTitle).attr('selected', true).attr('disabled', true);
	        $(this.dom.condition).prepend(this.dom.conditionTitle).prop('selectedIndex', 0);
	        this.s.conditions = {};
	        this.s.condition = undefined;
	    };
	    /**
	     * Clears the value elements
	     */
	    Criteria.prototype._clearValue = function () {
	        if (this.s.condition !== undefined) {
	            // Remove all of the value elements
	            for (var _i = 0, _a = this.dom.value; _i < _a.length; _i++) {
	                var val = _a[_i];
	                $(val).remove();
	            }
	            // Call the init function to get the value elements for this condition
	            this.dom.value = [].concat(this.s.conditions[this.s.condition].init(this, Criteria.updateListener));
	            $(this.dom.value[0]).insertAfter(this.dom.condition).trigger('dtsb-inserted');
	            // Insert all of the value elements
	            for (var i = 1; i < this.dom.value.length; i++) {
	                $(this.dom.value[i]).insertAfter(this.dom.value[i - 1]).trigger('dtsb-inserted');
	            }
	        }
	        else {
	            // Remove all of the value elements
	            for (var _b = 0, _c = this.dom.value; _b < _c.length; _b++) {
	                var val = _c[_b];
	                $(val).remove();
	            }
	            // Append the default valueTitle to the default select element
	            $(this.dom.valueTitle)
	                .attr('selected', true);
	            $(this.dom.defaultValue)
	                .append(this.dom.valueTitle)
	                .insertAfter(this.dom.condition);
	        }
	        this.s.value = [];
	    };
	    /**
	     * Gets the options for the column
	     * @returns {object} The options for the column
	     */
	    Criteria.prototype._getOptions = function () {
	        var table = this.s.dt;
	        return $.extend(true, {}, Criteria.defaults, table.settings()[0].aoColumns[this.s.dataIdx].searchBuilder);
	    };
	    /**
	     * Populates the condition dropdown
	     */
	    Criteria.prototype._populateCondition = function () {
	        var conditionOpts = [];
	        var conditionsLength = Object.keys(this.s.conditions).length;
	        // If there are no conditions stored then we need to get them from the appropriate type
	        if (conditionsLength === 0) {
	            var column = $(this.dom.data).children('option:selected').val();
	            this.s.type = this.s.dt.columns().type().toArray()[column];
	            // If the column type is unknown, call a draw to try reading it again
	            if (this.s.type === null) {
	                this.s.dt.draw();
	                this.setListeners();
	                this.s.type = this.s.dt.columns().type().toArray()[column];
	            }
	            // Enable the condition element
	            $(this.dom.condition)
	                .attr('disabled', false)
	                .empty()
	                .append(this.dom.conditionTitle)
	                .addClass(this.classes.italic);
	            $(this.dom.conditionTitle)
	                .attr('selected', true);
	            var decimal = this.s.dt.settings()[0].oLanguage.sDecimal;
	            // This check is in place for if a custom decimal character is in place
	            if (decimal !== '' && this.s.type.indexOf(decimal) === this.s.type.length - decimal.length) {
	                if (this.s.type.indexOf('num-fmt') !== -1) {
	                    this.s.type = this.s.type.replace(decimal, '');
	                }
	                else if (this.s.type.indexOf('num') !== -1) {
	                    this.s.type = this.s.type.replace(decimal, '');
	                }
	            }
	            // Select which conditions are going to be used based on the column type
	            var conditionObj = this.c.conditions[this.s.type] !== undefined ?
	                this.c.conditions[this.s.type] :
	                this.s.type.indexOf('moment') !== -1 ?
	                    this.c.conditions.moment :
	                    this.c.conditions.string;
	            // If it is a moment format then extract the date format
	            if (this.s.type.indexOf('moment') !== -1) {
	                this.s.momentFormat = this.s.type.replace(/moment\-/g, '');
	            }
	            // Add all of the conditions to the select element
	            for (var _i = 0, _a = Object.keys(conditionObj); _i < _a.length; _i++) {
	                var condition = _a[_i];
	                if (conditionObj[condition] !== null) {
	                    this.s.conditions[condition] = conditionObj[condition];
	                    var condName = conditionObj[condition].conditionName;
	                    if (typeof condName === 'function') {
	                        condName = condName(this.s.dt, this.c.i18n);
	                    }
	                    conditionOpts.push($('<option>', {
	                        text: condName,
	                        value: condition
	                    })
	                        .addClass(this.classes.option)
	                        .addClass(this.classes.notItalic));
	                }
	            }
	        }
	        // Otherwise we can just load them in
	        else if (conditionsLength > 0) {
	            $(this.dom.condition).empty().attr('disabled', false).addClass(this.classes.italic);
	            for (var _b = 0, _c = Object.keys(this.s.conditions); _b < _c.length; _b++) {
	                var condition = _c[_b];
	                var condName = this.s.conditions[condition].conditionName;
	                if (typeof condName === 'function') {
	                    condName = condName(this.s.dt, this.c.i18n);
	                }
	                var newOpt = $('<option>', {
	                    text: condName,
	                    value: condition
	                })
	                    .addClass(this.classes.option)
	                    .addClass(this.classes.notItalic);
	                if (this.s.condition !== undefined && this.s.condition === condName) {
	                    $(newOpt).attr('selected', true);
	                    $(this.dom.condition).removeClass(this.classes.italic);
	                }
	                conditionOpts.push(newOpt);
	            }
	        }
	        else {
	            $(this.dom.condition)
	                .attr('disabled', true)
	                .addClass(this.classes.italic);
	            return;
	        }
	        for (var _d = 0, conditionOpts_1 = conditionOpts; _d < conditionOpts_1.length; _d++) {
	            var opt = conditionOpts_1[_d];
	            $(this.dom.condition).append(opt);
	        }
	        $(this.dom.condition).prop('selectedIndex', 0);
	    };
	    /**
	     * Populates the data select element
	     */
	    Criteria.prototype._populateData = function () {
	        var _this = this;
	        $(this.dom.data).empty().append(this.dom.dataTitle);
	        // If there are no datas stored then we need to get them from the table
	        if (this.s.dataPoints.length === 0) {
	            this.s.dt.columns().every(function (index) {
	                // Need to check that the column can be filtered on before adding it
	                if (_this.c.columns === true ||
	                    (_this.s.dt.columns(_this.c.columns).indexes().toArray().indexOf(index) !== -1)) {
	                    var found = false;
	                    for (var _i = 0, _a = _this.s.dataPoints; _i < _a.length; _i++) {
	                        var val = _a[_i];
	                        if (val.index === index) {
	                            found = true;
	                            break;
	                        }
	                    }
	                    if (!found) {
	                        var opt = { text: _this.s.dt.settings()[0].aoColumns[index].sTitle, index: index };
	                        _this.s.dataPoints.push(opt);
	                        $(_this.dom.data).append($('<option>', {
	                            text: opt.text,
	                            value: opt.index
	                        })
	                            .addClass(_this.classes.option)
	                            .addClass(_this.classes.notItalic));
	                    }
	                }
	            });
	        }
	        // Otherwise we can just load them in
	        else {
	            var _loop_1 = function (data) {
	                this_1.s.dt.columns().every(function (index) {
	                    if (_this.s.dt.settings()[0].aoColumns[index].sTitle === data.text) {
	                        data.index = index;
	                    }
	                });
	                var newOpt = $('<option>', {
	                    text: data.text,
	                    value: data.index
	                })
	                    .addClass(this_1.classes.option)
	                    .addClass(this_1.classes.notItalic);
	                if (this_1.s.data === data.text) {
	                    this_1.s.dataIdx = data.index;
	                    $(newOpt).attr('selected', true);
	                    $(this_1.dom.data).removeClass(this_1.classes.italic);
	                }
	                $(this_1.dom.data).append(newOpt);
	            };
	            var this_1 = this;
	            for (var _i = 0, _a = this.s.dataPoints; _i < _a.length; _i++) {
	                var data = _a[_i];
	                _loop_1(data);
	            }
	        }
	    };
	    /**
	     * Populates the Value select element
	     * @param loadedCriteria optional, used to reload criteria from predefined filters
	     */
	    Criteria.prototype._populateValue = function (loadedCriteria) {
	        var _this = this;
	        var prevFilled = this.s.filled;
	        this.s.filled = false;
	        // Remove any previous value elements
	        $(this.dom.defaultValue).remove();
	        for (var _i = 0, _a = this.dom.value; _i < _a.length; _i++) {
	            var val = _a[_i];
	            $(val).remove();
	        }
	        var children = $(this.dom.container).children();
	        if (children.length > 3) {
	            for (var i = 2; i < children.length - 1; i++) {
	                $(children[i]).remove();
	            }
	        }
	        // Find the column with the title matching the data for the criteria and take note of the index
	        if (loadedCriteria !== undefined) {
	            this.s.dt.columns().every(function (index) {
	                if (_this.s.dt.settings()[0].aoColumns[index].sTitle === loadedCriteria.data) {
	                    _this.s.dataIdx = index;
	                }
	            });
	        }
	        // Initialise the value elements based on the condition
	        this.dom.value = [].concat(this.s.conditions[this.s.condition].init(this, Criteria.updateListener, loadedCriteria !== undefined ? loadedCriteria.value : undefined));
	        if (loadedCriteria !== undefined && loadedCriteria.value !== undefined) {
	            this.s.value = loadedCriteria.value;
	        }
	        // Insert value elements and trigger the inserted event
	        $(this.dom.value[0])
	            .insertAfter(this.dom.condition)
	            .trigger('dtsb-inserted');
	        for (var i = 1; i < this.dom.value.length; i++) {
	            $(this.dom.value[i])
	                .insertAfter(this.dom.value[i - 1])
	                .trigger('dtsb-inserted');
	        }
	        // Check if the criteria can be used in a search
	        this.s.filled = this.s.conditions[this.s.condition].isInputValid(this.dom.value, this);
	        this.setListeners();
	        // If it can and this is different to before then trigger a draw
	        if (prevFilled !== this.s.filled) {
	            this.s.dt.draw();
	            this.setListeners();
	        }
	    };
	    Criteria.version = '1.0.0';
	    Criteria.classes = {
	        button: 'dtsb-button',
	        buttonContainer: 'dtsb-buttonContainer',
	        condition: 'dtsb-condition',
	        container: 'dtsb-criteria',
	        data: 'dtsb-data',
	        "delete": 'dtsb-delete',
	        dropDown: 'dtsb-dropDown',
	        greyscale: 'dtsb-greyscale',
	        input: 'dtsb-input',
	        italic: 'dtsb-italic',
	        joiner: 'dtsp-joiner',
	        left: 'dtsb-left',
	        notItalic: 'dtsb-notItalic',
	        option: 'dtsb-option',
	        right: 'dtsb-right',
	        value: 'dtsb-value',
	        vertical: 'dtsb-vertical'
	    };
	    /**
	     * Default initialisation function for select conditions
	     */
	    Criteria.initSelect = function (that, fn, preDefined, array) {
	        if (preDefined === void 0) { preDefined = null; }
	        if (array === void 0) { array = false; }
	        var column = $(that.dom.data).children('option:selected').val();
	        var indexArray = that.s.dt.rows().indexes().toArray();
	        var settings = that.s.dt.settings()[0];
	        // Declare select element to be used with all of the default classes and listeners.
	        var el = $('<select/>')
	            .addClass(Criteria.classes.value)
	            .addClass(Criteria.classes.dropDown)
	            .addClass(Criteria.classes.italic)
	            .append(that.dom.valueTitle)
	            .on('input change', function () {
	            $(this).removeClass(Criteria.classes.italic);
	            fn(that, this);
	        });
	        if (that.c.greyscale) {
	            $(el).addClass(Criteria.classes.greyscale);
	        }
	        var added = [];
	        var options = [];
	        // Add all of the options from the table to the select element.
	        // Only add one option for each possible value
	        for (var _i = 0, indexArray_1 = indexArray; _i < indexArray_1.length; _i++) {
	            var index = indexArray_1[_i];
	            var filter = settings.oApi._fnGetCellData(settings, index, column, typeof that.c.orthogonal === 'string' ?
	                that.c.orthogonal :
	                that.c.orthogonal.search);
	            var value = {
	                filter: typeof filter === 'string' ?
	                    filter.replace(/[\r\n\u2028]/g, ' ') : // Need to replace certain characters to match the search values
	                    filter,
	                index: index,
	                text: settings.oApi._fnGetCellData(settings, index, column, typeof that.c.orthogonal === 'string' ?
	                    that.c.orthogonal :
	                    that.c.orthogonal.display)
	            };
	            // If we are dealing with an array type, either make sure we are working with arrays, or sort them
	            if (that.s.type === 'array') {
	                value.filter = !Array.isArray(value.filter) ?
	                    [value.filter] :
	                    value.filter = value.filter.sort();
	                value.text = !Array.isArray(value.text) ?
	                    [value.text] :
	                    value.text = value.text.sort();
	            }
	            // Function to add an option to the select element
	            var addOption = function (filt, text) {
	                // Add text and value, stripping out any html if that is the column type
	                var opt = $('<option>', {
	                    text: typeof text === 'string' ?
	                        text.replace(/(<([^>]+)>)/ig, '') :
	                        text,
	                    type: Array.isArray(filt) ? 'Array' : 'String',
	                    value: that.s.type.indexOf('html') !== -1 && filt !== null && typeof filt === 'string' ?
	                        filt.replace(/(<([^>]+)>)/ig, '') :
	                        filt
	                })
	                    .addClass(that.classes.option)
	                    .addClass(that.classes.notItalic);
	                var val = $(opt).val();
	                // Check that this value has not already been added
	                if (added.indexOf(val) === -1) {
	                    added.push(val);
	                    options.push(opt);
	                    if (preDefined !== null && Array.isArray(preDefined[0])) {
	                        preDefined[0] = preDefined[0].sort().join(',');
	                    }
	                    // If this value was previously selected as indicated by preDefined, then select it again
	                    if (preDefined !== null && opt.val() === preDefined[0]) {
	                        opt.attr('selected', true);
	                        $(el).removeClass(Criteria.classes.italic);
	                    }
	                }
	            };
	            // If this is to add the individual values within the array we need to loop over the array
	            if (array) {
	                for (var i = 0; i < value.filter.length; i++) {
	                    addOption(value.filter[i], value.text[i]);
	                }
	            }
	            // Otherwise the value that is in the cell is to be added
	            else {
	                addOption(value.filter, value.text);
	            }
	        }
	        options.sort(function (a, b) {
	            if (that.s.type === 'string' || that.s.type === 'num' || that.s.type === 'html' || that.s.type === 'html-num') {
	                if ($(a).val() < $(b).val()) {
	                    return -1;
	                }
	                else if ($(a).val() < $(b).val()) {
	                    return 1;
	                }
	                else {
	                    return 0;
	                }
	            }
	            else if (that.s.type === 'num-fmt' || that.s.type === 'html-num-fmt') {
	                if (+$(a).val().replace(/[^0-9.]/g, '') < +$(b).val().replace(/[^0-9.]/g, '')) {
	                    return -1;
	                }
	                else if (+$(a).val().replace(/[^0-9.]/g, '') < +$(b).val().replace(/[^0-9.]/g, '')) {
	                    return 1;
	                }
	                else {
	                    return 0;
	                }
	            }
	        });
	        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
	            var opt = options_1[_a];
	            $(el).append(opt);
	        }
	        return el;
	    };
	    /**
	     * Default initialisation function for select array conditions
	     *
	     * This exists because there needs to be different select functionality for contains/without and equals/not
	     */
	    Criteria.initSelectArray = function (that, fn, preDefined) {
	        if (preDefined === void 0) { preDefined = null; }
	        return Criteria.initSelect(that, fn, preDefined, true);
	    };
	    /**
	     * Default initialisation function for input conditions
	     */
	    Criteria.initInput = function (that, fn, preDefined) {
	        if (preDefined === void 0) { preDefined = null; }
	        // Declare the input element
	        var el = $('<input/>')
	            .addClass(Criteria.classes.value)
	            .addClass(Criteria.classes.input)
	            .on('input', function () { fn(that, this); });
	        if (that.c.greyscale) {
	            $(el).addClass(Criteria.classes.greyscale);
	        }
	        // If there is a preDefined value then add it
	        if (preDefined !== null) {
	            $(el).val(preDefined[0]);
	        }
	        return el;
	    };
	    /**
	     * Default initialisation function for conditions requiring 2 inputs
	     */
	    Criteria.init2Input = function (that, fn, preDefined) {
	        if (preDefined === void 0) { preDefined = null; }
	        // Declare all of the necessary jQuery elements
	        var els = [
	            $('<input/>')
	                .addClass(Criteria.classes.value)
	                .addClass(Criteria.classes.input)
	                .on('input', function () { fn(that, this); }),
	            $('<span>')
	                .addClass(that.classes.joiner).text(that.s.dt.i18n('searchBuilder.valueJoiner', that.c.i18n.valueJoiner)),
	            $('<input/>')
	                .addClass(Criteria.classes.value)
	                .addClass(Criteria.classes.input)
	                .on('input', function () { fn(that, this); })
	        ];
	        if (that.c.greyscale) {
	            $(els[0]).addClass(Criteria.classes.greyscale);
	            $(els[2]).addClass(Criteria.classes.greyscale);
	        }
	        // If there is a preDefined value then add it
	        if (preDefined !== null) {
	            $(els[0]).val(preDefined[0]);
	            $(els[2]).val(preDefined[1]);
	        }
	        that.s.dt.off('draw');
	        that.s.dt.one('draw', function () {
	            $(that.s.topGroup).trigger('dtsb-redrawContents');
	        });
	        return els;
	    };
	    /**
	     * Default initialisation function for date conditions
	     */
	    Criteria.initDate = function (that, fn, preDefined) {
	        if (preDefined === void 0) { preDefined = null; }
	        // Declare date element using DataTables dateTime plugin
	        var el = $('<input/>')
	            .addClass(Criteria.classes.value)
	            .addClass(Criteria.classes.input)
	            .dtDateTime({
	            attachTo: 'input',
	            format: that.s.momentFormat ? that.s.momentFormat : undefined
	        })
	            .on('input change', function () { fn(that, this); });
	        if (that.c.greyscale) {
	            $(el).addClass(Criteria.classes.greyscale);
	        }
	        // If there is a preDefined value then add it
	        if (preDefined !== null) {
	            $(el).val(preDefined[0]);
	        }
	        return el;
	    };
	    Criteria.initNoValue = function (that) {
	        that.s.dt.off('draw');
	        that.s.dt.one('draw', function () {
	            $(that.s.topGroup).trigger('dtsb-redrawContents');
	        });
	    };
	    Criteria.init2Date = function (that, fn, preDefined) {
	        if (preDefined === void 0) { preDefined = null; }
	        // Declare all of the date elements that are required using DataTables dateTime plugin
	        var els = [
	            $('<input/>')
	                .addClass(Criteria.classes.value)
	                .addClass(Criteria.classes.input)
	                .dtDateTime({
	                attachTo: 'input',
	                format: that.s.momentFormat ? that.s.momentFormat : undefined
	            })
	                .on('input change', function () { fn(that, this); }),
	            $('<span>')
	                .addClass(that.classes.joiner)
	                .text(that.s.dt.i18n('searchBuilder.valueJoiner', that.c.i18n.valueJoiner)),
	            $('<input/>')
	                .addClass(Criteria.classes.value)
	                .addClass(Criteria.classes.input)
	                .dtDateTime({
	                attachTo: 'input',
	                format: that.s.momentFormat ? that.s.momentFormat : undefined
	            })
	                .on('input change', function () { fn(that, this); })
	        ];
	        if (that.c.greyscale) {
	            $(els[0]).addClass(Criteria.classes.greyscale);
	            $(els[2]).addClass(Criteria.classes.greyscale);
	        }
	        // If there are and preDefined values then add them
	        if (preDefined !== null && preDefined.length > 0) {
	            $(els[0]).val(preDefined[0]);
	            $(els[2]).val(preDefined[1]);
	        }
	        that.s.dt.off('draw');
	        that.s.dt.one('draw', function () {
	            $(that.s.topGroup).trigger('dtsb-redrawContents');
	        });
	        return els;
	    };
	    /**
	     * Default function for select elements to validate condition
	     */
	    Criteria.isInputValidSelect = function (el) {
	        var allFilled = true;
	        // Check each element to make sure that the selections are valid
	        for (var _i = 0, el_1 = el; _i < el_1.length; _i++) {
	            var element = el_1[_i];
	            if ($(element).children('option:selected').length === $(element).children('option').length - $(element).children('option.' + Criteria.classes.notItalic).length &&
	                $(element).children('option:selected').length === 1 &&
	                $(element).children('option:selected')[0] === $(element).children('option:hidden')[0]) {
	                allFilled = false;
	            }
	        }
	        return allFilled;
	    };
	    /**
	     * Default function for input and date elements to validate condition
	     */
	    Criteria.isInputValidInput = function (el) {
	        var allFilled = true;
	        // Check each element to make sure that the inputs are valid
	        for (var _i = 0, el_2 = el; _i < el_2.length; _i++) {
	            var element = el_2[_i];
	            if ($(element).is('input') && $(element).val().length === 0) {
	                allFilled = false;
	            }
	        }
	        return allFilled;
	    };
	    /**
	     * Default function for getting select conditions
	     */
	    Criteria.inputValueSelect = function (el) {
	        var values = [];
	        // Go through the select elements and push each selected option to the return array
	        for (var _i = 0, el_3 = el; _i < el_3.length; _i++) {
	            var element = el_3[_i];
	            if ($(element).is('select')) {
	                var val = $(element).children('option:selected').val();
	                // If the type of the option is an array we need to split it up and sort it
	                values.push($(element).children('option:selected').attr('type') === 'Array' ?
	                    val.split(',').sort() :
	                    val);
	            }
	        }
	        return values;
	    };
	    /**
	     * Default function for getting input conditions
	     */
	    Criteria.inputValueInput = function (el) {
	        var values = [];
	        // Go through the input elements and push each value to the return array
	        for (var _i = 0, el_4 = el; _i < el_4.length; _i++) {
	            var element = el_4[_i];
	            if ($(element).is('input')) {
	                values.push($(element).val());
	            }
	        }
	        return values;
	    };
	    /**
	     * Function that is run on each element as a call back when a search should be triggered
	     */
	    Criteria.updateListener = function (that, el) {
	        // When the value is changed the criteria is now complete so can be included in searches
	        // Get the condition from the map based on the key that has been selected for the condition
	        var condition = that.s.conditions[that.s.condition];
	        that.s.filled = condition.isInputValid(that.dom.value, that);
	        that.s.value = condition.inputValue(that.dom.value, that);
	        if (!Array.isArray(that.s.value)) {
	            that.s.value = [that.s.value];
	        }
	        for (var i = 0; i < that.s.value.length; i++) {
	            // If the value is an array we need to sort it
	            if (Array.isArray(that.s.value[i])) {
	                that.s.value[i].sort();
	            }
	            // Otherwise replace the decimal place character for i18n
	            else if (that.s.dt.settings()[0].oLanguage.sDecimal !== '') {
	                that.s.value[i] = that.s.value[i].replace(that.s.dt.settings()[0].oLanguage.sDecimal, '.');
	            }
	        }
	        // Take note of the cursor position so that we can refocus there later
	        var idx = null;
	        var cursorPos = null;
	        for (var i = 0; i < that.dom.value.length; i++) {
	            if (el === that.dom.value[i][0]) {
	                idx = i;
	                if (el.selectionStart !== undefined) {
	                    cursorPos = el.selectionStart;
	                }
	            }
	        }
	        // Trigger a search
	        that.s.dt.draw();
	        // Refocus the element and set the correct cursor position
	        if (idx !== null) {
	            $(that.dom.value[idx]).removeClass(that.classes.italic);
	            $(that.dom.value[idx]).focus();
	            if (cursorPos !== null) {
	                $(that.dom.value[idx])[0].setSelectionRange(cursorPos, cursorPos);
	            }
	        }
	    };
	    // The order of the conditions will make tslint sad :(
	    Criteria.dateConditions = {
	        '=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.date.equals', i18n.conditions.date.equals);
	            },
	            init: Criteria.initDate,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                value = value.replace(/(\/|\-|\,)/g, '-');
	                return value === comparison[0];
	            }
	        },
	        '!=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.date.not', i18n.conditions.date.not);
	            },
	            init: Criteria.initDate,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                value = value.replace(/(\/|\-|\,)/g, '-');
	                return value !== comparison[0];
	            }
	        },
	        '<': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.date.before', i18n.conditions.date.before);
	            },
	            init: Criteria.initDate,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                value = value.replace(/(\/|\-|\,)/g, '-');
	                return value < comparison[0];
	            }
	        },
	        '>': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.date.after', i18n.conditions.date.after);
	            },
	            init: Criteria.initDate,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                value = value.replace(/(\/|\-|\,)/g, '-');
	                return value > comparison[0];
	            }
	        },
	        'between': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.date.between', i18n.conditions.date.between);
	            },
	            init: Criteria.init2Date,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                value = value.replace(/(\/|\-|\,)/g, '-');
	                if (comparison[0] < comparison[1]) {
	                    return comparison[0] <= value && value <= comparison[1];
	                }
	                else {
	                    return comparison[1] <= value && value <= comparison[0];
	                }
	            }
	        },
	        '!between': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.date.notBetween', i18n.conditions.date.notBetween);
	            },
	            init: Criteria.init2Date,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                value = value.replace(/(\/|\-|\,)/g, '-');
	                if (comparison[0] < comparison[1]) {
	                    return !(comparison[0] <= value && value <= comparison[1]);
	                }
	                else {
	                    return !(comparison[1] <= value && value <= comparison[0]);
	                }
	            }
	        },
	        'null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.date.empty', i18n.conditions.date.empty);
	            },
	            isInputValid: function () { return true; },
	            init: Criteria.initNoValue,
	            inputValue: function () {
	                return;
	            },
	            search: function (value) {
	                return (value === null || value === undefined || value.length === 0);
	            }
	        },
	        '!null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.date.notEmpty', i18n.conditions.date.notEmpty);
	            },
	            isInputValid: function () { return true; },
	            init: Criteria.initNoValue,
	            inputValue: function () {
	                return;
	            },
	            search: function (value) {
	                return !(value === null || value === undefined || value.length === 0);
	            }
	        }
	    };
	    // The order of the conditions will make tslint sad :(
	    Criteria.momentDateConditions = {
	        '=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.moment.equals', i18n.conditions.moment.equals);
	            },
	            init: Criteria.initDate,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison, that) {
	                return moment(value, that.s.momentFormat).valueOf() === moment(comparison[0], that.s.momentFormat).valueOf();
	            }
	        },
	        '!=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.moment.not', i18n.conditions.moment.not);
	            },
	            init: Criteria.initDate,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison, that) {
	                return moment(value, that.s.momentFormat).valueOf() !== moment(comparison[0], that.s.momentFormat).valueOf();
	            }
	        },
	        '<': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.moment.before', i18n.conditions.moment.before);
	            },
	            init: Criteria.initDate,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison, that) {
	                return moment(value, that.s.momentFormat).valueOf() < moment(comparison[0], that.s.momentFormat).valueOf();
	            }
	        },
	        '>': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.moment.after', i18n.conditions.moment.after);
	            },
	            init: Criteria.initDate,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison, that) {
	                return moment(value, that.s.momentFormat).valueOf() > moment(comparison[0], that.s.momentFormat).valueOf();
	            }
	        },
	        'between': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.moment.between', i18n.conditions.moment.between);
	            },
	            init: Criteria.init2Date,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison, that) {
	                var val = moment(value, that.s.momentFormat).valueOf();
	                var comp0 = moment(comparison[0], that.s.momentFormat).valueOf();
	                var comp1 = moment(comparison[1], that.s.momentFormat).valueOf();
	                if (comp0 < comp1) {
	                    return comp0 <= val && val <= comp1;
	                }
	                else {
	                    return comp1 <= val && val <= comp0;
	                }
	            }
	        },
	        '!between': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.moment.notBetween', i18n.conditions.moment.notBetween);
	            },
	            init: Criteria.init2Date,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison, that) {
	                var val = moment(value, that.s.momentFormat).valueOf();
	                var comp0 = moment(comparison[0], that.s.momentFormat).valueOf();
	                var comp1 = moment(comparison[1], that.s.momentFormat).valueOf();
	                if (comp0 < comp1) {
	                    return !(+comp0 <= +val && +val <= +comp1);
	                }
	                else {
	                    return !(+comp1 <= +val && +val <= +comp0);
	                }
	            }
	        },
	        'null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.moment.empty', i18n.conditions.moment.empty);
	            },
	            isInputValid: function () { return true; },
	            init: Criteria.initNoValue,
	            inputValue: function () {
	                return;
	            },
	            search: function (value) {
	                return (value === null || value === undefined || value.length === 0);
	            }
	        },
	        '!null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.moment.notEmpty', i18n.conditions.moment.notEmpty);
	            },
	            isInputValid: function () { return true; },
	            init: Criteria.initNoValue,
	            inputValue: function () {
	                return;
	            },
	            search: function (value) {
	                return !(value === null || value === undefined || value.length === 0);
	            }
	        }
	    };
	    // The order of the conditions will make tslint sad :(
	    Criteria.numConditions = {
	        '=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.equals', i18n.conditions.number.equals);
	            },
	            init: Criteria.initSelect,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                return +value === +comparison[0];
	            }
	        },
	        '!=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.not', i18n.conditions.number.not);
	            },
	            init: Criteria.initSelect,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                return +value !== +comparison[0];
	            }
	        },
	        '<': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.lt', i18n.conditions.number.lt);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                return +value < +comparison[0];
	            }
	        },
	        '<=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.lte', i18n.conditions.number.lte);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                return +value <= +comparison[0];
	            }
	        },
	        '>=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.gte', i18n.conditions.number.gte);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                return +value >= +comparison[0];
	            }
	        },
	        '>': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.gt', i18n.conditions.number.gt);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                return +value > +comparison[0];
	            }
	        },
	        'between': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.between', i18n.conditions.number.between);
	            },
	            init: Criteria.init2Input,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                if (+comparison[0] < +comparison[1]) {
	                    return +comparison[0] <= +value && +value <= +comparison[1];
	                }
	                else {
	                    return +comparison[1] <= +value && +value <= +comparison[0];
	                }
	            }
	        },
	        '!between': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.notBetween', i18n.conditions.number.notBetween);
	            },
	            init: Criteria.init2Input,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                if (+comparison[0] < +comparison[1]) {
	                    return !(+comparison[0] <= +value && +value <= +comparison[1]);
	                }
	                else {
	                    return !(+comparison[1] <= +value && +value <= +comparison[0]);
	                }
	            }
	        },
	        'null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.empty', i18n.conditions.number.empty);
	            },
	            init: Criteria.initNoValue,
	            inputValue: function () { return; },
	            isInputValid: function () { return true; },
	            search: function (value) {
	                return (value === null || value === undefined || value.length === 0);
	            }
	        },
	        '!null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.notEmpty', i18n.conditions.number.notEmpty);
	            },
	            isInputValid: function () { return true; },
	            init: Criteria.initNoValue,
	            inputValue: function () {
	                return;
	            },
	            search: function (value) {
	                return !(value === null || value === undefined || value.length === 0);
	            }
	        }
	    };
	    // The order of the conditions will make tslint sad :(
	    Criteria.numFmtConditions = {
	        '=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.equals', i18n.conditions.number.equals);
	            },
	            init: Criteria.initSelect,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                var val = value.indexOf('-') === 0 ?
	                    '-' + value.replace(/[^0-9.]/g, '') :
	                    value.replace(/[^0-9.]/g, '');
	                var comp = comparison[0].indexOf('-') === 0 ?
	                    '-' + comparison[0].replace(/[^0-9.]/g, '') :
	                    comparison[0].replace(/[^0-9.]/g, '');
	                return +val === +comp;
	            }
	        },
	        '!=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.not', i18n.conditions.number.not);
	            },
	            init: Criteria.initSelect,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                var val = value.indexOf('-') === 0 ?
	                    '-' + value.replace(/[^0-9.]/g, '') :
	                    value.replace(/[^0-9.]/g, '');
	                var comp = comparison[0].indexOf('-') === 0 ?
	                    '-' + comparison[0].replace(/[^0-9.]/g, '') :
	                    comparison[0].replace(/[^0-9.]/g, '');
	                return +val !== +comp;
	            }
	        },
	        '<': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.lt', i18n.conditions.number.lt);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                var val = value.indexOf('-') === 0 ?
	                    '-' + value.replace(/[^0-9.]/g, '') :
	                    value.replace(/[^0-9.]/g, '');
	                var comp = comparison[0].indexOf('-') === 0 ?
	                    '-' + comparison[0].replace(/[^0-9.]/g, '') :
	                    comparison[0].replace(/[^0-9.]/g, '');
	                return +val < +comp;
	            }
	        },
	        '<=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.lte', i18n.conditions.number.lte);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                var val = value.indexOf('-') === 0 ?
	                    '-' + value.replace(/[^0-9.]/g, '') :
	                    value.replace(/[^0-9.]/g, '');
	                var comp = comparison[0].indexOf('-') === 0 ?
	                    '-' + comparison[0].replace(/[^0-9.]/g, '') :
	                    comparison[0].replace(/[^0-9.]/g, '');
	                return +val <= +comp;
	            }
	        },
	        '>=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.gte', i18n.conditions.number.gte);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                var val = value.indexOf('-') === 0 ?
	                    '-' + value.replace(/[^0-9.]/g, '') :
	                    value.replace(/[^0-9.]/g, '');
	                var comp = comparison[0].indexOf('-') === 0 ?
	                    '-' + comparison[0].replace(/[^0-9.]/g, '') :
	                    comparison[0].replace(/[^0-9.]/g, '');
	                return +val >= +comp;
	            }
	        },
	        '>': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.gt', i18n.conditions.number.gt);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                var val = value.indexOf('-') === 0 ?
	                    '-' + value.replace(/[^0-9.]/g, '') :
	                    value.replace(/[^0-9.]/g, '');
	                var comp = comparison[0].indexOf('-') === 0 ?
	                    '-' + comparison[0].replace(/[^0-9.]/g, '') :
	                    comparison[0].replace(/[^0-9.]/g, '');
	                return +val > +comp;
	            }
	        },
	        'between': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.between', i18n.conditions.number.between);
	            },
	            init: Criteria.init2Input,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                var val = value.indexOf('-') === 0 ?
	                    '-' + value.replace(/[^0-9.]/g, '') :
	                    value.replace(/[^0-9.]/g, '');
	                var comp0 = comparison[0].indexOf('-') === 0 ?
	                    '-' + comparison[0].replace(/[^0-9.]/g, '') :
	                    comparison[0].replace(/[^0-9.]/g, '');
	                var comp1 = comparison[1].indexOf('-') === 0 ?
	                    '-' + comparison[1].replace(/[^0-9.]/g, '') :
	                    comparison[1].replace(/[^0-9.]/g, '');
	                if (+comp0 < +comp1) {
	                    return +comp0 <= +val && +val <= +comp1;
	                }
	                else {
	                    return +comp1 <= +val && +val <= +comp0;
	                }
	            }
	        },
	        '!between': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.notBetween', i18n.conditions.number.notBetween);
	            },
	            init: Criteria.init2Input,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                var val = value.indexOf('-') === 0 ?
	                    '-' + value.replace(/[^0-9.]/g, '') :
	                    value.replace(/[^0-9.]/g, '');
	                var comp0 = comparison[0].indexOf('-') === 0 ?
	                    '-' + comparison[0].replace(/[^0-9.]/g, '') :
	                    comparison[0].replace(/[^0-9.]/g, '');
	                var comp1 = comparison[1].indexOf('-') === 0 ?
	                    '-' + comparison[1].replace(/[^0-9.]/g, '') :
	                    comparison[1].replace(/[^0-9.]/g, '');
	                if (+comp0 < +comp1) {
	                    return !(+comp0 <= +val && +val <= +comp1);
	                }
	                else {
	                    return !(+comp1 <= +val && +val <= +comp0);
	                }
	            }
	        },
	        'null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.empty', i18n.conditions.number.empty);
	            },
	            init: Criteria.initNoValue,
	            inputValue: function () { return; },
	            isInputValid: function () { return true; },
	            search: function (value) {
	                return (value === null || value === undefined || value.length === 0);
	            }
	        },
	        '!null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.number.notEmpty', i18n.conditions.number.notEmpty);
	            },
	            isInputValid: function () { return true; },
	            init: Criteria.initNoValue,
	            inputValue: function () {
	                return;
	            },
	            search: function (value) {
	                return !(value === null || value === undefined || value.length === 0);
	            }
	        }
	    };
	    // The order of the conditions will make tslint sad :(
	    Criteria.stringConditions = {
	        '=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.string.equals', i18n.conditions.string.equals);
	            },
	            init: Criteria.initSelect,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                return value === comparison[0];
	            }
	        },
	        '!=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.string.not', i18n.conditions.string.not);
	            },
	            init: Criteria.initSelect,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                return value !== comparison[0];
	            }
	        },
	        'starts': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.string.startsWith', i18n.conditions.string.startsWith);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                return value.toLowerCase().indexOf(comparison[0].toLowerCase()) === 0;
	            }
	        },
	        'contains': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.string.contains', i18n.conditions.string.contains);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                return value.toLowerCase().indexOf(comparison[0].toLowerCase()) !== -1;
	            }
	        },
	        'ends': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.string.endsWith', i18n.conditions.string.endsWith);
	            },
	            init: Criteria.initInput,
	            inputValue: Criteria.inputValueInput,
	            isInputValid: Criteria.isInputValidInput,
	            search: function (value, comparison) {
	                return value.toLowerCase().endsWith(comparison[0].toLowerCase());
	            }
	        },
	        'null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.string.empty', i18n.conditions.string.empty);
	            },
	            init: Criteria.initNoValue,
	            inputValue: function () { return; },
	            isInputValid: function () { return true; },
	            search: function (value) {
	                return (value === null || value === undefined || value.length === 0);
	            }
	        },
	        '!null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.string.notEmpty', i18n.conditions.string.notEmpty);
	            },
	            isInputValid: function () { return true; },
	            init: Criteria.initNoValue,
	            inputValue: function () {
	                return;
	            },
	            search: function (value) {
	                return !(value === null || value === undefined || value.length === 0);
	            }
	        }
	    };
	    // The order of the conditions will make tslint sad :(
	    Criteria.arrayConditions = {
	        'contains': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.array.contains', i18n.conditions.array.contains);
	            },
	            init: Criteria.initSelectArray,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                return value.indexOf(comparison[0]) !== -1;
	            }
	        },
	        'without': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.array.without', i18n.conditions.array.without);
	            },
	            init: Criteria.initSelectArray,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                return value.indexOf(comparison[0]) === -1;
	            }
	        },
	        '=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.array.equals', i18n.conditions.array.equals);
	            },
	            init: Criteria.initSelect,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                if (value.length === comparison[0].length) {
	                    for (var i = 0; i < value.length; i++) {
	                        if (value[i] !== comparison[0][i]) {
	                            return false;
	                        }
	                    }
	                    return true;
	                }
	                return false;
	            }
	        },
	        '!=': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.array.not', i18n.conditions.array.not);
	            },
	            init: Criteria.initSelect,
	            inputValue: Criteria.inputValueSelect,
	            isInputValid: Criteria.isInputValidSelect,
	            search: function (value, comparison) {
	                if (value.length === comparison[0].length) {
	                    for (var i = 0; i < value.length; i++) {
	                        if (value[i] !== comparison[0][i]) {
	                            return true;
	                        }
	                    }
	                    return false;
	                }
	                return true;
	            }
	        },
	        'null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.array.empty', i18n.conditions.array.empty);
	            },
	            init: Criteria.initNoValue,
	            isInputValid: function () { return true; },
	            inputValue: function () { return; },
	            search: function (value) {
	                return (value === null || value === undefined || value.length === 0);
	            }
	        },
	        '!null': {
	            conditionName: function (dt, i18n) {
	                return dt.i18n('searchBuilder.conditions.array.notEmpty', i18n.conditions.array.notEmpty);
	            },
	            isInputValid: function () { return true; },
	            init: Criteria.initNoValue,
	            inputValue: function () { return; },
	            search: function (value) {
	                return (value !== null && value !== undefined && value.length !== 0);
	            }
	        }
	    };
	    Criteria.defaults = {
	        columns: true,
	        conditions: {
	            'array': Criteria.arrayConditions,
	            'date': Criteria.dateConditions,
	            'html': Criteria.stringConditions,
	            'html-num': Criteria.numConditions,
	            'html-num-fmt': Criteria.numFmtConditions,
	            'moment': Criteria.momentDateConditions,
	            'num': Criteria.numConditions,
	            'num-fmt': Criteria.numFmtConditions,
	            'string': Criteria.stringConditions
	        },
	        depthLimit: false,
	        filterChanged: undefined,
	        greyscale: false,
	        i18n: {
	            add: 'Add Condition',
	            button: {
	                0: 'Search Builder',
	                _: 'Search Builder (%d)'
	            },
	            clearAll: 'Clear All',
	            condition: 'Condition',
	            data: 'Data',
	            deleteTitle: 'Delete filtering rule',
	            leftTitle: 'Outdent criteria',
	            logicAnd: 'And',
	            logicOr: 'Or',
	            rightTitle: 'Indent criteria',
	            title: {
	                0: 'Custom Search Builder',
	                _: 'Custom Search Builder (%d)'
	            },
	            value: 'Value',
	            valueJoiner: 'and'
	        },
	        logic: 'AND',
	        orthogonal: {
	            display: 'display',
	            search: 'filter'
	        },
	        preDefined: false
	    };
	    return Criteria;
	}());

	var $$1;
	var DataTable$1;
	/**
	 * Sets the value of jQuery for use in the file
	 * @param jq the instance of jQuery to be set
	 */
	function setJQuery$1(jq) {
	    $$1 = jq;
	    DataTable$1 = jq.fn.dataTable;
	}
	/**
	 * The Group class is used within SearchBuilder to represent a group of criteria
	 */
	var Group = /** @class */ (function () {
	    function Group(table, opts, topGroup, index, isChild, depth) {
	        if (index === void 0) { index = 0; }
	        if (isChild === void 0) { isChild = false; }
	        if (depth === void 0) { depth = 1; }
	        // Check that the required version of DataTables is included
	        if (!DataTable$1 || !DataTable$1.versionCheck || !DataTable$1.versionCheck('1.10.0')) {
	            throw new Error('SearchBuilder requires DataTables 1.10 or newer');
	        }
	        this.classes = $$1.extend(true, {}, Group.classes);
	        // Get options from user
	        this.c = $$1.extend(true, {}, Group.defaults, opts);
	        this.s = {
	            criteria: [],
	            depth: depth,
	            dt: table,
	            index: index,
	            isChild: isChild,
	            logic: undefined,
	            opts: opts,
	            toDrop: undefined,
	            topGroup: topGroup
	        };
	        this.dom = {
	            add: $$1('<button/>')
	                .addClass(this.classes.add)
	                .addClass(this.classes.button)
	                .attr('type', 'button'),
	            clear: $$1('<button>&times</button>')
	                .addClass(this.classes.button)
	                .addClass(this.classes.clearGroup)
	                .attr('type', 'button'),
	            container: $$1('<div/>')
	                .addClass(this.classes.group),
	            logic: $$1('<button/>')
	                .addClass(this.classes.logic)
	                .addClass(this.classes.button)
	                .attr('type', 'button'),
	            logicContainer: $$1('<div/>')
	                .addClass(this.classes.logicContainer)
	        };
	        // A reference to the top level group is maintained throughout any subgroups and criteria that may be created
	        if (this.s.topGroup === undefined) {
	            this.s.topGroup = this.dom.container;
	        }
	        this._setup();
	        return this;
	    }
	    /**
	     * Destroys the groups buttons, clears the internal criteria and removes it from the dom
	     */
	    Group.prototype.destroy = function () {
	        // Turn off listeners
	        $$1(this.dom.add).off('.dtsb');
	        $$1(this.dom.logic).off('.dtsb');
	        // Trigger event for groups at a higher level to pick up on
	        $$1(this.dom.container)
	            .trigger('dtsb-destroy')
	            .remove();
	        this.s.criteria = [];
	    };
	    /**
	     * Gets the details required to rebuild the group
	     */
	    Group.prototype.getDetails = function () {
	        if (this.s.criteria.length === 0) {
	            return {};
	        }
	        var details = {
	            criteria: [],
	            logic: this.s.logic
	        };
	        // NOTE here crit could be either a subgroup or a criteria
	        for (var _i = 0, _a = this.s.criteria; _i < _a.length; _i++) {
	            var crit = _a[_i];
	            details.criteria.push(crit.criteria.getDetails());
	        }
	        return details;
	    };
	    /**
	     * Getter for the node for the container of the group
	     * @returns Node for the container of the group
	     */
	    Group.prototype.getNode = function () {
	        return this.dom.container;
	    };
	    /**
	     * Rebuilds the group based upon the details passed in
	     * @param loadedDetails the details required to rebuild the group
	     */
	    Group.prototype.rebuild = function (loadedDetails) {
	        // If no criteria are stored then just return
	        if (loadedDetails.criteria === undefined || loadedDetails.criteria === null || loadedDetails.criteria.length === 0) {
	            return;
	        }
	        this.s.logic = loadedDetails.logic;
	        $$1(this.dom.logic).text(this.s.logic === 'OR'
	            ? this.s.dt.i18n('searchBuilder.logicOr', this.c.i18n.logicOr)
	            : this.s.dt.i18n('searchBuilder.logicAnd', this.c.i18n.logicAnd));
	        // Add all of the criteria, be it a sub group or a criteria
	        for (var _i = 0, _a = loadedDetails.criteria; _i < _a.length; _i++) {
	            var crit = _a[_i];
	            if (crit.logic !== undefined) {
	                this._addPrevGroup(crit);
	            }
	            else if (crit.logic === undefined) {
	                this._addPrevCriteria(crit);
	            }
	        }
	        // For all of the criteria children, update the arrows incase they require changing and set the listeners
	        for (var _b = 0, _c = this.s.criteria; _b < _c.length; _b++) {
	            var crit = _c[_b];
	            if (crit.criteria instanceof Criteria) {
	                crit.criteria.updateArrows(this.s.criteria.length > 1, false);
	                this._setCriteriaListeners(crit.criteria);
	            }
	        }
	    };
	    /**
	     * Redraws the Contents of the searchBuilder Groups and Criteria
	     */
	    Group.prototype.redrawContents = function () {
	        // Clear the container out and add the basic elements
	        $$1(this.dom.container)
	            .empty()
	            .append(this.dom.logicContainer)
	            .append(this.dom.add);
	        // Sort the criteria by index so that they appear in the correct order
	        this.s.criteria.sort(function (a, b) {
	            if (a.criteria.s.index < b.criteria.s.index) {
	                return -1;
	            }
	            else if (a.criteria.s.index > b.criteria.s.index) {
	                return 1;
	            }
	            return 0;
	        });
	        this.setListeners();
	        for (var i = 0; i < this.s.criteria.length; i++) {
	            var crit = this.s.criteria[i].criteria;
	            if (crit instanceof Criteria) {
	                // Reset the index to the new value
	                this.s.criteria[i].index = i;
	                this.s.criteria[i].criteria.s.index = i;
	                // Add to the group
	                $$1(this.s.criteria[i].criteria.dom.container).insertBefore(this.dom.add);
	                // Set listeners for various points
	                this._setCriteriaListeners(crit);
	                this.s.criteria[i].criteria.rebuild(this.s.criteria[i].criteria.getDetails());
	            }
	            else if (crit instanceof Group && crit.s.criteria.length > 0) {
	                // Reset the index to the new value
	                this.s.criteria[i].index = i;
	                this.s.criteria[i].criteria.s.index = i;
	                // Add the sub group to the group
	                $$1(this.s.criteria[i].criteria.dom.container).insertBefore(this.dom.add);
	                // Redraw the contents of the group
	                crit.redrawContents();
	                this._setGroupListeners(crit);
	            }
	            else {
	                // The group is empty so remove it
	                this.s.criteria.splice(i, 1);
	                i--;
	            }
	        }
	        this.setupLogic();
	    };
	    /**
	     * Search method, checking the row data against the criteria in the group
	     * @param rowData The row data to be compared
	     * @returns boolean The result of the search
	     */
	    Group.prototype.search = function (rowData, rowIdx) {
	        if (this.s.logic === 'AND') {
	            return this._andSearch(rowData, rowIdx);
	        }
	        else if (this.s.logic === 'OR') {
	            return this._orSearch(rowData, rowIdx);
	        }
	        return true;
	    };
	    /**
	     * Locates the groups logic button to the correct location on the page
	     */
	    Group.prototype.setupLogic = function () {
	        // Remove logic button
	        $$1(this.dom.logicContainer).remove();
	        $$1(this.dom.clear).remove();
	        // If there are no criteria in the group then keep the logic removed and return
	        if (this.s.criteria.length < 1) {
	            if (!this.s.isChild) {
	                $$1(this.dom.container).trigger('dtsb-destroy');
	                // Set criteria left margin
	                $$1(this.dom.container).css('margin-left', 0);
	            }
	            return;
	        }
	        // Set width, take 2 for the border
	        var height = $$1(this.dom.container).height() - 2;
	        $$1(this.dom.clear).height('0px');
	        $$1(this.dom.logicContainer).append(this.dom.clear).width(height);
	        // Prepend logic button
	        $$1(this.dom.container).prepend(this.dom.logicContainer);
	        this._setLogicListener();
	        // Set criteria left margin
	        $$1(this.dom.container).css('margin-left', $$1(this.dom.logicContainer).outerHeight(true));
	        var logicOffset = $$1(this.dom.logicContainer).offset();
	        // Set horizontal alignment
	        var currentLeft = logicOffset.left;
	        var groupLeft = $$1(this.dom.container).offset().left;
	        var shuffleLeft = currentLeft - groupLeft;
	        var newPos = currentLeft - shuffleLeft - $$1(this.dom.logicContainer).outerHeight(true);
	        $$1(this.dom.logicContainer).offset({ left: newPos });
	        // Set vertical alignment
	        var firstCrit = $$1(this.dom.logicContainer).next();
	        var currentTop = logicOffset.top;
	        var firstTop = $$1(firstCrit).offset().top;
	        var shuffleTop = currentTop - firstTop;
	        var newTop = currentTop - shuffleTop;
	        $$1(this.dom.logicContainer).offset({ top: newTop });
	        $$1(this.dom.clear).outerHeight($$1(this.dom.logicContainer).height());
	        this._setClearListener();
	    };
	    /**
	     * Sets listeners on the groups elements
	     */
	    Group.prototype.setListeners = function () {
	        var _this = this;
	        $$1(this.dom.add).unbind('click');
	        $$1(this.dom.add).on('click', function () {
	            // If this is the parent group then the logic button has not been added yet
	            if (!_this.s.isChild) {
	                $$1(_this.dom.container).prepend(_this.dom.logicContainer);
	            }
	            _this.addCriteria();
	            $$1(_this.dom.container).trigger('dtsb-add');
	            _this.s.dt.state.save();
	            return false;
	        });
	        for (var _i = 0, _a = this.s.criteria; _i < _a.length; _i++) {
	            var crit = _a[_i];
	            crit.criteria.setListeners();
	        }
	        this._setClearListener();
	        this._setLogicListener();
	    };
	    /**
	     * Adds a criteria to the group
	     * @param crit Instance of Criteria to be added to the group
	     */
	    Group.prototype.addCriteria = function (crit, redraw) {
	        if (crit === void 0) { crit = null; }
	        if (redraw === void 0) { redraw = true; }
	        var index = crit === null ? this.s.criteria.length : crit.s.index;
	        var criteria = new Criteria(this.s.dt, this.s.opts, this.s.topGroup, index, this.s.depth);
	        // If a Criteria has been passed in then set the values to continue that
	        if (crit !== null) {
	            criteria.c = crit.c;
	            criteria.s = crit.s;
	            criteria.s.depth = this.s.depth;
	            criteria.classes = crit.classes;
	        }
	        criteria.populate();
	        var inserted = false;
	        for (var i = 0; i < this.s.criteria.length; i++) {
	            if (i === 0 && this.s.criteria[i].criteria.s.index > criteria.s.index) {
	                // Add the node for the criteria at the start of the group
	                $$1(criteria.getNode()).insertBefore(this.s.criteria[i].criteria.dom.container);
	                inserted = true;
	            }
	            else if (i < this.s.criteria.length - 1 &&
	                this.s.criteria[i].criteria.s.index < criteria.s.index &&
	                this.s.criteria[i + 1].criteria.s.index > criteria.s.index) {
	                // Add the node for the criteria in the correct location
	                $$1(criteria.getNode()).insertAfter(this.s.criteria[i].criteria.dom.container);
	                inserted = true;
	            }
	        }
	        if (!inserted) {
	            $$1(criteria.getNode()).insertBefore(this.dom.add);
	        }
	        // Add the details for this criteria to the array
	        this.s.criteria.push({
	            criteria: criteria,
	            index: index
	        });
	        this.s.criteria = this.s.criteria.sort(function (a, b) {
	            return a.criteria.s.index - b.criteria.s.index;
	        });
	        for (var _i = 0, _a = this.s.criteria; _i < _a.length; _i++) {
	            var opt = _a[_i];
	            if (opt.criteria instanceof Criteria) {
	                opt.criteria.updateArrows(this.s.criteria.length > 1, redraw);
	            }
	        }
	        this._setCriteriaListeners(criteria);
	        criteria.setListeners();
	        this.setupLogic();
	    };
	    /**
	     * Checks the group to see if it has any filled criteria
	     */
	    Group.prototype.checkFilled = function () {
	        for (var _i = 0, _a = this.s.criteria; _i < _a.length; _i++) {
	            var crit = _a[_i];
	            if ((crit.criteria instanceof Criteria && crit.criteria.s.filled) ||
	                (crit.criteria instanceof Group && crit.criteria.checkFilled())) {
	                return true;
	            }
	        }
	        return false;
	    };
	    /**
	     * Gets the count for the number of criteria in this group and any sub groups
	     */
	    Group.prototype.count = function () {
	        var count = 0;
	        for (var _i = 0, _a = this.s.criteria; _i < _a.length; _i++) {
	            var crit = _a[_i];
	            if (crit.criteria instanceof Group) {
	                count += crit.criteria.count();
	            }
	            else {
	                count++;
	            }
	        }
	        return count;
	    };
	    /**
	     * Rebuilds a sub group that previously existed
	     * @param loadedGroup The details of a group within this group
	     */
	    Group.prototype._addPrevGroup = function (loadedGroup) {
	        var idx = this.s.criteria.length;
	        var group = new Group(this.s.dt, this.c, this.s.topGroup, idx, true, this.s.depth + 1);
	        // Add the new group to the criteria array
	        this.s.criteria.push({
	            criteria: group,
	            index: idx,
	            logic: group.s.logic
	        });
	        // Rebuild it with the previous conditions for that group
	        group.rebuild(loadedGroup);
	        this.s.criteria[idx].criteria = group;
	        $$1(this.s.topGroup).trigger('dtsb-redrawContents');
	        this._setGroupListeners(group);
	    };
	    /**
	     * Rebuilds a criteria of this group that previously existed
	     * @param loadedCriteria The details of a criteria within the group
	     */
	    Group.prototype._addPrevCriteria = function (loadedCriteria) {
	        var idx = this.s.criteria.length;
	        var criteria = new Criteria(this.s.dt, this.s.opts, this.s.topGroup, idx, this.s.depth);
	        criteria.populate();
	        // Add the new criteria to the criteria array
	        this.s.criteria.push({
	            criteria: criteria,
	            index: idx
	        });
	        // Rebuild it with the previous conditions for that criteria
	        criteria.rebuild(loadedCriteria);
	        this.s.criteria[idx].criteria = criteria;
	        $$1(this.s.topGroup).trigger('dtsb-redrawContents');
	    };
	    /**
	     * Checks And the criteria using AND logic
	     * @param rowData The row data to be checked against the search criteria
	     * @returns boolean The result of the AND search
	     */
	    Group.prototype._andSearch = function (rowData, rowIdx) {
	        // If there are no criteria then return true for this group
	        if (this.s.criteria.length === 0) {
	            return true;
	        }
	        for (var _i = 0, _a = this.s.criteria; _i < _a.length; _i++) {
	            var crit = _a[_i];
	            // If the criteria is not complete then skip it
	            if (crit.criteria instanceof Criteria && !crit.criteria.s.filled) {
	                continue;
	            }
	            // Otherwise if a single one fails return false
	            else if (!crit.criteria.search(rowData, rowIdx)) {
	                return false;
	            }
	        }
	        // If we get to here then everything has passed, so return true for the group
	        return true;
	    };
	    /**
	     * Checks And the criteria using OR logic
	     * @param rowData The row data to be checked against the search criteria
	     * @returns boolean The result of the OR search
	     */
	    Group.prototype._orSearch = function (rowData, rowIdx) {
	        // If there are no criteria in the group then return true
	        if (this.s.criteria.length === 0) {
	            return true;
	        }
	        // This will check to make sure that at least one criteria in the group is complete
	        var filledfound = false;
	        for (var _i = 0, _a = this.s.criteria; _i < _a.length; _i++) {
	            var crit = _a[_i];
	            if (crit.criteria instanceof Criteria && crit.criteria.s.filled) {
	                // A completed criteria has been found so set the flag
	                filledfound = true;
	                // If the search passes then return true
	                if (crit.criteria.search(rowData, rowIdx)) {
	                    return true;
	                }
	            }
	            else if (crit.criteria instanceof Group && crit.criteria.checkFilled()) {
	                filledfound = true;
	                if (crit.criteria.search(rowData, rowIdx)) {
	                    return true;
	                }
	            }
	        }
	        // If we get here we need to return the inverse of filledfound,
	        //  as if any have been found and we are here then none have passed
	        return !filledfound;
	    };
	    /**
	     * Removes a criteria from the group
	     * @param criteria The criteria instance to be removed
	     */
	    Group.prototype._removeCriteria = function (criteria, group) {
	        if (group === void 0) { group = false; }
	        // If removing a criteria and there is only then then just destroy the group
	        if (this.s.criteria.length <= 1 && this.s.isChild) {
	            this.destroy();
	        }
	        else {
	            // Otherwise splice the given criteria out and redo the indexes
	            var last = void 0;
	            for (var i = 0; i < this.s.criteria.length; i++) {
	                if (this.s.criteria[i].index === criteria.s.index && (!group || this.s.criteria[i].criteria instanceof Group)) {
	                    last = i;
	                }
	            }
	            // We want to remove the last element with the desired index, as its replacement will be inserted before it
	            if (last !== undefined) {
	                this.s.criteria.splice(last, 1);
	            }
	            for (var i = 0; i < this.s.criteria.length; i++) {
	                this.s.criteria[i].index = i;
	                this.s.criteria[i].criteria.s.index = i;
	            }
	        }
	    };
	    /**
	     * Sets the listeners in group for a criteria
	     * @param criteria The criteria for the listeners to be set on
	     */
	    Group.prototype._setCriteriaListeners = function (criteria) {
	        var _this = this;
	        $$1(criteria.dom["delete"])
	            .unbind('click')
	            .on('click', function () {
	            _this._removeCriteria(criteria);
	            $$1(criteria.dom.container).remove();
	            for (var _i = 0, _a = _this.s.criteria; _i < _a.length; _i++) {
	                var crit = _a[_i];
	                if (crit.criteria instanceof Criteria) {
	                    crit.criteria.updateArrows(_this.s.criteria.length > 1);
	                }
	            }
	            criteria.destroy();
	            _this.s.dt.draw();
	            $$1(_this.s.topGroup).trigger('dtsb-redrawContents');
	            $$1(_this.s.topGroup).trigger('dtsb-updateTitle');
	            return false;
	        });
	        $$1(criteria.dom.right)
	            .unbind('click')
	            .on('click', function () {
	            var idx = criteria.s.index;
	            var group = new Group(_this.s.dt, _this.s.opts, _this.s.topGroup, criteria.s.index, true, _this.s.depth + 1);
	            // Add the criteria that is to be moved to the new group
	            group.addCriteria(criteria);
	            // Update the details in the current groups criteria array
	            _this.s.criteria[idx].criteria = group;
	            _this.s.criteria[idx].logic = 'AND';
	            $$1(_this.s.topGroup).trigger('dtsb-redrawContents');
	            _this._setGroupListeners(group);
	            return false;
	        });
	        $$1(criteria.dom.left)
	            .unbind('click')
	            .on('click', function () {
	            _this.s.toDrop = new Criteria(_this.s.dt, _this.s.opts, _this.s.topGroup, criteria.s.index);
	            _this.s.toDrop.s = criteria.s;
	            _this.s.toDrop.c = criteria.c;
	            _this.s.toDrop.classes = criteria.classes;
	            _this.s.toDrop.populate();
	            // The dropCriteria event mutates the reference to the index so need to store it
	            var index = _this.s.toDrop.s.index;
	            $$1(_this.dom.container).trigger('dtsb-dropCriteria');
	            criteria.s.index = index;
	            _this._removeCriteria(criteria);
	            // By tracking the top level group we can directly trigger a redraw on it,
	            //  bubbling is also possible, but that is slow with deep levelled groups
	            $$1(_this.s.topGroup).trigger('dtsb-redrawContents');
	            _this.s.dt.draw();
	            return false;
	        });
	    };
	    /**
	     * Set's the listeners for the group clear button
	     */
	    Group.prototype._setClearListener = function () {
	        var _this = this;
	        $$1(this.dom.clear)
	            .unbind('click')
	            .on('click', function () {
	            if (!_this.s.isChild) {
	                $$1(_this.dom.container).trigger('dtsb-clearContents');
	                return false;
	            }
	            _this.destroy();
	            $$1(_this.s.topGroup).trigger('dtsb-updateTitle');
	            $$1(_this.s.topGroup).trigger('dtsb-redrawContents');
	            return false;
	        });
	    };
	    /**
	     * Sets listeners for sub groups of this group
	     * @param group The sub group that the listeners are to be set on
	     */
	    Group.prototype._setGroupListeners = function (group) {
	        var _this = this;
	        // Set listeners for the new group
	        $$1(group.dom.add)
	            .unbind('click')
	            .on('click', function () {
	            _this.setupLogic();
	            $$1(_this.dom.container).trigger('dtsb-add');
	            return false;
	        });
	        $$1(group.dom.container)
	            .unbind('dtsb-add')
	            .on('dtsb-add', function () {
	            _this.setupLogic();
	            $$1(_this.dom.container).trigger('dtsb-add');
	            return false;
	        });
	        $$1(group.dom.container)
	            .unbind('dtsb-destroy')
	            .on('dtsb-destroy', function () {
	            _this._removeCriteria(group, true);
	            $$1(group.dom.container).remove();
	            _this.setupLogic();
	            return false;
	        });
	        $$1(group.dom.container)
	            .unbind('dtsb-dropCriteria')
	            .on('dtsb-dropCriteria', function () {
	            var toDrop = group.s.toDrop;
	            toDrop.s.index = group.s.index;
	            toDrop.updateArrows(_this.s.criteria.length > 1, false);
	            _this.addCriteria(toDrop, false);
	            return false;
	        });
	        group.setListeners();
	    };
	    /**
	     * Sets up the Group instance, setting listeners and appending elements
	     */
	    Group.prototype._setup = function () {
	        this.setListeners();
	        $$1(this.dom.add).text(this.s.dt.i18n('searchBuilder.add', this.c.i18n.add));
	        $$1(this.dom.logic).text(this.c.logic === 'OR'
	            ? this.s.dt.i18n('searchBuilder.logicOr', this.c.i18n.logicOr)
	            : this.s.dt.i18n('searchBuilder.logicAnd', this.c.i18n.logicAnd));
	        this.s.logic = this.c.logic === 'OR' ? 'OR' : 'AND';
	        if (this.c.greyscale) {
	            $$1(this.dom.logic).addClass(this.classes.greyscale);
	        }
	        $$1(this.dom.logicContainer).append(this.dom.logic).append(this.dom.clear);
	        // Only append the logic button immediately if this is a sub group,
	        //  otherwise it will be prepended later when adding a criteria
	        if (this.s.isChild) {
	            $$1(this.dom.container).append(this.dom.logicContainer);
	        }
	        $$1(this.dom.container).append(this.dom.add);
	    };
	    /**
	     * Sets the listener for the logic button
	     */
	    Group.prototype._setLogicListener = function () {
	        var _this = this;
	        $$1(this.dom.logic)
	            .unbind('click')
	            .on('click', function () {
	            _this._toggleLogic();
	            _this.s.dt.draw();
	            for (var _i = 0, _a = _this.s.criteria; _i < _a.length; _i++) {
	                var crit = _a[_i];
	                crit.criteria.setListeners();
	            }
	        });
	    };
	    /**
	     * Toggles the logic for the group
	     */
	    Group.prototype._toggleLogic = function () {
	        if (this.s.logic === 'OR') {
	            this.s.logic = 'AND';
	            $$1(this.dom.logic).text(this.s.dt.i18n('searchBuilder.logicAnd', this.c.i18n.logicAnd));
	        }
	        else if (this.s.logic === 'AND') {
	            this.s.logic = 'OR';
	            $$1(this.dom.logic).text(this.s.dt.i18n('searchBuilder.logicOr', this.c.i18n.logicOr));
	        }
	    };
	    Group.version = '1.0.0';
	    Group.classes = {
	        add: 'dtsb-add',
	        button: 'dtsb-button',
	        clearGroup: 'dtsb-clearGroup',
	        greyscale: 'dtsb-greyscale',
	        group: 'dtsb-group',
	        inputButton: 'dtsb-iptbtn',
	        logic: 'dtsb-logic',
	        logicContainer: 'dtsb-logicContainer'
	    };
	    Group.defaults = {
	        columns: true,
	        conditions: {
	            'date': Criteria.dateConditions,
	            'html': Criteria.stringConditions,
	            'html-num': Criteria.numConditions,
	            'html-num-fmt': Criteria.numFmtConditions,
	            'moment': Criteria.momentDateConditions,
	            'num': Criteria.numConditions,
	            'num-fmt': Criteria.numFmtConditions,
	            'string': Criteria.stringConditions
	        },
	        depthLimit: false,
	        filterChanged: undefined,
	        greyscale: false,
	        i18n: {
	            add: 'Add Condition',
	            button: {
	                0: 'Search Builder',
	                _: 'Search Builder (%d)'
	            },
	            clearAll: 'Clear All',
	            condition: 'Condition',
	            data: 'Data',
	            deleteTitle: 'Delete filtering rule',
	            leftTitle: 'Outdent criteria',
	            logicAnd: 'And',
	            logicOr: 'Or',
	            rightTitle: 'Indent criteria',
	            title: {
	                0: 'Custom Search Builder',
	                _: 'Custom Search Builder (%d)'
	            },
	            value: 'Value',
	            valueJoiner: 'and'
	        },
	        logic: 'AND',
	        orthogonal: {
	            display: 'display',
	            search: 'filter'
	        },
	        preDefined: false
	    };
	    return Group;
	}());

	var $$2;
	var DataTable$2;
	/**
	 * Sets the value of jQuery for use in the file
	 * @param jq the instance of jQuery to be set
	 */
	function setJQuery$2(jq) {
	    $$2 = jq;
	    DataTable$2 = jq.fn.DataTable;
	}
	/**
	 * SearchBuilder class for DataTables.
	 * Allows for complex search queries to be constructed and implemented on a DataTable
	 */
	var SearchBuilder = /** @class */ (function () {
	    function SearchBuilder(builderSettings, opts) {
	        var _this = this;
	        // Check that the required version of DataTables is included
	        if (!DataTable$2 || !DataTable$2.versionCheck || !DataTable$2.versionCheck('1.10.0')) {
	            throw new Error('SearchBuilder requires DataTables 1.10 or newer');
	        }
	        var table = new DataTable$2.Api(builderSettings);
	        this.classes = $$2.extend(true, {}, SearchBuilder.classes);
	        // Get options from user
	        this.c = $$2.extend(true, {}, SearchBuilder.defaults, opts);
	        this.dom = {
	            clearAll: $$2('<button type="button">' + table.i18n('searchBuilder.clearAll', this.c.i18n.clearAll) + '</button>')
	                .addClass(this.classes.clearAll)
	                .addClass(this.classes.button)
	                .attr('type', 'button'),
	            container: $$2('<div/>')
	                .addClass(this.classes.container),
	            title: $$2('<div/>')
	                .addClass(this.classes.title),
	            titleRow: $$2('<div/>')
	                .addClass(this.classes.titleRow),
	            topGroup: undefined
	        };
	        this.s = {
	            dt: table,
	            opts: opts,
	            search: undefined,
	            topGroup: undefined
	        };
	        // If searchbuilder is already defined for this table then return
	        if (table.settings()[0]._searchBuilder !== undefined) {
	            return;
	        }
	        table.settings()[0]._searchBuilder = this;
	        // Run the remaining setup when the table is initialised
	        if (this.s.dt.settings()[0]._bInitComplete) {
	            this._setUp();
	        }
	        else {
	            table.one('init.dt', function () {
	                _this._setUp();
	            });
	        }
	        return this;
	    }
	    /**
	     * Gets the details required to rebuild the SearchBuilder as it currently is
	     */
	    SearchBuilder.prototype.getDetails = function () {
	        return this.s.topGroup.getDetails();
	    };
	    /**
	     * Getter for the node of the container for the searchBuilder
	     * @returns JQuery<HTMLElement> the node of the container
	     */
	    SearchBuilder.prototype.getNode = function () {
	        return this.dom.container;
	    };
	    /**
	     * Rebuilds the SearchBuilder to a state that is provided
	     * @param details The details required to perform a rebuild
	     */
	    SearchBuilder.prototype.rebuild = function (details) {
	        $$2(this.dom.clearAll).click();
	        // If there are no details to rebuild then return
	        if (details === undefined || details === null) {
	            return this;
	        }
	        this.s.topGroup.rebuild(details);
	        this.s.dt.draw();
	        this.s.topGroup.setListeners();
	        return this;
	    };
	    /**
	     * Applies the defaults to preDefined criteria
	     * @param preDef the array of criteria to be processed.
	     */
	    SearchBuilder.prototype._applyPreDefDefaults = function (preDef) {
	        var _this = this;
	        if (preDef.criteria !== undefined && preDef.logic === undefined) {
	            preDef.logic = 'AND';
	        }
	        var _loop_1 = function (crit) {
	            // Apply the defaults to any further criteria
	            if (crit.criteria !== undefined) {
	                crit = this_1._applyPreDefDefaults(crit);
	            }
	            else {
	                this_1.s.dt.columns().every(function (index) {
	                    if (_this.s.dt.settings()[0].aoColumns[index].sTitle === crit.data) {
	                        crit.dataIdx = index;
	                    }
	                });
	            }
	        };
	        var this_1 = this;
	        for (var _i = 0, _a = preDef.criteria; _i < _a.length; _i++) {
	            var crit = _a[_i];
	            _loop_1(crit);
	        }
	        return preDef;
	    };
	    /**
	     * Set's up the SearchBuilder
	     */
	    SearchBuilder.prototype._setUp = function (loadState) {
	        var _this = this;
	        if (loadState === void 0) { loadState = true; }
	        this.s.topGroup = new Group(this.s.dt, this.c, undefined);
	        this._setClearListener();
	        this.s.dt.on('stateSaveParams', function (e, settings, data) {
	            data.searchBuilder = _this.getDetails();
	            data.page = _this.s.dt.page();
	        });
	        this._build();
	        if (loadState) {
	            var loadedState = this.s.dt.state.loaded();
	            // If the loaded State is not null rebuild based on it for statesave
	            if (loadedState !== null && loadedState.searchBuilder !== undefined) {
	                this.s.topGroup.rebuild(loadedState.searchBuilder);
	                $$2(this.s.topGroup.dom.container).trigger('dtsb-redrawContents');
	                this.s.dt.page(loadedState.page).draw('page');
	                this.s.topGroup.setListeners();
	            }
	            // Otherwise load any predefined options
	            else if (this.c.preDefined !== false) {
	                this.c.preDefined = this._applyPreDefDefaults(this.c.preDefined);
	                this.rebuild(this.c.preDefined);
	            }
	        }
	        this._setEmptyListener();
	        this.s.dt.state.save();
	    };
	    /**
	     * Updates the title of the SearchBuilder
	     * @param count the number of filters in the SearchBuilder
	     */
	    SearchBuilder.prototype._updateTitle = function (count) {
	        $$2(this.dom.title).text(this.s.dt.i18n('searchBuilder.title', this.c.i18n.title, count));
	    };
	    /**
	     * Builds all of the dom elements together
	     */
	    SearchBuilder.prototype._build = function () {
	        var _this = this;
	        // Empty and setup the container
	        $$2(this.dom.clearAll).remove();
	        $$2(this.dom.container).empty();
	        var count = this.s.topGroup.count();
	        this._updateTitle(count);
	        $$2(this.dom.titleRow).append(this.dom.title);
	        $$2(this.dom.container).append(this.dom.titleRow);
	        this.dom.topGroup = this.s.topGroup.getNode();
	        $$2(this.dom.container).append(this.dom.topGroup);
	        this._setRedrawListener();
	        var tableNode = this.s.dt.table(0).node();
	        if ($$2.fn.dataTable.ext.search.indexOf(this.s.search) === -1) {
	            // Custom search function for SearchBuilder
	            this.s.search = function (settings, searchData, dataIndex, origData) {
	                if (settings.nTable !== tableNode) {
	                    return true;
	                }
	                return _this.s.topGroup.search(searchData, dataIndex);
	            };
	            // Add SearchBuilder search function to the dataTables search array
	            $$2.fn.dataTable.ext.search.push(this.s.search);
	        }
	        // Register an Api method for getting the column type
	        $$2.fn.DataTable.Api.registerPlural('columns().type()', 'column().type()', function (selector, opts) {
	            return this.iterator('column', function (settings, column) {
	                return settings.aoColumns[column].sType;
	            }, 1);
	        });
	        this.s.dt.on('destroy.dt', function () {
	            $$2(_this.dom.container).remove();
	            $$2(_this.dom.clearAll).remove();
	            var searchIdx = $$2.fn.dataTable.ext.search.indexOf(_this.s.search);
	            while (searchIdx !== -1) {
	                $$2.fn.dataTable.ext.search.splice(searchIdx, 1);
	                searchIdx = $$2.fn.dataTable.ext.search.indexOf(_this.s.search);
	            }
	        });
	    };
	    /**
	     * Checks if the clearAll button should be added or not
	     */
	    SearchBuilder.prototype._checkClear = function () {
	        if (this.s.topGroup.s.criteria.length > 0) {
	            $$2(this.dom.clearAll).insertAfter(this.dom.title);
	            this._setClearListener();
	        }
	        else {
	            $$2(this.dom.clearAll).remove();
	        }
	    };
	    /**
	     * Update the count in the title/button
	     * @param count Number of filters applied
	     */
	    SearchBuilder.prototype._filterChanged = function (count) {
	        var fn = this.c.filterChanged;
	        if (typeof fn === 'function') {
	            fn(count, this.s.dt.i18n('searchBuilder.button', this.c.i18n.button, count));
	        }
	    };
	    /**
	     * Set the listener for the clear button
	     */
	    SearchBuilder.prototype._setClearListener = function () {
	        var _this = this;
	        $$2(this.dom.clearAll).unbind('click');
	        $$2(this.dom.clearAll).on('click', function () {
	            _this.s.topGroup = new Group(_this.s.dt, _this.c, undefined);
	            _this._build();
	            _this.s.dt.draw();
	            _this.s.topGroup.setListeners();
	            $$2(_this.dom.clearAll).remove();
	            _this._setEmptyListener();
	            _this._filterChanged(0);
	            return false;
	        });
	    };
	    /**
	     * Set the listener for the Redraw event
	     */
	    SearchBuilder.prototype._setRedrawListener = function () {
	        var _this = this;
	        $$2(this.s.topGroup.dom.container).unbind('dtsb-redrawContents');
	        $$2(this.s.topGroup.dom.container).on('dtsb-redrawContents', function () {
	            _this._checkClear();
	            _this.s.topGroup.redrawContents();
	            _this.s.topGroup.setupLogic();
	            _this._setEmptyListener();
	            var count = _this.s.topGroup.count();
	            _this._updateTitle(count);
	            _this._filterChanged(count);
	            _this.s.dt.state.save();
	        });
	        $$2(this.s.topGroup.dom.container).unbind('dtsb-clearContents');
	        $$2(this.s.topGroup.dom.container).on('dtsb-clearContents', function () {
	            _this._setUp(false);
	            _this._filterChanged(0);
	            _this.s.dt.draw();
	        });
	        $$2(this.s.topGroup.dom.container).on('dtsb-updateTitle', function () {
	            var count = _this.s.topGroup.count();
	            _this._updateTitle(count);
	            _this._filterChanged(count);
	        });
	    };
	    /**
	     * Sets listeners to check whether clearAll should be added or removed
	     */
	    SearchBuilder.prototype._setEmptyListener = function () {
	        var _this = this;
	        $$2(this.s.topGroup.dom.add).on('click', function () {
	            _this._checkClear();
	        });
	        $$2(this.s.topGroup.dom.container).on('dtsb-destroy', function () {
	            $$2(_this.dom.clearAll).remove();
	        });
	    };
	    SearchBuilder.version = '1.0.1';
	    SearchBuilder.classes = {
	        button: 'dtsb-button',
	        clearAll: 'dtsb-clearAll',
	        container: 'dtsb-searchBuilder',
	        inputButton: 'dtsb-iptbtn',
	        title: 'dtsb-title',
	        titleRow: 'dtsb-titleRow'
	    };
	    SearchBuilder.defaults = {
	        columns: true,
	        conditions: {
	            'date': Criteria.dateConditions,
	            'html': Criteria.stringConditions,
	            'html-num': Criteria.numConditions,
	            'html-num-fmt': Criteria.numFmtConditions,
	            'moment': Criteria.momentDateConditions,
	            'num': Criteria.numConditions,
	            'num-fmt': Criteria.numFmtConditions,
	            'string': Criteria.stringConditions
	        },
	        depthLimit: false,
	        filterChanged: undefined,
	        greyscale: false,
	        i18n: {
	            add: 'Add Condition',
	            button: {
	                0: 'Search Builder',
	                _: 'Search Builder (%d)'
	            },
	            clearAll: 'Clear All',
	            condition: 'Condition',
	            conditions: {
	                array: {
	                    contains: 'Contains',
	                    empty: 'Empty',
	                    equals: 'Equals',
	                    not: 'Not',
	                    notEmpty: 'Not Empty',
	                    without: 'Without'
	                },
	                date: {
	                    after: 'After',
	                    before: 'Before',
	                    between: 'Between',
	                    empty: 'Empty',
	                    equals: 'Equals',
	                    not: 'Not',
	                    notBetween: 'Not Between',
	                    notEmpty: 'Not Empty'
	                },
	                moment: {
	                    after: 'After',
	                    before: 'Before',
	                    between: 'Between',
	                    empty: 'Empty',
	                    equals: 'Equals',
	                    not: 'Not',
	                    notBetween: 'Not Between',
	                    notEmpty: 'Not Empty'
	                },
	                number: {
	                    between: 'Between',
	                    empty: 'Empty',
	                    equals: 'Equals',
	                    gt: 'Greater Than',
	                    gte: 'Greater Than Equal To',
	                    lt: 'Less Than',
	                    lte: 'Less Than Equal To',
	                    not: 'Not',
	                    notBetween: 'Not Between',
	                    notEmpty: 'Not Empty'
	                },
	                string: {
	                    contains: 'Contains',
	                    empty: 'Empty',
	                    endsWith: 'Ends With',
	                    equals: 'Equals',
	                    not: 'Not',
	                    notEmpty: 'Not Empty',
	                    startsWith: 'Starts With'
	                }
	            },
	            data: 'Data',
	            deleteTitle: 'Delete filtering rule',
	            leftTitle: 'Outdent criteria',
	            logicAnd: 'And',
	            logicOr: 'Or',
	            rightTitle: 'Indent criteria',
	            title: {
	                0: 'Custom Search Builder',
	                _: 'Custom Search Builder (%d)'
	            },
	            value: 'Value',
	            valueJoiner: 'and'
	        },
	        logic: 'AND',
	        orthogonal: {
	            display: 'display',
	            search: 'filter'
	        },
	        preDefined: false
	    };
	    return SearchBuilder;
	}());

	/*! SearchBuilder 1.0.1
	 * ©2020 SpryMedia Ltd - datatables.net/license/mit
	 */
	// DataTables extensions common UMD. Note that this allows for AMD, CommonJS
	// (with window and jQuery being allowed as parameters to the returned
	// function) or just default browser loading.
	(function (factory) {
	    if (typeof define === 'function' && define.amd) {
	        // AMD
	        define(['jquery', 'datatables.net'], function ($) {
	            return factory($, window, document);
	        });
	    }
	    else if (typeof exports === 'object') {
	        // CommonJS
	        module.exports = function (root, $) {
	            if (!root) {
	                root = window;
	            }
	            if (!$ || !$.fn.dataTable) {
	                $ = require('datatables.net')(root, $).$;
	            }
	            return factory($, root, root.document);
	        };
	    }
	    else {
	        // Browser - assume jQuery has already been loaded
	        factory(window.jQuery, window, document);
	    }
	}(function ($, window, document) {
	    setJQuery$2($);
	    setJQuery$1($);
	    setJQuery($);
	    var DataTable = $.fn.dataTable;
	    $.fn.dataTable.SearchBuilder = SearchBuilder;
	    $.fn.DataTable.SearchBuilder = SearchBuilder;
	    $.fn.dataTable.Group = Group;
	    $.fn.DataTable.Group = Group;
	    $.fn.dataTable.Criteria = Criteria;
	    $.fn.DataTable.Criteria = Criteria;
	    var apiRegister = $.fn.dataTable.Api.register;
	    // Set up object for plugins
	    $.fn.dataTable.ext.searchBuilder = {
	        conditions: {}
	    };
	    $.fn.dataTable.ext.buttons.searchBuilder = {
	        action: function (e, dt, node, config) {
	            e.stopPropagation();
	            this.popover(config._searchBuilder.getNode(), {
	                align: 'dt-container'
	            });
	        },
	        config: {},
	        init: function (dt, node, config) {
	            var sb = new $.fn.dataTable.SearchBuilder(dt, $.extend({
	                filterChanged: function (count, text) {
	                    dt.button(node).text(text);
	                }
	            }, config.config));
	            dt.button(node).text(config.text || dt.i18n('searchBuilder.button', sb.c.i18n.button, 0));
	            config._searchBuilder = sb;
	        },
	        text: null
	    };
	    apiRegister('searchBuilder.getDetails()', function () {
	        var ctx = this.context[0];
	        return ctx._searchBuilder.getDetails();
	    });
	    apiRegister('searchBuilder.rebuild()', function (details) {
	        var ctx = this.context[0];
	        ctx._searchBuilder.rebuild(details);
	        return this;
	    });
	    apiRegister('searchBuilder.container()', function () {
	        var ctx = this.context[0];
	        return ctx._searchBuilder.getNode();
	    });
	    /**
	     * Init function for SearchBuilder
	     * @param settings the settings to be applied
	     * @param options the options for SearchBuilder
	     * @returns JQUERY<HTMLElement> Returns the node of the SearchBuilder
	     */
	    function _init(settings, options) {
	        var api = new DataTable.Api(settings);
	        var opts = options
	            ? options
	            : api.init().searchBuilder || DataTable.defaults.searchBuilder;
	        var searchBuilder = new SearchBuilder(api, opts);
	        var node = searchBuilder.getNode();
	        return node;
	    }
	    // Attach a listener to the document which listens for DataTables initialisation
	    // events so we can automatically initialise
	    $(document).on('preInit.dt.dtsp', function (e, settings, json) {
	        if (e.namespace !== 'dt') {
	            return;
	        }
	        if (settings.oInit.searchBuilder ||
	            DataTable.defaults.searchBuilder) {
	            if (!settings._searchBuilder) {
	                _init(settings);
	            }
	        }
	    });
	    // DataTables `dom` feature option
	    DataTable.ext.feature.push({
	        cFeature: 'Q',
	        fnInit: _init
	    });
	    // DataTables 2 layout feature
	    if (DataTable.ext.features) {
	        DataTable.ext.features.register('searchBuilder', _init);
	    }
	}));

}());
