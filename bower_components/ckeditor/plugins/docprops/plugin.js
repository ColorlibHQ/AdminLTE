/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.add("docprops",{requires:"wysiwygarea,dialog,colordialog",lang:"af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",icons:"docprops,docprops-rtl",hidpi:!0,init:function(a){var b=new CKEDITOR.dialogCommand("docProps");b.modes={wysiwyg:a.config.fullPage};b.allowedContent={body:{styles:"*",attributes:"dir"},
html:{attributes:"lang,xml:lang"}};b.requiredContent="body";a.addCommand("docProps",b);CKEDITOR.dialog.add("docProps",this.path+"dialogs/docprops.js");a.ui.addButton&&a.ui.addButton("DocProps",{label:a.lang.docprops.label,command:"docProps",toolbar:"document,30"})}});