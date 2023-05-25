/*! FixedColumns 4.2.2
 * © SpryMedia Ltd - datatables.net/license
 */
/**
 * @summary     FixedColumns
 * @description FixedColumns extension for DataTables
 * @version     4.2.2
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @copyright   SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 * MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
/// <reference path = '../node_modules/@types/jquery/index.d.ts'
import FixedColumns, { setJQuery as fixedColumnsJQuery } from './FixedColumns';
fixedColumnsJQuery($);
$.fn.dataTable.FixedColumns = FixedColumns;
$.fn.DataTable.FixedColumns = FixedColumns;
var apiRegister = DataTable.Api.register;
apiRegister('fixedColumns()', function () {
    return this;
});
apiRegister('fixedColumns().left()', function (newVal) {
    var ctx = this.context[0];
    if (newVal !== undefined) {
        ctx._fixedColumns.left(newVal);
        return this;
    }
    else {
        return ctx._fixedColumns.left();
    }
});
apiRegister('fixedColumns().right()', function (newVal) {
    var ctx = this.context[0];
    if (newVal !== undefined) {
        ctx._fixedColumns.right(newVal);
        return this;
    }
    else {
        return ctx._fixedColumns.right();
    }
});
DataTable.ext.buttons.fixedColumns = {
    action: function (e, dt, node, config) {
        if ($(node).attr('active')) {
            $(node).removeAttr('active').removeClass('active');
            dt.fixedColumns().left(0);
            dt.fixedColumns().right(0);
        }
        else {
            $(node).attr('active', 'true').addClass('active');
            dt.fixedColumns().left(config.config.left);
            dt.fixedColumns().right(config.config.right);
        }
    },
    config: {
        left: 1,
        right: 0
    },
    init: function (dt, node, config) {
        if (dt.settings()[0]._fixedColumns === undefined) {
            _init(dt.settings(), config);
        }
        $(node).attr('active', 'true').addClass('active');
        dt.button(node).text(config.text || dt.i18n('buttons.fixedColumns', dt.settings()[0]._fixedColumns.c.i18n.button));
    },
    text: null
};
function _init(settings, options) {
    if (options === void 0) { options = null; }
    var api = new DataTable.Api(settings);
    var opts = options
        ? options
        : api.init().fixedColumns || DataTable.defaults.fixedColumns;
    var fixedColumns = new FixedColumns(api, opts);
    return fixedColumns;
}
// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on('plugin-init.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    if (settings.oInit.fixedColumns ||
        DataTable.defaults.fixedColumns) {
        if (!settings._fixedColumns) {
            _init(settings, null);
        }
    }
});
