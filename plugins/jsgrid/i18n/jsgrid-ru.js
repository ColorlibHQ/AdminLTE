(function(jsGrid) {

    jsGrid.locales.ru = {
        grid: {
            noDataContent: "Данных не найдено",
            deleteConfirm: "Вы действительно хотите удалить запись?",
            pagerFormat: "Страницы: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} из {pageCount}",
            pagePrevText: "<",
            pageNextText: ">",
            pageFirstText: "<<",
            pageLastText: ">>",
            loadMessage: "Пожалуйста, подождите...",
            invalidMessage: "Введены неверные данные!"
        },

        loadIndicator: {
            message: "Загрузка..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "Поиск",
                insertModeButtonTooltip: "Добавить запись",
                editButtonTooltip: "Изменить",
                deleteButtonTooltip: "Удалить",
                searchButtonTooltip: "Найти",
                clearFilterButtonTooltip: "Очистить фильтр",
                insertButtonTooltip: "Добавить",
                updateButtonTooltip: "Сохранить",
                cancelEditButtonTooltip: "Отменить"
            }
        },

        validators: {
            required: { message: "Поле обязательно для заполения" },
            rangeLength: { message: "Длинна введенного значения вне допустимого диапазона" },
            minLength: { message: "Введенное значение слишком короткое" },
            maxLength: { message: "Введенное значение слишком длинное" },
            pattern: { message: "Введенное значение не соответствует заданному шаблону" },
            range: { message: "Введенное значение вне допустимого диапазона" },
            min: { message: "Введенное значение слишком маленькое" },
            max: { message: "Введенное значение слишком большое" }
        }
    };

}(jsGrid, jQuery));

