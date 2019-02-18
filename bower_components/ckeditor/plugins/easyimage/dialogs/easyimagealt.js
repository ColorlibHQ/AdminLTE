/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("easyimageAlt",function(a){return{title:a.lang.easyimage.commands.altText,minWidth:200,minHeight:30,onOk:function(){var a=CKEDITOR.tools.trim(this.getValueOf("info","txtAlt"));this._.selectedImage.setAttribute("alt",a)},onHide:function(){delete this._.selectedImage},onShow:function(){var b=this.getContentElement("info","txtAlt");this._.selectedImage=a.widgets.focused.parts.image;b.setValue(this._.selectedImage.getAttribute("alt"));b.focus()},contents:[{id:"info",label:a.lang.easyimage.commands.altText,
accessKey:"I",elements:[{type:"text",id:"txtAlt",label:a.lang.easyimage.commands.altText}]}]}});