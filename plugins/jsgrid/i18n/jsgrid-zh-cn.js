(function(jsGrid) {

    jsGrid.locales["zh-cn"] = {
        grid: {
            noDataContent: "暂无数据",
            deleteConfirm: "确认删除？",
            pagerFormat: "页码: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} / {pageCount}",
            pagePrevText: "上一页",
            pageNextText: "下一页",
            pageFirstText: "第一页",
            pageLastText: "最后页",
            loadMessage: "请稍后...",
            invalidMessage: "数据有误！"
        },

        loadIndicator: {
            message: "载入中..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "切换为搜索",
                insertModeButtonTooltip: "切换为新增",
                editButtonTooltip: "编辑",
                deleteButtonTooltip: "删除",
                searchButtonTooltip: "搜索",
                clearFilterButtonTooltip: "清空过滤",
                insertButtonTooltip: "插入",
                updateButtonTooltip: "更新",
                cancelEditButtonTooltip: "取消编辑"
            }
        },

        validators: {
            required: { message: "字段必填" },
            rangeLength: { message: "字段值长度超过定义范围" },
            minLength: { message: "字段长度过短" },
            maxLength: { message: "字段长度过长" },
            pattern: { message: "字段值不符合定义规则" },
            range: { message: "字段值超过定义范围" },
            min: { message: "字段值太小" },
            max: { message: "字段值太大" }
        }
    };

}(jsGrid, jQuery));
