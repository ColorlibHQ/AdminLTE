/*!
	* Author: Abdullah A Almsaeed
	* Date: 4 Jan 2014
	* Description:
	*      This file should be included in all pages
	*!*/

/*
	* Global variables. If you change any of these vars, don't forget
	* to change the values in the less files!
	*/
var left_side_width = 230; //Sidebar width in pixels

$(function () {
		"use strict";

		//Enable sidebar toggle
		$("[data-toggle='offcanvas']").click(function (e) {
				e.preventDefault();
				//Enable sidebar push menu
				$("body").toggleClass('sidebar-collapse');
				$("body").toggleClass('sidebar-open');
		});

		//Add hover support for touch devices
		$('.btn').bind('touchstart', function () {
				$(this).addClass('hover');
		}).bind('touchend', function () {
				$(this).removeClass('hover');
		});

		//Activate tooltips
		$("[data-toggle='tooltip']").tooltip();

		/*
			* Add collapse and remove events to boxes
			*/
		$("[data-widget='collapse']").click(function () {
				//Find the box parent
				var box = $(this).parents(".box").first();
				//Find the body and the footer
				var bf = box.find(".box-body, .box-footer");
				if (!box.hasClass("collapsed-box")) {
						box.addClass("collapsed-box");
						//Convert minus into plus
						$(this).children(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
						bf.slideUp();
				} else {
						box.removeClass("collapsed-box");
						//Convert plus into minus
						$(this).children(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
						bf.slideDown();
				}
		});

		/*
			* ADD SLIMSCROLL TO THE TOP NAV DROPDOWNS
			* ---------------------------------------
			*/
		$(".navbar .menu").slimscroll({
				height: "200px",
				alwaysVisible: false,
				size: "3px"
		}).css("width", "100%");

		/*
			* INITIALIZE BUTTON TOGGLE
			* ------------------------
			*/
		$('.btn-group[data-toggle="btn-toggle"]').each(function () {
				var group = $(this);
				$(this).find(".btn").click(function (e) {
						group.find(".btn.active").removeClass("active");
						$(this).addClass("active");
						e.preventDefault();
				});

		});

		$("[data-widget='remove']").click(function () {
				//Find the box parent
				var box = $(this).parents(".box").first();
				box.slideUp();
		});

		/* Sidebar tree view */
		$(".sidebar .treeview").tree();

		/*
			* Make sure that the sidebar is streched full height
			* ---------------------------------------------
			* We are gonna assign a min-height value every time the
			* wrapper gets resized and upon page load. We will use
			* Ben Alman's method for detecting the resize event.
			*
			**/
		function _fix() {
				//Get window height and the wrapper height
				var neg = $('.main-header').height() - ($('.main-footer').height());				
				var window_height = $(window).height()
				var sidebar_height = $(".left-side").height();
				if (window_height >= sidebar_height) {
						$(".content, .left-side").css('min-height', window_height - neg);
				} else {
						$(".content, .left-side").css('min-height', sidebar_height - neg);
				}
		}
		//Fire upon load
		_fix();
		//Fire when wrapper is resized
		$(".wrapper").resize(function () {
				_fix();
				fix_sidebar();
		});

		//Fix the fixed layout sidebar scroll bug
		fix_sidebar();

		/*
			* We are gonna initialize all checkbox and radio inputs to
			* iCheck plugin in.
			* You can find the documentation at http://fronteed.com/iCheck/
			*/
		$("input[type='checkbox']:not(.simple), input[type='radio']:not(.simple)").iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal'
		});

});
function fix_sidebar() {
		//Make sure the body tag has the .fixed class
		if (!$("body").hasClass("fixed")) {
				return;
		}

		//Add slimscroll
		$(".sidebar").slimscroll({
				height: ($(window).height() - $(".header").height()) + "px",
				color: "rgba(0,0,0,0.2)"
		});
}

/*END DEMO*/

