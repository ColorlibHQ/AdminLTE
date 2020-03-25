(function(jsGrid) {

    jsGrid.locales["zh-tw"] = {
        grid: {
            noDataContent: "暫無資料",
            deleteConfirm: "確認刪除？",
            pagerFormat: "頁碼: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} / {pageCount}",
            pagePrevText: "上一頁",
            pageNextText: "下一頁",
            pageFirstText: "第一頁",
            pageLastText: "最後一頁",
            loadMessage: "請稍候...",
            invalidMessage: "輸入資料不正確"
        },

        loadIndicator: {
            message: "載入中..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "切換為搜尋",
                insertModeButtonTooltip: "切換為新增",
                editButtonTooltip: "編輯",
                deleteButtonTooltip: "刪除",
                searchButtonTooltip: "搜尋",
                clearFilterButtonTooltip: "清除搜尋條件",
                insertButtonTooltip: "新增",
                updateButtonTooltip: "修改",
                cancelEditButtonTooltip: "取消編輯"
            }
        },

        validators: {
            required: { message: "欄位必填" },
            rangeLength: { message: "欄位字串長度超出範圍" },
            minLength: { message: "欄位字串長度太短" },
            maxLength: { message: "欄位字串長度太長" },
            pattern: { message: "欄位字串不符合規則" },
            range: { message: "欄位數值超出範圍" },
            min: { message: "欄位數值太小" },
            max: { message: "欄位數值太大" }
        }
    };

}(jsGrid, jQuery));
