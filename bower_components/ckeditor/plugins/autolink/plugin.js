/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){var d=/^(https?|ftp):\/\/(-\.)?([^\s\/?\.#]+\.?)+(\/[^\s]*)?[^\s\.,]$/ig,e=/"/g;CKEDITOR.plugins.add("autolink",{requires:"clipboard",init:function(c){c.on("paste",function(b){var a=b.data.dataValue;b.data.dataTransfer.getTransferType(c)==CKEDITOR.DATA_TRANSFER_INTERNAL||-1<a.indexOf("\x3c")||(a=a.replace(d,'\x3ca href\x3d"'+a.replace(e,"%22")+'"\x3e$\x26\x3c/a\x3e'),a!=b.data.dataValue&&(b.data.type="html"),b.data.dataValue=a)})}})})();