/*
	* BOX REFRESH BUTTON
	* ------------------
	* This is a custom plugin to use with the compenet BOX. It allows you to add
	* a refresh button to the box. It converts the box's state to a loading state.
	*
	* USAGE:
	*  $("#box-widget").boxRefresh( options );
	* */
(function ($) {
		"use strict";

		$.fn.boxRefresh = function (options) {

				// Render options
				var settings = $.extend({
						//Refressh button selector
						trigger: ".refresh-btn",
						//File source to be loaded (e.g: ajax/src.php)
						source: "",
						//Callbacks
						onLoadStart: function (box) {
						}, //Right after the button has been clicked
						onLoadDone: function (box) {
						} //When the source has been loaded

				}, options);

				//The overlay
				var overlay = $('<div class="overlay"></div><div class="loading-img"></div>');

				return this.each(function () {
						//if a source is specified
						if (settings.source === "") {
								if (console) {
										console.log("Please specify a source first - boxRefresh()");
								}
								return;
						}
						//the box
						var box = $(this);
						//the button
						var rBtn = box.find(settings.trigger).first();

						//On trigger click
						rBtn.click(function (e) {
								e.preventDefault();
								//Add loading overlay
								start(box);

								//Perform ajax call
								box.find(".box-body").load(settings.source, function () {
										done(box);
								});


						});

				});

				function start(box) {
						//Add overlay and loading img
						box.append(overlay);

						settings.onLoadStart.call(box);
				}

				function done(box) {
						//Remove overlay and loading img
						box.find(overlay).remove();

						settings.onLoadDone.call(box);
				}

		};

})(jQuery);

/*
	* SIDEBAR MENU
	* ------------
	* This is a custom plugin for the sidebar menu. It provides a tree view.
	*
	* Usage:
	* $(".sidebar).tree();
	*
	* Note: This plugin does not accept any options. Instead, it only requires a class
	*       added to the element that contains a sub-menu.
	*
	* When used with the sidebar, for example, it would look something like this:
	* <ul class='sidebar-menu'>
	*      <li class="treeview active">
	*          <a href="#>Menu</a>
	*          <ul class='treeview-menu'>
	*              <li class='active'><a href=#>Level 1</a></li>
	*          </ul>
	*      </li>
	* </ul>
	*
	* Add .active class to <li> elements if you want the menu to be open automatically
	* on page load. See above for an example.
	*/
(function ($) {
		$.fn.tree = function () {
						$(".sidebar li a").click(function (e) {
								//Get the clicked link and the next element
								var $this = $(this);
								var checkElement = $this.next();

								//Check if the next element is a menu and is visible
								if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
										//Close the menu
										checkElement.slideUp('normal', function () {
												checkElement.removeClass('menu-open');
										});
										checkElement.parent("li").removeClass("active");
								}
								//If the menu is not visible
								else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
										//Get the parent menu
										var parent = $this.parents('ul').first();
										//Close all open menus within the parent
										var ul = parent.find('ul:visible').slideUp('normal');
										//Remove the menu-open class from the parent
										ul.removeClass('menu-open');
										//Get the parent li
										var parent_li = $this.parent("li");

										//Open the target menu and add the menu-open class
										checkElement.slideDown('normal', function () {
												//Add the class active to the parent li
												checkElement.addClass('menu-open');
												parent.find('li.active').removeClass('active');
												parent_li.addClass('active');
										});
								}

								if (checkElement.is('.treeview-menu'))
										e.preventDefault();
						});
		};
}(jQuery));
/*
	(function ($) {
	"use strict";

	$.fn.tree = function () {

	return this.each(function () {
	var btn = $(this).children("a").first();
	var menu = $(this).children(".treeview-menu").first();
	var isActive = $(this).hasClass('active');

	//initialize already active menus
	if (isActive) {
	menu.show();
	btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
	}
	//Slide open or close the menu on link click
	btn.click(function (e) {
	e.preventDefault();
	if (isActive) {
	//Slide up to close menu
	menu.slideUp();
	isActive = false;
	btn.children(".fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
	btn.parent("li").removeClass("active");
	} else {
	//Slide down to open menu
	menu.slideDown();
	isActive = true;
	btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
	btn.parent("li").addClass("active");
	}
	});

	/* Add margins to submenu elements to give it a tree look *
	menu.find("li > a").each(function () {
	var pad = parseInt($(this).css("margin-left")) + 10;

	$(this).css({"margin-left": pad + "px"});
	});

	});

	};


	}(jQuery));
	*/

