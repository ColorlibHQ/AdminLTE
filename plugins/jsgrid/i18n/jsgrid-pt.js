(function(jsGrid) {

    jsGrid.locales.pt = {
        grid: {
            noDataContent: "Não encontrado",
            deleteConfirm: "Você tem certeza que deseja remover este item?",
            pagerFormat: "Páginas: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} de {pageCount}",
            pagePrevText: "Anterior",
            pageNextText: "Seguinte",
            pageFirstText: "Primeira",
            pageLastText: "Última",
            loadMessage: "Por favor, espere...",
            invalidMessage: "Dados inválidos!"
        },

        loadIndicator: {
            message: "Carregando..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "Mudar para busca",
                insertModeButtonTooltip: "Mudar para inserção",
                editButtonTooltip: "Editar",
                deleteButtonTooltip: "Remover",
                searchButtonTooltip: "Buscar",
                clearFilterButtonTooltip: "Remover filtro",
                insertButtonTooltip: "Adicionar",
                updateButtonTooltip: "Atualizar",
                cancelEditButtonTooltip: "Cancelar Edição"
            }
        },

        validators: {
            required: { message: "Campo obrigatório" },
            rangeLength: { message: "O valor esta fora do intervaldo definido" },
            minLength: { message: "O comprimento do valor é muito curto" },
            maxLength: { message: "O comprimento valor é muito longo" },
            pattern: { message: "O valor informado não é compatível com o padrão" },
            range: { message: "O valor informado esta fora do limite definido" },
            min: { message: "O valor é muito curto" },
            max: { message: "O valor é muito longo" }
        }
    };

}(jsGrid, jQuery));
