/*!
 * FullCalendar v3.6.2 Google Calendar Plugin
 * Docs & License: https://fullcalendar.io/
 * (c) 2017 Adam Shaw
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery' ], factory);
	}
	else if (typeof exports === 'object') { // Node/CommonJS
		module.exports = factory(require('jquery'));
	}
	else {
		factory(jQuery);
	}
})(function($) {


var FC = $.fullCalendar;
var Promise = FC.Promise;
var EventSource = FC.EventSource;
var JsonFeedEventSource = FC.JsonFeedEventSource;
var EventSourceParser = FC.EventSourceParser;
var applyAll = FC.applyAll;

;;

var GcalEventSource = EventSource.extend({

	// TODO: eventually remove "googleCalendar" prefix (API-breaking)
	googleCalendarApiKey: null,
	googleCalendarId: null,
	googleCalendarError: null, // optional function
	ajaxSettings: null,


	constructor: function() {
		EventSource.apply(this, arguments);
		this.ajaxSettings = {};
	},


	fetch: function(start, end, timezone) {
		var _this = this;
		var url = this.buildUrl();
		var requestParams = this.buildRequestParams(start, end, timezone);
		var ajaxSettings = this.ajaxSettings;
		var onSuccess = ajaxSettings.success;

		if (!requestParams) { // could have failed
			return Promise.reject();
		}

		this.calendar.pushLoading();

		return Promise.construct(function(onResolve, onReject) {
			$.ajax($.extend(
				{}, // destination
				JsonFeedEventSource.AJAX_DEFAULTS,
				ajaxSettings,
				{
					url: url,
					data: requestParams,
					success: function(responseData) {
						var rawEventDefs;
						var successRes;

						_this.calendar.popLoading();

						if (responseData.error) {
							_this.reportError('Google Calendar API: ' + responseData.error.message, responseData.error.errors);
							onReject();
						}
						else if (responseData.items) {
							rawEventDefs = _this.gcalItemsToRawEventDefs(
								responseData.items,
								requestParams.timeZone
							);

							successRes = applyAll(
								onSuccess,
								this, // forward `this`
								// call the success handler(s) and allow it to return a new events array
								[ rawEventDefs ].concat(Array.prototype.slice.call(arguments, 1))
							);

							if ($.isArray(successRes)) {
								rawEventDefs = successRes;
							}

							onResolve(_this.parseEventDefs(rawEventDefs));
						}
					}
				}
			));
		});
	},


	gcalItemsToRawEventDefs: function(items, gcalTimezone) {
		var _this = this;

		return items.map(function(item) {
			return _this.gcalItemToRawEventDef(item, gcalTimezone);
		});
	},


	gcalItemToRawEventDef: function(item, gcalTimezone) {
		var url = item.htmlLink || null;

		// make the URLs for each event show times in the correct timezone
		if (url && gcalTimezone) {
			url = injectQsComponent(url, 'ctz=' + gcalTimezone);
		}

		return {
			id: item.id,
			title: item.summary,
			start: item.start.dateTime || item.start.date, // try timed. will fall back to all-day
			end: item.end.dateTime || item.end.date, // same
			url: url,
			location: item.location,
			description: item.description
		};
	},


	buildUrl: function() {
		return GcalEventSource.API_BASE + '/' +
			encodeURIComponent(this.googleCalendarId) +
			'/events?callback=?'; // jsonp
	},


	buildRequestParams: function(start, end, timezone) {
		var apiKey = this.googleCalendarApiKey || this.calendar.opt('googleCalendarApiKey');
		var params;

		if (!apiKey) {
			this.reportError("Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/");
			return null;
		}

		// The API expects an ISO8601 datetime with a time and timezone part.
		// Since the calendar's timezone offset isn't always known, request the date in UTC and pad it by a day on each
		// side, guaranteeing we will receive all events in the desired range, albeit a superset.
		// .utc() will set a zone and give it a 00:00:00 time.
		if (!start.hasZone()) {
			start = start.clone().utc().add(-1, 'day');
		}
		if (!end.hasZone()) {
			end = end.clone().utc().add(1, 'day');
		}

		params = $.extend(
			this.ajaxSettings.data || {},
			{
				key: apiKey,
				timeMin: start.format(),
				timeMax: end.format(),
				singleEvents: true,
				maxResults: 9999
			}
		);

		if (timezone && timezone !== 'local') {
			// when sending timezone names to Google, only accepts underscores, not spaces
			params.timeZone = timezone.replace(' ', '_');
		}

		return params;
	},


	reportError: function(message, apiErrorObjs) {
		var calendar = this.calendar;
		var calendarOnError = calendar.opt('googleCalendarError');
		var errorObjs = apiErrorObjs || [ { message: message } ]; // to be passed into error handlers

		if (this.googleCalendarError) {
			this.googleCalendarError.apply(calendar, errorObjs);
		}

		if (calendarOnError) {
			calendarOnError.apply(calendar, errorObjs);
		}

		// print error to debug console
		FC.warn.apply(null, [ message ].concat(apiErrorObjs || []));
	},


	getPrimitive: function() {
		return this.googleCalendarId;
	},


	applyManualStandardProps: function(rawProps) {
		var superSuccess = EventSource.prototype.applyManualStandardProps.apply(this, arguments);
		var googleCalendarId = rawProps.googleCalendarId;

		if (googleCalendarId == null && rawProps.url) {
			googleCalendarId = parseGoogleCalendarId(rawProps.url);
		}

		if (googleCalendarId != null) {
			this.googleCalendarId = googleCalendarId;

			return superSuccess;
		}

		return false;
	},


	applyMiscProps: function(rawProps) {
		$.extend(this.ajaxSettings, rawProps);
	}

});


GcalEventSource.API_BASE = 'https://www.googleapis.com/calendar/v3/calendars';


GcalEventSource.defineStandardProps({
	// manually process...
	url: false,
	googleCalendarId: false,

	// automatically transfer...
	googleCalendarApiKey: true,
	googleCalendarError: true
});


GcalEventSource.parse = function(rawInput, calendar) {
	var rawProps;

	if (typeof rawInput === 'object') { // long form. might fail in applyManualStandardProps
		rawProps = rawInput;
	}
	else if (typeof rawInput === 'string') { // short form
		rawProps = { url: rawInput }; // url will be parsed with parseGoogleCalendarId
	}

	if (rawProps) {
		return EventSource.parse.call(this, rawProps, calendar);
	}

	return false;
};


function parseGoogleCalendarId(url) {
	var match;

	// detect if the ID was specified as a single string.
	// will match calendars like "asdf1234@calendar.google.com" in addition to person email calendars.
	if (/^[^\/]+@([^\/\.]+\.)*(google|googlemail|gmail)\.com$/.test(url)) {
		return url;
	}
	// try to scrape it out of a V1 or V3 API feed URL
	else if (
		(match = /^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^\/]*)/.exec(url)) ||
		(match = /^https?:\/\/www.google.com\/calendar\/feeds\/([^\/]*)/.exec(url))
	) {
		return decodeURIComponent(match[1]);
	}
}


// Injects a string like "arg=value" into the querystring of a URL
function injectQsComponent(url, component) {
	// inject it after the querystring but before the fragment
	return url.replace(/(\?.*?)?(#|$)/, function(whole, qs, hash) {
		return (qs ? qs + '&' : '?') + component + hash;
	});
}


// expose

EventSourceParser.registerClass(GcalEventSource);

FC.GcalEventSource = GcalEventSource;

;;

});