/*
	* TODO LIST CUSTOM PLUGIN
	* -----------------------
	* This plugin depends on iCheck plugin for checkbox and radio inputs
	*/
(function ($) {
		"use strict";

		$.fn.todolist = function (options) {
				// Render options
				var settings = $.extend({
						//When the user checks the input
						onCheck: function (ele) {
						},
						//When the user unchecks the input
						onUncheck: function (ele) {
						}
				}, options);

				return this.each(function () {
						$('input', this).on('ifChecked', function (event) {
								var ele = $(this).parents("li").first();
								ele.toggleClass("done");
								settings.onCheck.call(ele);
						});

						$('input', this).on('ifUnchecked', function (event) {
								var ele = $(this).parents("li").first();
								ele.toggleClass("done");
								settings.onUncheck.call(ele);
						});
				});
		};

}(jQuery));

/* CENTER ELEMENTS */
(function ($) {
		"use strict";
		jQuery.fn.center = function (parent) {
				if (parent) {
						parent = this.parent();
				} else {
						parent = window;
				}
				this.css({
						"position": "absolute",
						"top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
						"left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
				});
				return this;
		}
}(jQuery));

/*!
	* SlimScroll https://github.com/rochal/jQuery-slimScroll
	* =======================================================
	*
	* Copyright (c) 2011 Piotr Rochala (http://rocha.la) Dual licensed under the MIT
	*/
