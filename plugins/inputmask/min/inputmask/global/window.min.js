/*!
* global/window.min.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.9
*/

if(typeof define==="function"&&define.amd)define(function(){return typeof window!=="undefined"?window:new(eval("require('jsdom').JSDOM"))("").window});else if(typeof exports==="object")module.exports=typeof window!=="undefined"?window:new(eval("require('jsdom').JSDOM"))("").window;