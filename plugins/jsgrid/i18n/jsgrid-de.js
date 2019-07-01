(function(jsGrid) {

    jsGrid.locales.de = {
        grid: {
            noDataContent: "Die Daten konnten nicht gefunden werden",
            deleteConfirm: "Möchten Sie die Daten unwiederruflich löschen?",
            pagerFormat: "Seiten: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} von {pageCount}",
            pagePrevText: "<",
            pageNextText: ">",
            pageFirstText: "<<",
            pageLastText: ">>",
            loadMessage: "Bitte warten...",
            invalidMessage: "Ihre Eingabe ist nicht zulässig!"
        },

        loadIndicator: {
            message: "Lädt..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "Suche",
                insertModeButtonTooltip: "Eintrag hinzufügen",
                editButtonTooltip: "Bearbeiten",
                deleteButtonTooltip: "Löschen",
                searchButtonTooltip: "Eintrag finden",
                clearFilterButtonTooltip: "Filter zurücksetzen",
                insertButtonTooltip: "Hinzufügen",
                updateButtonTooltip: "Speichern",
                cancelEditButtonTooltip: "Abbrechen"
            }
        },

        validators: {
            required: { message: "Dies ist ein Pflichtfeld" },
            rangeLength: { message: "Die Länge der Eingabe liegt außerhalb des zulässigen Bereichs" },
            minLength: { message: "Die Eingabe ist zu kurz" },
            maxLength: { message: "Die Eingabe ist zu lang" },
            pattern: { message: "Die Eingabe entspricht nicht dem gewünschten Muster" },
            range: { message: "Der eingegebene Wert liegt außerhalb des zulässigen Bereichs" },
            min: { message: "Der eingegebene Wert ist zu niedrig" },
            max: { message: "Der eingegebene Wert ist zu hoch" }
        }
    };

}(jsGrid, jQuery));