(function (f) {
		jQuery.fn.extend({slimScroll: function (h) {
						var a = f.extend({width: "auto", height: "250px", size: "7px", color: "#000", position: "right", distance: "1px", start: "top", opacity: 0.4, alwaysVisible: !1, disableFadeOut: !1, railVisible: !1, railColor: "#333", railOpacity: 0.2, railDraggable: !0, railClass: "slimScrollRail", barClass: "slimScrollBar", wrapperClass: "slimScrollDiv", allowPageScroll: !1, wheelStep: 20, touchScrollStep: 200, borderRadius: "0px", railBorderRadius: "0px"}, h);
						this.each(function () {
								function r(d) {
										if (s) {
												d = d ||
																				window.event;
												var c = 0;
												d.wheelDelta && (c = -d.wheelDelta / 120);
												d.detail && (c = d.detail / 3);
												f(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && m(c, !0);
												d.preventDefault && !k && d.preventDefault();
												k || (d.returnValue = !1)
										}
								}
								function m(d, f, h) {
										k = !1;
										var e = d, g = b.outerHeight() - c.outerHeight();
										f && (e = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), e = Math.min(Math.max(e, 0), g), e = 0 < d ? Math.ceil(e) : Math.floor(e), c.css({top: e + "px"}));
										l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight());
										e = l * (b[0].scrollHeight - b.outerHeight());
										h && (e = d, d = e / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), g), c.css({top: d + "px"}));
										b.scrollTop(e);
										b.trigger("slimscrolling", ~~e);
										v();
										p()
								}
								function C() {
										window.addEventListener ? (this.addEventListener("DOMMouseScroll", r, !1), this.addEventListener("mousewheel", r, !1), this.addEventListener("MozMousePixelScroll", r, !1)) : document.attachEvent("onmousewheel", r)
								}
								function w() {
										u = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), D);
										c.css({height: u + "px"});
										var a = u == b.outerHeight() ? "none" : "block";
										c.css({display: a})
								}
								function v() {
										w();
										clearTimeout(A);
										l == ~~l ? (k = a.allowPageScroll, B != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1;
										B = l;
										u >= b.outerHeight() ? k = !0 : (c.stop(!0, !0).fadeIn("fast"), a.railVisible && g.stop(!0, !0).fadeIn("fast"))
								}
								function p() {
										a.alwaysVisible || (A = setTimeout(function () {
												a.disableFadeOut && s || (x || y) || (c.fadeOut("slow"), g.fadeOut("slow"))
										}, 1E3))
								}
								var s, x, y, A, z, u, l, B, D = 30, k = !1, b = f(this);
								if (b.parent().hasClass(a.wrapperClass)) {
										var n = b.scrollTop(),
																		c = b.parent().find("." + a.barClass), g = b.parent().find("." + a.railClass);
										w();
										if (f.isPlainObject(h)) {
												if ("height"in h && "auto" == h.height) {
														b.parent().css("height", "auto");
														b.css("height", "auto");
														var q = b.parent().parent().height();
														b.parent().css("height", q);
														b.css("height", q)
												}
												if ("scrollTo"in h)
														n = parseInt(a.scrollTo);
												else if ("scrollBy"in h)
														n += parseInt(a.scrollBy);
												else if ("destroy"in h) {
														c.remove();
														g.remove();
														b.unwrap();
														return
												}
												m(n, !1, !0)
										}
								} else {
										a.height = "auto" == a.height ? b.parent().height() : a.height;
										n = f("<div></div>").addClass(a.wrapperClass).css({position: "relative",
												overflow: "hidden", width: a.width, height: a.height});
										b.css({overflow: "hidden", width: a.width, height: a.height});
										var g = f("<div></div>").addClass(a.railClass).css({width: a.size, height: "100%", position: "absolute", top: 0, display: a.alwaysVisible && a.railVisible ? "block" : "none", "border-radius": a.railBorderRadius, background: a.railColor, opacity: a.railOpacity, zIndex: 90}), c = f("<div></div>").addClass(a.barClass).css({background: a.color, width: a.size, position: "absolute", top: 0, opacity: a.opacity, display: a.alwaysVisible ?
																				"block" : "none", "border-radius": a.borderRadius, BorderRadius: a.borderRadius, MozBorderRadius: a.borderRadius, WebkitBorderRadius: a.borderRadius, zIndex: 99}), q = "right" == a.position ? {right: a.distance} : {left: a.distance};
										g.css(q);
										c.css(q);
										b.wrap(n);
										b.parent().append(c);
										b.parent().append(g);
										a.railDraggable && c.bind("mousedown", function (a) {
												var b = f(document);
												y = !0;
												t = parseFloat(c.css("top"));
												pageY = a.pageY;
												b.bind("mousemove.slimscroll", function (a) {
														currTop = t + a.pageY - pageY;
														c.css("top", currTop);
														m(0, c.position().top, !1)
												});
												b.bind("mouseup.slimscroll", function (a) {
														y = !1;
														p();
														b.unbind(".slimscroll")
												});
												return!1
										}).bind("selectstart.slimscroll", function (a) {
												a.stopPropagation();
												a.preventDefault();
												return!1
										});
										g.hover(function () {
												v()
										}, function () {
												p()
										});
										c.hover(function () {
												x = !0
										}, function () {
												x = !1
										});
										b.hover(function () {
												s = !0;
												v();
												p()
										}, function () {
												s = !1;
												p()
										});
										b.bind("touchstart", function (a, b) {
												a.originalEvent.touches.length && (z = a.originalEvent.touches[0].pageY)
										});
										b.bind("touchmove", function (b) {
												k || b.originalEvent.preventDefault();
												b.originalEvent.touches.length &&
																				(m((z - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), z = b.originalEvent.touches[0].pageY)
										});
										w();
										"bottom" === a.start ? (c.css({top: b.outerHeight() - c.outerHeight()}), m(0, !0)) : "top" !== a.start && (m(f(a.start).position().top, null, !0), a.alwaysVisible || c.hide());
										C()
								}
						});
						return this
				}});
		jQuery.fn.extend({slimscroll: jQuery.fn.slimScroll})
})(jQuery);

