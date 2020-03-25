(function(jsGrid) {

    jsGrid.locales.es = {
        grid: {
            noDataContent: "No encontrado",
            deleteConfirm: "¿Está seguro?",
            pagerFormat: "Paginas: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} de {pageCount}",
            pagePrevText: "Anterior",
            pageNextText: "Siguiente",
            pageFirstText: "Primero",
            pageLastText: "Ultimo",
            loadMessage: "Por favor, espere...",
            invalidMessage: "¡Datos no válidos!"
        },

        loadIndicator: {
            message: "Cargando..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "Cambiar a búsqueda",
                insertModeButtonTooltip: "Cambiar a inserción",
                editButtonTooltip: "Editar",
                deleteButtonTooltip: "Suprimir",
                searchButtonTooltip: "Buscar",
                clearFilterButtonTooltip: "Borrar filtro",
                insertButtonTooltip: "Insertar",
                updateButtonTooltip: "Actualizar",
                cancelEditButtonTooltip: "Cancelar edición"
            }
        },

        validators: {
            required: { message: "Campo requerido" },
            rangeLength: { message: "La longitud del valor está fuera del intervalo definido" },
            minLength: { message: "La longitud del valor es demasiado corta" },
            maxLength: { message: "La longitud del valor es demasiado larga" },
            pattern: { message: "El valor no se ajusta al patrón definido" },
            range: { message: "Valor fuera del rango definido" },
            min: { message: "Valor demasiado bajo" },
            max: { message: "Valor demasiado alto" }
        }
    };

}(jsGrid, jQuery));
