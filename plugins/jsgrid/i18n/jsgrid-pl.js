(function(jsGrid) {

    jsGrid.locales.pl = {
        grid: {
            noDataContent: "Nie znaleziono",
            deleteConfirm: "Czy jesteś pewien?",
            pagerFormat: "Strony: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} z {pageCount}",
            pagePrevText: "Poprzednia",
            pageNextText: "Następna",
            pageFirstText: "Pierwsza",
            pageLastText: "Ostatnia",
            loadMessage: "Proszę czekać...",
            invalidMessage: "Wprowadzono nieprawidłowe dane!"
        },

        loadIndicator: {
            message: "Ładowanie..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "Wyszukiwanie",
                insertModeButtonTooltip: "Dodawanie",
                editButtonTooltip: "Edytuj",
                deleteButtonTooltip: "Usuń",
                searchButtonTooltip: "Szukaj",
                clearFilterButtonTooltip: "Wyczyść filtr",
                insertButtonTooltip: "Dodaj",
                updateButtonTooltip: "Aktualizuj",
                cancelEditButtonTooltip: "Anuluj edytowanie"
            }
        },

        validators: {
            required: {
                message: "Pole jest wymagane"
            },
            rangeLength: {
                message: "Długość wartości pola znajduje się poza zdefiniowanym zakresem"
            },
            minLength: {
                message: "Wartość pola jest zbyt krótka"
            },
            maxLength: {
                message: "Wartość pola jest zbyt długa"
            },
            pattern: {
                message: "Wartość pola nie zgadza się ze zdefiniowanym wzorem"
            },
            range: {
                message: "Wartość pola znajduje się poza zdefiniowanym zakresem"
            },
            min: {
                message: "Wartość pola jest zbyt mała"
            },
            max: {
                message: "Wartość pola jest zbyt duża"
            }
        }
    };

}(jsGrid, jQuery));
