/**
 * --------------------------------------------
 * AdminLTE ExpandableTable.js
 * License MIT
 * --------------------------------------------
 */

const ExpandableTable = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'ExpandableTable'
  const DATA_KEY           = 'lte.expandableTable'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  
  const ClassName = {
    TABLE  : '.expandable-table',
    HEADER : '.expandable-header',
    BODY   : 'expandable-body'
  }
  
  const Selector = {
    TABLE: `${ClassName.TABLE}`,
    DATA_SELECTOR: 'expandableTable',
    EXPANDED: 'expanded',
    COLLAPSE: 'collapsed',
    TRIGGER: `${ClassName.HEADER}`
  }

  const Default = {
    
  }

  /**
   * Class Definition
   * ====================================================
   */
  class ExpandableTable {
    constructor(element, config) {
      this._config = config
      this._element = element
    }

    // Public

    init(){
      this._element.children().find(`${ClassName.HEADER}`).each(function (_, header){
        // Next Child to the header will have the same column span as header 
        $(header).next().children().first().attr('colSpan', $(header).children().length)
        
        // Setting up table design for the first time
        const type = $(header).data(Selector.DATA_SELECTOR);
        if(type === Selector.EXPANDED){
          $(header).next().children().first().show()

        }else if(type === Selector.COLLAPSE){
          $(header).next().children().first().hide()
        }
      })
    }

    toggleRow(){
      const type = this._element.data(Selector.DATA_SELECTOR);
      const body = this._element.next().children().first()
      if (type === Selector.EXPANDED) {
        body.slideUp();
        this._element.data(Selector.DATA_SELECTOR, Selector.COLLAPSE);
      }else if (type === Selector.COLLAPSE){
        body.slideDown();
        this._element.data(Selector.DATA_SELECTOR, Selector.EXPANDED);
      }
    }

    // Static
    
    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)
        const _options = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new ExpandableTable($(this), _options)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'init' || config === 'toggleRow') {
          data[config]()
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */
  $(ClassName.TABLE).ready(function () {
    ExpandableTable._jQueryInterface.call($(this), 'init')
  })

  $(document).on('click', Selector.TRIGGER, function(event){
    ExpandableTable._jQueryInterface.call($(this), 'toggleRow');
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = ExpandableTable._jQueryInterface
  $.fn[NAME].Constructor = ExpandableTable
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ExpandableTable._jQueryInterface
  }

  return ExpandableTable
})(jQuery)


export default ExpandableTable;