/*! iCheck v1.0.1 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function (h) {
		function F(a, b, d) {
				var c = a[0], e = /er/.test(d) ? m : /bl/.test(d) ? s : l, f = d == H ? {checked: c[l], disabled: c[s], indeterminate: "true" == a.attr(m) || "false" == a.attr(w)} : c[e];
				if (/^(ch|di|in)/.test(d) && !f)
						D(a, e);
				else if (/^(un|en|de)/.test(d) && f)
						t(a, e);
				else if (d == H)
						for (e in f)
								f[e] ? D(a, e, !0) : t(a, e, !0);
				else if (!b || "toggle" == d) {
						if (!b)
								a[p]("ifClicked");
						f ? c[n] !== u && t(a, e) : D(a, e)
				}
		}
		function D(a, b, d) {
				var c = a[0], e = a.parent(), f = b == l, A = b == m, B = b == s, K = A ? w : f ? E : "enabled", p = k(a, K + x(c[n])), N = k(a, b + x(c[n]));
				if (!0 !== c[b]) {
						if (!d &&
														b == l && c[n] == u && c.name) {
								var C = a.closest("form"), r = 'input[name="' + c.name + '"]', r = C.length ? C.find(r) : h(r);
								r.each(function () {
										this !== c && h(this).data(q) && t(h(this), b)
								})
						}
						A ? (c[b] = !0, c[l] && t(a, l, "force")) : (d || (c[b] = !0), f && c[m] && t(a, m, !1));
						L(a, f, b, d)
				}
				c[s] && k(a, y, !0) && e.find("." + I).css(y, "default");
				e[v](N || k(a, b) || "");
				B ? e.attr("aria-disabled", "true") : e.attr("aria-checked", A ? "mixed" : "true");
				e[z](p || k(a, K) || "")
		}
		function t(a, b, d) {
				var c = a[0], e = a.parent(), f = b == l, h = b == m, q = b == s, p = h ? w : f ? E : "enabled", t = k(a, p + x(c[n])),
												u = k(a, b + x(c[n]));
				if (!1 !== c[b]) {
						if (h || !d || "force" == d)
								c[b] = !1;
						L(a, f, p, d)
				}
				!c[s] && k(a, y, !0) && e.find("." + I).css(y, "pointer");
				e[z](u || k(a, b) || "");
				q ? e.attr("aria-disabled", "false") : e.attr("aria-checked", "false");
				e[v](t || k(a, p) || "")
		}
		function M(a, b) {
				if (a.data(q)) {
						a.parent().html(a.attr("style", a.data(q).s || ""));
						if (b)
								a[p](b);
						a.off(".i").unwrap();
						h(G + '[for="' + a[0].id + '"]').add(a.closest(G)).off(".i")
				}
		}
		function k(a, b, d) {
				if (a.data(q))
						return a.data(q).o[b + (d ? "" : "Class")]
		}
		function x(a) {
				return a.charAt(0).toUpperCase() +
												a.slice(1)
		}
		function L(a, b, d, c) {
				if (!c) {
						if (b)
								a[p]("ifToggled");
						a[p]("ifChanged")[p]("if" + x(d))
				}
		}
		var q = "iCheck", I = q + "-helper", u = "radio", l = "checked", E = "un" + l, s = "disabled", w = "determinate", m = "in" + w, H = "update", n = "type", v = "addClass", z = "removeClass", p = "trigger", G = "label", y = "cursor", J = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
		h.fn[q] = function (a, b) {
				var d = 'input[type="checkbox"], input[type="' + u + '"]', c = h(), e = function (a) {
						a.each(function () {
								var a = h(this);
								c = a.is(d) ?
																c.add(a) : c.add(a.find(d))
						})
				};
				if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))
						return a = a.toLowerCase(), e(this), c.each(function () {
								var c = h(this);
								"destroy" == a ? M(c, "ifDestroyed") : F(c, !0, a);
								h.isFunction(b) && b()
						});
				if ("object" != typeof a && a)
						return this;
				var f = h.extend({checkedClass: l, disabledClass: s, indeterminateClass: m, labelHover: !0, aria: !1}, a), k = f.handle, B = f.hoverClass || "hover", x = f.focusClass || "focus", w = f.activeClass || "active", y = !!f.labelHover, C = f.labelHoverClass ||
												"hover", r = ("" + f.increaseArea).replace("%", "") | 0;
				if ("checkbox" == k || k == u)
						d = 'input[type="' + k + '"]';
				-50 > r && (r = -50);
				e(this);
				return c.each(function () {
						var a = h(this);
						M(a);
						var c = this, b = c.id, e = -r + "%", d = 100 + 2 * r + "%", d = {position: "absolute", top: e, left: e, display: "block", width: d, height: d, margin: 0, padding: 0, background: "#fff", border: 0, opacity: 0}, e = J ? {position: "absolute", visibility: "hidden"} : r ? d : {position: "absolute", opacity: 0}, k = "checkbox" == c[n] ? f.checkboxClass || "icheckbox" : f.radioClass || "i" + u, m = h(G + '[for="' + b + '"]').add(a.closest(G)),
														A = !!f.aria, E = q + "-" + Math.random().toString(36).replace("0.", ""), g = '<div class="' + k + '" ' + (A ? 'role="' + c[n] + '" ' : "");
						m.length && A && m.each(function () {
								g += 'aria-labelledby="';
								this.id ? g += this.id : (this.id = E, g += E);
								g += '"'
						});
						g = a.wrap(g + "/>")[p]("ifCreated").parent().append(f.insert);
						d = h('<ins class="' + I + '"/>').css(d).appendTo(g);
						a.data(q, {o: f, s: a.attr("style")}).css(e);
						f.inheritClass && g[v](c.className || "");
						f.inheritID && b && g.attr("id", q + "-" + b);
						"static" == g.css("position") && g.css("position", "relative");
						F(a, !0, H);
						if (m.length)
								m.on("click.i mouseover.i mouseout.i touchbegin.i touchend.i", function (b) {
										var d = b[n], e = h(this);
										if (!c[s]) {
												if ("click" == d) {
														if (h(b.target).is("a"))
																return;
														F(a, !1, !0)
												} else
														y && (/ut|nd/.test(d) ? (g[z](B), e[z](C)) : (g[v](B), e[v](C)));
												if (J)
														b.stopPropagation();
												else
														return!1
										}
								});
						a.on("click.i focus.i blur.i keyup.i keydown.i keypress.i", function (b) {
								var d = b[n];
								b = b.keyCode;
								if ("click" == d)
										return!1;
								if ("keydown" == d && 32 == b)
										return c[n] == u && c[l] || (c[l] ? t(a, l) : D(a, l)), !1;
								if ("keyup" == d && c[n] == u)
										!c[l] && D(a, l);
								else if (/us|ur/.test(d))
										g["blur" ==
																		d ? z : v](x)
						});
						d.on("click mousedown mouseup mouseover mouseout touchbegin.i touchend.i", function (b) {
								var d = b[n], e = /wn|up/.test(d) ? w : B;
								if (!c[s]) {
										if ("click" == d)
												F(a, !1, !0);
										else {
												if (/wn|er|in/.test(d))
														g[v](e);
												else
														g[z](e + " " + w);
												if (m.length && y && e == B)
														m[/ut|nd/.test(d) ? z : v](C)
										}
										if (J)
												b.stopPropagation();
										else
												return!1
								}
						})
				})
		}
})(window.jQuery || window.Zepto);