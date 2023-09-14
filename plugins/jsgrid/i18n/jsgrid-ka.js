(function(jsGrid) {

    jsGrid.locales.ka = {
        grid: {
            noDataContent: "მონაცემები ცარიელია.",
            deleteConfirm: "ნამდვილად გსურთ ჩანაწერის წაშლა?",
            pagerFormat: "გვერდები: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} - {pageCount} დან.",
            pagePrevText: "<",
            pageNextText: ">",
            pageFirstText: "<<",
            pageLastText: ">>",
            loadMessage: "გთხოვთ დაიცადოთ...",
            invalidMessage: "შეყვანილია არასწორი მონაცემები!"
        },

        loadIndicator: {
            message: "მიმდინარეობს ჩატვირთვა..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "ძებნა",
                insertModeButtonTooltip: "ჩანაწერის დამატება",
                editButtonTooltip: "შესწორება",
                deleteButtonTooltip: "წაშლა",
                searchButtonTooltip: "ძებნა",
                clearFilterButtonTooltip: "ფილტრის გასუფთავება",
                insertButtonTooltip: "დამატება",
                updateButtonTooltip: "შენახვა",
                cancelEditButtonTooltip: "გაუქმება"
            }
        },

        validators: {
            required: { message: "ველი აუცილებელია შესავსებად." },
            rangeLength: { message: "შეყვანილი ჩანაწერის ზომა არ ექვემდებარება დიაპაზონს." },
            minLength: { message: "შეყვანილი ჩანაწერის ზომა საკმაოდ პატარა არის." },
            maxLength: { message: "შეყვანილი ჩანაწერის ზომა საკმაოდ დიდი არის." },
            pattern: { message: "შეყვანილი მნიშვნელობა არ ემთხვევა მითითებულ შაბლონს." },
            range: { message: "შეყვანილი ინფორმაცია არ ჯდება დიაპაზონში." },
            min: { message: "შეყვანილი ინფორმაციის ზომა საკმაოდ პატარა არის." },
            max: { message: "შეყვანილი ინფორმაციის ზომა საკმაოდ დიდი არის." }
        }
    };

}(jsGrid, jQuery));
