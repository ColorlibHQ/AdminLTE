.cke_table-faked-selection-editor *::selection, table[data-cke-table-faked-selection-table] *::selection {
	background: transparent;
}

.cke_table-faked-selection-editor {
	/* With love, dedicated for Chrome, until https://bugs.chromium.org/p/chromium/issues/detail?id=702610 is resolved.
	It will force repaint (without reflow) so that selection is properly displayed.	*/
	transform: translateZ( 0 );
}

.cke_table-faked-selection {
	background: darkgray !important;
	color: black;
}
.cke_table-faked-selection a {
	color: black;
}
.cke_editable:focus .cke_table-faked-selection {
	/* We have to use !important here, as td might specify it's own background, thus table selection
	would not be visible. */
	background: #0076cb !important;
	color: white;
}
.cke_editable:focus .cke_table-faked-selection a {
	color: white;
}
.cke_table-faked-selection::-moz-selection, .cke_table-faked-selection ::-moz-selection {
	background: transparent;
}
.cke_table-faked-selection::selection, .cke_table-faked-selection ::selection {
	background: transparent;
}
