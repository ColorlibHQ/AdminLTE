/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){CKEDITOR.plugins.add("uploadfile",{requires:"uploadwidget,link",init:function(a){if(CKEDITOR.plugins.clipboard.isFileApiSupported){var b=CKEDITOR.fileTools;b.getUploadUrl(a.config)?b.addUploadWidget(a,"uploadfile",{uploadUrl:b.getUploadUrl(a.config),fileToElement:function(c){var a=new CKEDITOR.dom.element("a");a.setText(c.name);a.setAttribute("href","#");return a},onUploaded:function(a){this.replaceWith('\x3ca href\x3d"'+a.url+'" target\x3d"_blank"\x3e'+a.fileName+"\x3c/a\x3e")}}):CKEDITOR.error("uploadfile-config")}}})})();