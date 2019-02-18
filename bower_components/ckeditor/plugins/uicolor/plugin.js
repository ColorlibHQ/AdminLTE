/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.add("uicolor",{requires:"dialog",lang:"af,ar,az,bg,ca,cs,cy,da,de,de-ch,el,en,en-au,en-gb,eo,es,es-mx,et,eu,fa,fi,fr,fr-ca,gl,he,hr,hu,id,it,ja,km,ko,ku,lv,mk,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sv,tr,tt,ug,uk,vi,zh,zh-cn",icons:"uicolor",hidpi:!0,init:function(a){var b=new CKEDITOR.dialogCommand("uicolor");b.editorFocus=!1;CKEDITOR.dialog.add("uicolor",this.path+"dialogs/uicolor.js");a.addCommand("uicolor",b);a.ui.addButton&&a.ui.addButton("UIColor",{label:a.lang.uicolor.title,
command:"uicolor",toolbar:"tools,1"})}});