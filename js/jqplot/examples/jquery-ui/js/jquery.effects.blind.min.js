/*
 * jQuery UI Effects Blind 1.9pre
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){var n=/up|down|vertical/,o=/up|left|vertical|horizontal/;b.effects.effect.blind=function(g,p){var a=b(this),i=["position","top","bottom","left","right","height","width"],l=b.effects.setMode(a,g.mode||"hide"),e=g.direction||"up",f=n.test(e),h=f?"height":"width",m=f?"top":"left";e=o.test(e);var j={},k=l==="show",c,d;a.parent().is(".ui-effects-wrapper")?b.effects.save(a.parent(),i):b.effects.save(a,i);a.show();d=parseInt(a.css("top"),10);c=b.effects.createWrapper(a).css({overflow:"hidden"});
d=f?c[h]()+d:c[h]();j[h]=k?d:0;if(!e){a.css(f?"bottom":"right",0).css(f?"top":"left","").css({position:"absolute"});j[m]=k?0:d}if(k){c.css(h,0);e||c.css(m,d)}c.animate(j,{duration:g.duration,easing:g.easing,queue:false,complete:function(){l==="hide"&&a.hide();b.effects.restore(a,i);b.effects.removeWrapper(a);p()}})}})(jQuery);
