(function(jsGrid) {

    jsGrid.locales.tr = {
        grid: {
            noDataContent: "Kayıt Bulunamadı",
            deleteConfirm: "Emin misiniz ?",
            pagerFormat: "Sayfalar: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} / {pageCount}",
            pagePrevText: "<",
            pageNextText: ">",
            pageFirstText: "<<",
            pageLastText: ">>",
            loadMessage: "Lütfen bekleyiniz...",
            invalidMessage: "Geçersiz veri girişi !"
        },

        loadIndicator: {
            message: "Yükleniyor..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "Arama moduna geç",
                insertModeButtonTooltip: "Yeni kayıt moduna geç",
                editButtonTooltip: "Değiştir",
                deleteButtonTooltip: "Sil",
                searchButtonTooltip: "Bul",
                clearFilterButtonTooltip: "Filtreyi temizle",
                insertButtonTooltip: "Ekle",
                updateButtonTooltip: "Güncelle",
                cancelEditButtonTooltip: "Güncelleme iptali"
            }
        },

        validators: {
            required: { message: "Gerekli alandır" },
            rangeLength: { message: "Alan değerinin uzunluğu tanımlanan aralık dışındadır" },
            minLength: { message: "Alan değeri çok kısadır" },
            maxLength: { message: "Alan değeri çok uzundur" },
            pattern: { message: "Alan değeri tanımlanan şablon ile eşleşmiyor" },
            range: { message: "Alan değeri tanımlı aralığın dışındadır" },
            min: { message: "Alan değeri çok küçüktür" },
            max: { message: "Alan değeri çok büyüktür" }
        }
    };

}(jsGrid, jQuery));

