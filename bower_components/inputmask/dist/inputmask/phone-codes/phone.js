/*!
* phone-codes/phone.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.10
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "../inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("../inputmask")) : factory(window.Inputmask);
}(function(Inputmask) {
    return Inputmask.extendAliases({
        phone: {
            alias: "abstractphone",
            phoneCodes: [ {
                mask: "+247-####",
                cc: "AC",
                cd: "Ascension",
                desc_en: "",
                name_ru: "Остров Вознесения",
                desc_ru: ""
            }, {
                mask: "+376-###-###",
                cc: "AD",
                cd: "Andorra",
                desc_en: "",
                name_ru: "Андорра",
                desc_ru: ""
            }, {
                mask: "+971-5#-###-####",
                cc: "AE",
                cd: "United Arab Emirates",
                desc_en: "mobile",
                name_ru: "Объединенные Арабские Эмираты",
                desc_ru: "мобильные"
            }, {
                mask: "+971-#-###-####",
                cc: "AE",
                cd: "United Arab Emirates",
                desc_en: "",
                name_ru: "Объединенные Арабские Эмираты",
                desc_ru: ""
            }, {
                mask: "+93-##-###-####",
                cc: "AF",
                cd: "Afghanistan",
                desc_en: "",
                name_ru: "Афганистан",
                desc_ru: ""
            }, {
                mask: "+1(268)###-####",
                cc: "AG",
                cd: "Antigua & Barbuda",
                desc_en: "",
                name_ru: "Антигуа и Барбуда",
                desc_ru: ""
            }, {
                mask: "+1(264)###-####",
                cc: "AI",
                cd: "Anguilla",
                desc_en: "",
                name_ru: "Ангилья",
                desc_ru: ""
            }, {
                mask: "+355(###)###-###",
                cc: "AL",
                cd: "Albania",
                desc_en: "",
                name_ru: "Албания",
                desc_ru: ""
            }, {
                mask: "+374-##-###-###",
                cc: "AM",
                cd: "Armenia",
                desc_en: "",
                name_ru: "Армения",
                desc_ru: ""
            }, {
                mask: "+599-###-####",
                cc: "AN",
                cd: "Caribbean Netherlands",
                desc_en: "",
                name_ru: "Карибские Нидерланды",
                desc_ru: ""
            }, {
                mask: "+599-###-####",
                cc: "AN",
                cd: "Netherlands Antilles",
                desc_en: "",
                name_ru: "Нидерландские Антильские острова",
                desc_ru: ""
            }, {
                mask: "+599-9###-####",
                cc: "AN",
                cd: "Netherlands Antilles",
                desc_en: "Curacao",
                name_ru: "Нидерландские Антильские острова",
                desc_ru: "Кюрасао"
            }, {
                mask: "+244(###)###-###",
                cc: "AO",
                cd: "Angola",
                desc_en: "",
                name_ru: "Ангола",
                desc_ru: ""
            }, {
                mask: "+672-1##-###",
                cc: "AQ",
                cd: "Australian bases in Antarctica",
                desc_en: "",
                name_ru: "Австралийская антарктическая база",
                desc_ru: ""
            }, {
                mask: "+54(###)###-####",
                cc: "AR",
                cd: "Argentina",
                desc_en: "",
                name_ru: "Аргентина",
                desc_ru: ""
            }, {
                mask: "+1(684)###-####",
                cc: "AS",
                cd: "American Samoa",
                desc_en: "",
                name_ru: "Американское Самоа",
                desc_ru: ""
            }, {
                mask: "+43(###)###-####",
                cc: "AT",
                cd: "Austria",
                desc_en: "",
                name_ru: "Австрия",
                desc_ru: ""
            }, {
                mask: "+61-#-####-####",
                cc: "AU",
                cd: "Australia",
                desc_en: "",
                name_ru: "Австралия",
                desc_ru: ""
            }, {
                mask: "+297-###-####",
                cc: "AW",
                cd: "Aruba",
                desc_en: "",
                name_ru: "Аруба",
                desc_ru: ""
            }, {
                mask: "+994-##-###-##-##",
                cc: "AZ",
                cd: "Azerbaijan",
                desc_en: "",
                name_ru: "Азербайджан",
                desc_ru: ""
            }, {
                mask: "+387-##-#####",
                cc: "BA",
                cd: "Bosnia and Herzegovina",
                desc_en: "",
                name_ru: "Босния и Герцеговина",
                desc_ru: ""
            }, {
                mask: "+387-##-####",
                cc: "BA",
                cd: "Bosnia and Herzegovina",
                desc_en: "",
                name_ru: "Босния и Герцеговина",
                desc_ru: ""
            }, {
                mask: "+1(246)###-####",
                cc: "BB",
                cd: "Barbados",
                desc_en: "",
                name_ru: "Барбадос",
                desc_ru: ""
            }, {
                mask: "+880-##-###-###",
                cc: "BD",
                cd: "Bangladesh",
                desc_en: "",
                name_ru: "Бангладеш",
                desc_ru: ""
            }, {
                mask: "+32(###)###-###",
                cc: "BE",
                cd: "Belgium",
                desc_en: "",
                name_ru: "Бельгия",
                desc_ru: ""
            }, {
                mask: "+226-##-##-####",
                cc: "BF",
                cd: "Burkina Faso",
                desc_en: "",
                name_ru: "Буркина Фасо",
                desc_ru: ""
            }, {
                mask: "+359(###)###-###",
                cc: "BG",
                cd: "Bulgaria",
                desc_en: "",
                name_ru: "Болгария",
                desc_ru: ""
            }, {
                mask: "+973-####-####",
                cc: "BH",
                cd: "Bahrain",
                desc_en: "",
                name_ru: "Бахрейн",
                desc_ru: ""
            }, {
                mask: "+257-##-##-####",
                cc: "BI",
                cd: "Burundi",
                desc_en: "",
                name_ru: "Бурунди",
                desc_ru: ""
            }, {
                mask: "+229-##-##-####",
                cc: "BJ",
                cd: "Benin",
                desc_en: "",
                name_ru: "Бенин",
                desc_ru: ""
            }, {
                mask: "+1(441)###-####",
                cc: "BM",
                cd: "Bermuda",
                desc_en: "",
                name_ru: "Бермудские острова",
                desc_ru: ""
            }, {
                mask: "+673-###-####",
                cc: "BN",
                cd: "Brunei Darussalam",
                desc_en: "",
                name_ru: "Бруней-Даруссалам",
                desc_ru: ""
            }, {
                mask: "+591-#-###-####",
                cc: "BO",
                cd: "Bolivia",
                desc_en: "",
                name_ru: "Боливия",
                desc_ru: ""
            }, {
                mask: "+55-##-####-####",
                cc: "BR",
                cd: "Brazil",
                desc_en: "",
                name_ru: "Бразилия",
                desc_ru: ""
            }, {
                mask: "+55-##-#####-####",
                cc: "BR",
                cd: "Brazil",
                desc_en: "",
                name_ru: "Бразилия",
                desc_ru: ""
            }, {
                mask: "+1(242)###-####",
                cc: "BS",
                cd: "Bahamas",
                desc_en: "",
                name_ru: "Багамские Острова",
                desc_ru: ""
            }, {
                mask: "+975-17-###-###",
                cc: "BT",
                cd: "Bhutan",
                desc_en: "",
                name_ru: "Бутан",
                desc_ru: ""
            }, {
                mask: "+975-#-###-###",
                cc: "BT",
                cd: "Bhutan",
                desc_en: "",
                name_ru: "Бутан",
                desc_ru: ""
            }, {
                mask: "+267-##-###-###",
                cc: "BW",
                cd: "Botswana",
                desc_en: "",
                name_ru: "Ботсвана",
                desc_ru: ""
            }, {
                mask: "+375(##)###-##-##",
                cc: "BY",
                cd: "Belarus",
                desc_en: "",
                name_ru: "Беларусь (Белоруссия)",
                desc_ru: ""
            }, {
                mask: "+501-###-####",
                cc: "BZ",
                cd: "Belize",
                desc_en: "",
                name_ru: "Белиз",
                desc_ru: ""
            }, {
                mask: "+243(###)###-###",
                cc: "CD",
                cd: "Dem. Rep. Congo",
                desc_en: "",
                name_ru: "Дем. Респ. Конго (Киншаса)",
                desc_ru: ""
            }, {
                mask: "+236-##-##-####",
                cc: "CF",
                cd: "Central African Republic",
                desc_en: "",
                name_ru: "Центральноафриканская Республика",
                desc_ru: ""
            }, {
                mask: "+242-##-###-####",
                cc: "CG",
                cd: "Congo (Brazzaville)",
                desc_en: "",
                name_ru: "Конго (Браззавиль)",
                desc_ru: ""
            }, {
                mask: "+41-##-###-####",
                cc: "CH",
                cd: "Switzerland",
                desc_en: "",
                name_ru: "Швейцария",
                desc_ru: ""
            }, {
                mask: "+225-##-###-###",
                cc: "CI",
                cd: "Cote d’Ivoire (Ivory Coast)",
                desc_en: "",
                name_ru: "Кот-д’Ивуар",
                desc_ru: ""
            }, {
                mask: "+682-##-###",
                cc: "CK",
                cd: "Cook Islands",
                desc_en: "",
                name_ru: "Острова Кука",
                desc_ru: ""
            }, {
                mask: "+56-#-####-####",
                cc: "CL",
                cd: "Chile",
                desc_en: "",
                name_ru: "Чили",
                desc_ru: ""
            }, {
                mask: "+237-####-####",
                cc: "CM",
                cd: "Cameroon",
                desc_en: "",
                name_ru: "Камерун",
                desc_ru: ""
            }, {
                mask: "+86(###)####-####",
                cc: "CN",
                cd: "China (PRC)",
                desc_en: "",
                name_ru: "Китайская Н.Р.",
                desc_ru: ""
            }, {
                mask: "+86(###)####-###",
                cc: "CN",
                cd: "China (PRC)",
                desc_en: "",
                name_ru: "Китайская Н.Р.",
                desc_ru: ""
            }, {
                mask: "+86-##-#####-#####",
                cc: "CN",
                cd: "China (PRC)",
                desc_en: "",
                name_ru: "Китайская Н.Р.",
                desc_ru: ""
            }, {
                mask: "+57(###)###-####",
                cc: "CO",
                cd: "Colombia",
                desc_en: "",
                name_ru: "Колумбия",
                desc_ru: ""
            }, {
                mask: "+506-####-####",
                cc: "CR",
                cd: "Costa Rica",
                desc_en: "",
                name_ru: "Коста-Рика",
                desc_ru: ""
            }, {
                mask: "+53-#-###-####",
                cc: "CU",
                cd: "Cuba",
                desc_en: "",
                name_ru: "Куба",
                desc_ru: ""
            }, {
                mask: "+238(###)##-##",
                cc: "CV",
                cd: "Cape Verde",
                desc_en: "",
                name_ru: "Кабо-Верде",
                desc_ru: ""
            }, {
                mask: "+599-###-####",
                cc: "CW",
                cd: "Curacao",
                desc_en: "",
                name_ru: "Кюрасао",
                desc_ru: ""
            }, {
                mask: "+357-##-###-###",
                cc: "CY",
                cd: "Cyprus",
                desc_en: "",
                name_ru: "Кипр",
                desc_ru: ""
            }, {
                mask: "+420(###)###-###",
                cc: "CZ",
                cd: "Czech Republic",
                desc_en: "",
                name_ru: "Чехия",
                desc_ru: ""
            }, {
                mask: "+49(####)###-####",
                cc: "DE",
                cd: "Germany",
                desc_en: "",
                name_ru: "Германия",
                desc_ru: ""
            }, {
                mask: "+49(###)###-####",
                cc: "DE",
                cd: "Germany",
                desc_en: "",
                name_ru: "Германия",
                desc_ru: ""
            }, {
                mask: "+49(###)##-####",
                cc: "DE",
                cd: "Germany",
                desc_en: "",
                name_ru: "Германия",
                desc_ru: ""
            }, {
                mask: "+49(###)##-###",
                cc: "DE",
                cd: "Germany",
                desc_en: "",
                name_ru: "Германия",
                desc_ru: ""
            }, {
                mask: "+49(###)##-##",
                cc: "DE",
                cd: "Germany",
                desc_en: "",
                name_ru: "Германия",
                desc_ru: ""
            }, {
                mask: "+49-###-###",
                cc: "DE",
                cd: "Germany",
                desc_en: "",
                name_ru: "Германия",
                desc_ru: ""
            }, {
                mask: "+253-##-##-##-##",
                cc: "DJ",
                cd: "Djibouti",
                desc_en: "",
                name_ru: "Джибути",
                desc_ru: ""
            }, {
                mask: "+45-##-##-##-##",
                cc: "DK",
                cd: "Denmark",
                desc_en: "",
                name_ru: "Дания",
                desc_ru: ""
            }, {
                mask: "+1(767)###-####",
                cc: "DM",
                cd: "Dominica",
                desc_en: "",
                name_ru: "Доминика",
                desc_ru: ""
            }, {
                mask: "+1(809)###-####",
                cc: "DO",
                cd: "Dominican Republic",
                desc_en: "",
                name_ru: "Доминиканская Республика",
                desc_ru: ""
            }, {
                mask: "+1(829)###-####",
                cc: "DO",
                cd: "Dominican Republic",
                desc_en: "",
                name_ru: "Доминиканская Республика",
                desc_ru: ""
            }, {
                mask: "+1(849)###-####",
                cc: "DO",
                cd: "Dominican Republic",
                desc_en: "",
                name_ru: "Доминиканская Республика",
                desc_ru: ""
            }, {
                mask: "+213-##-###-####",
                cc: "DZ",
                cd: "Algeria",
                desc_en: "",
                name_ru: "Алжир",
                desc_ru: ""
            }, {
                mask: "+593-##-###-####",
                cc: "EC",
                cd: "Ecuador ",
                desc_en: "mobile",
                name_ru: "Эквадор ",
                desc_ru: "мобильные"
            }, {
                mask: "+593-#-###-####",
                cc: "EC",
                cd: "Ecuador",
                desc_en: "",
                name_ru: "Эквадор",
                desc_ru: ""
            }, {
                mask: "+372-####-####",
                cc: "EE",
                cd: "Estonia ",
                desc_en: "mobile",
                name_ru: "Эстония ",
                desc_ru: "мобильные"
            }, {
                mask: "+372-###-####",
                cc: "EE",
                cd: "Estonia",
                desc_en: "",
                name_ru: "Эстония",
                desc_ru: ""
            }, {
                mask: "+20(###)###-####",
                cc: "EG",
                cd: "Egypt",
                desc_en: "",
                name_ru: "Египет",
                desc_ru: ""
            }, {
                mask: "+291-#-###-###",
                cc: "ER",
                cd: "Eritrea",
                desc_en: "",
                name_ru: "Эритрея",
                desc_ru: ""
            }, {
                mask: "+34(###)###-###",
                cc: "ES",
                cd: "Spain",
                desc_en: "",
                name_ru: "Испания",
                desc_ru: ""
            }, {
                mask: "+251-##-###-####",
                cc: "ET",
                cd: "Ethiopia",
                desc_en: "",
                name_ru: "Эфиопия",
                desc_ru: ""
            }, {
                mask: "+358(###)###-##-##",
                cc: "FI",
                cd: "Finland",
                desc_en: "",
                name_ru: "Финляндия",
                desc_ru: ""
            }, {
                mask: "+679-##-#####",
                cc: "FJ",
                cd: "Fiji",
                desc_en: "",
                name_ru: "Фиджи",
                desc_ru: ""
            }, {
                mask: "+500-#####",
                cc: "FK",
                cd: "Falkland Islands",
                desc_en: "",
                name_ru: "Фолклендские острова",
                desc_ru: ""
            }, {
                mask: "+691-###-####",
                cc: "FM",
                cd: "F.S. Micronesia",
                desc_en: "",
                name_ru: "Ф.Ш. Микронезии",
                desc_ru: ""
            }, {
                mask: "+298-###-###",
                cc: "FO",
                cd: "Faroe Islands",
                desc_en: "",
                name_ru: "Фарерские острова",
                desc_ru: ""
            }, {
                mask: "+262-#####-####",
                cc: "FR",
                cd: "Mayotte",
                desc_en: "",
                name_ru: "Майотта",
                desc_ru: ""
            }, {
                mask: "+33(###)###-###",
                cc: "FR",
                cd: "France",
                desc_en: "",
                name_ru: "Франция",
                desc_ru: ""
            }, {
                mask: "+508-##-####",
                cc: "FR",
                cd: "St Pierre & Miquelon",
                desc_en: "",
                name_ru: "Сен-Пьер и Микелон",
                desc_ru: ""
            }, {
                mask: "+590(###)###-###",
                cc: "FR",
                cd: "Guadeloupe",
                desc_en: "",
                name_ru: "Гваделупа",
                desc_ru: ""
            }, {
                mask: "+241-#-##-##-##",
                cc: "GA",
                cd: "Gabon",
                desc_en: "",
                name_ru: "Габон",
                desc_ru: ""
            }, {
                mask: "+1(473)###-####",
                cc: "GD",
                cd: "Grenada",
                desc_en: "",
                name_ru: "Гренада",
                desc_ru: ""
            }, {
                mask: "+995(###)###-###",
                cc: "GE",
                cd: "Rep. of Georgia",
                desc_en: "",
                name_ru: "Грузия",
                desc_ru: ""
            }, {
                mask: "+594-#####-####",
                cc: "GF",
                cd: "Guiana (French)",
                desc_en: "",
                name_ru: "Фр. Гвиана",
                desc_ru: ""
            }, {
                mask: "+233(###)###-###",
                cc: "GH",
                cd: "Ghana",
                desc_en: "",
                name_ru: "Гана",
                desc_ru: ""
            }, {
                mask: "+350-###-#####",
                cc: "GI",
                cd: "Gibraltar",
                desc_en: "",
                name_ru: "Гибралтар",
                desc_ru: ""
            }, {
                mask: "+299-##-##-##",
                cc: "GL",
                cd: "Greenland",
                desc_en: "",
                name_ru: "Гренландия",
                desc_ru: ""
            }, {
                mask: "+220(###)##-##",
                cc: "GM",
                cd: "Gambia",
                desc_en: "",
                name_ru: "Гамбия",
                desc_ru: ""
            }, {
                mask: "+224-##-###-###",
                cc: "GN",
                cd: "Guinea",
                desc_en: "",
                name_ru: "Гвинея",
                desc_ru: ""
            }, {
                mask: "+240-##-###-####",
                cc: "GQ",
                cd: "Equatorial Guinea",
                desc_en: "",
                name_ru: "Экваториальная Гвинея",
                desc_ru: ""
            }, {
                mask: "+30(###)###-####",
                cc: "GR",
                cd: "Greece",
                desc_en: "",
                name_ru: "Греция",
                desc_ru: ""
            }, {
                mask: "+502-#-###-####",
                cc: "GT",
                cd: "Guatemala",
                desc_en: "",
                name_ru: "Гватемала",
                desc_ru: ""
            }, {
                mask: "+1(671)###-####",
                cc: "GU",
                cd: "Guam",
                desc_en: "",
                name_ru: "Гуам",
                desc_ru: ""
            }, {
                mask: "+245-#-######",
                cc: "GW",
                cd: "Guinea-Bissau",
                desc_en: "",
                name_ru: "Гвинея-Бисау",
                desc_ru: ""
            }, {
                mask: "+592-###-####",
                cc: "GY",
                cd: "Guyana",
                desc_en: "",
                name_ru: "Гайана",
                desc_ru: ""
            }, {
                mask: "+852-####-####",
                cc: "HK",
                cd: "Hong Kong",
                desc_en: "",
                name_ru: "Гонконг",
                desc_ru: ""
            }, {
                mask: "+504-####-####",
                cc: "HN",
                cd: "Honduras",
                desc_en: "",
                name_ru: "Гондурас",
                desc_ru: ""
            }, {
                mask: "+385-(##)-###-###",
                cc: "HR",
                cd: "Croatia",
                desc_en: "",
                name_ru: "Хорватия",
                desc_ru: ""
            }, {
                mask: "+385-(##)-###-####",
                cc: "HR",
                cd: "Croatia",
                desc_en: "",
                name_ru: "Хорватия",
                desc_ru: ""
            }, {
                mask: "+385-1-####-###",
                cc: "HR",
                cd: "Croatia",
                desc_en: "",
                name_ru: "Хорватия",
                desc_ru: ""
            }, {
                mask: "+509-##-##-####",
                cc: "HT",
                cd: "Haiti",
                desc_en: "",
                name_ru: "Гаити",
                desc_ru: ""
            }, {
                mask: "+36(###)###-###",
                cc: "HU",
                cd: "Hungary",
                desc_en: "",
                name_ru: "Венгрия",
                desc_ru: ""
            }, {
                mask: "+62(8##)###-####",
                cc: "ID",
                cd: "Indonesia ",
                desc_en: "mobile",
                name_ru: "Индонезия ",
                desc_ru: "мобильные"
            }, {
                mask: "+62-##-###-##",
                cc: "ID",
                cd: "Indonesia",
                desc_en: "",
                name_ru: "Индонезия",
                desc_ru: ""
            }, {
                mask: "+62-##-###-###",
                cc: "ID",
                cd: "Indonesia",
                desc_en: "",
                name_ru: "Индонезия",
                desc_ru: ""
            }, {
                mask: "+62-##-###-####",
                cc: "ID",
                cd: "Indonesia",
                desc_en: "",
                name_ru: "Индонезия",
                desc_ru: ""
            }, {
                mask: "+62(8##)###-###",
                cc: "ID",
                cd: "Indonesia ",
                desc_en: "mobile",
                name_ru: "Индонезия ",
                desc_ru: "мобильные"
            }, {
                mask: "+62(8##)###-##-###",
                cc: "ID",
                cd: "Indonesia ",
                desc_en: "mobile",
                name_ru: "Индонезия ",
                desc_ru: "мобильные"
            }, {
                mask: "+353(###)###-###",
                cc: "IE",
                cd: "Ireland",
                desc_en: "",
                name_ru: "Ирландия",
                desc_ru: ""
            }, {
                mask: "+972-5#-###-####",
                cc: "IL",
                cd: "Israel ",
                desc_en: "mobile",
                name_ru: "Израиль ",
                desc_ru: "мобильные"
            }, {
                mask: "+972-#-###-####",
                cc: "IL",
                cd: "Israel",
                desc_en: "",
                name_ru: "Израиль",
                desc_ru: ""
            }, {
                mask: "+91(####)###-###",
                cc: "IN",
                cd: "India",
                desc_en: "",
                name_ru: "Индия",
                desc_ru: ""
            }, {
                mask: "+246-###-####",
                cc: "IO",
                cd: "Diego Garcia",
                desc_en: "",
                name_ru: "Диего-Гарсия",
                desc_ru: ""
            }, {
                mask: "+964(###)###-####",
                cc: "IQ",
                cd: "Iraq",
                desc_en: "",
                name_ru: "Ирак",
                desc_ru: ""
            }, {
                mask: "+98(###)###-####",
                cc: "IR",
                cd: "Iran",
                desc_en: "",
                name_ru: "Иран",
                desc_ru: ""
            }, {
                mask: "+354-###-####",
                cc: "IS",
                cd: "Iceland",
                desc_en: "",
                name_ru: "Исландия",
                desc_ru: ""
            }, {
                mask: "+39(###)####-###",
                cc: "IT",
                cd: "Italy",
                desc_en: "",
                name_ru: "Италия",
                desc_ru: ""
            }, {
                mask: "+1(876)###-####",
                cc: "JM",
                cd: "Jamaica",
                desc_en: "",
                name_ru: "Ямайка",
                desc_ru: ""
            }, {
                mask: "+962-#-####-####",
                cc: "JO",
                cd: "Jordan",
                desc_en: "",
                name_ru: "Иордания",
                desc_ru: ""
            }, {
                mask: "+81-##-####-####",
                cc: "JP",
                cd: "Japan ",
                desc_en: "mobile",
                name_ru: "Япония ",
                desc_ru: "мобильные"
            }, {
                mask: "+81(###)###-###",
                cc: "JP",
                cd: "Japan",
                desc_en: "",
                name_ru: "Япония",
                desc_ru: ""
            }, {
                mask: "+254-###-######",
                cc: "KE",
                cd: "Kenya",
                desc_en: "",
                name_ru: "Кения",
                desc_ru: ""
            }, {
                mask: "+996(###)###-###",
                cc: "KG",
                cd: "Kyrgyzstan",
                desc_en: "",
                name_ru: "Киргизия",
                desc_ru: ""
            }, {
                mask: "+855-##-###-###",
                cc: "KH",
                cd: "Cambodia",
                desc_en: "",
                name_ru: "Камбоджа",
                desc_ru: ""
            }, {
                mask: "+686-##-###",
                cc: "KI",
                cd: "Kiribati",
                desc_en: "",
                name_ru: "Кирибати",
                desc_ru: ""
            }, {
                mask: "+269-##-#####",
                cc: "KM",
                cd: "Comoros",
                desc_en: "",
                name_ru: "Коморы",
                desc_ru: ""
            }, {
                mask: "+1(869)###-####",
                cc: "KN",
                cd: "Saint Kitts & Nevis",
                desc_en: "",
                name_ru: "Сент-Китс и Невис",
                desc_ru: ""
            }, {
                mask: "+850-191-###-####",
                cc: "KP",
                cd: "DPR Korea (North) ",
                desc_en: "mobile",
                name_ru: "Корейская НДР ",
                desc_ru: "мобильные"
            }, {
                mask: "+850-##-###-###",
                cc: "KP",
                cd: "DPR Korea (North)",
                desc_en: "",
                name_ru: "Корейская НДР",
                desc_ru: ""
            }, {
                mask: "+850-###-####-###",
                cc: "KP",
                cd: "DPR Korea (North)",
                desc_en: "",
                name_ru: "Корейская НДР",
                desc_ru: ""
            }, {
                mask: "+850-###-###",
                cc: "KP",
                cd: "DPR Korea (North)",
                desc_en: "",
                name_ru: "Корейская НДР",
                desc_ru: ""
            }, {
                mask: "+850-####-####",
                cc: "KP",
                cd: "DPR Korea (North)",
                desc_en: "",
                name_ru: "Корейская НДР",
                desc_ru: ""
            }, {
                mask: "+850-####-#############",
                cc: "KP",
                cd: "DPR Korea (North)",
                desc_en: "",
                name_ru: "Корейская НДР",
                desc_ru: ""
            }, {
                mask: "+82-##-###-####",
                cc: "KR",
                cd: "Korea (South)",
                desc_en: "",
                name_ru: "Респ. Корея",
                desc_ru: ""
            }, {
                mask: "+965-####-####",
                cc: "KW",
                cd: "Kuwait",
                desc_en: "",
                name_ru: "Кувейт",
                desc_ru: ""
            }, {
                mask: "+1(345)###-####",
                cc: "KY",
                cd: "Cayman Islands",
                desc_en: "",
                name_ru: "Каймановы острова",
                desc_ru: ""
            }, {
                mask: "+7(6##)###-##-##",
                cc: "KZ",
                cd: "Kazakhstan",
                desc_en: "",
                name_ru: "Казахстан",
                desc_ru: ""
            }, {
                mask: "+7(7##)###-##-##",
                cc: "KZ",
                cd: "Kazakhstan",
                desc_en: "",
                name_ru: "Казахстан",
                desc_ru: ""
            }, {
                mask: "+856(20##)###-###",
                cc: "LA",
                cd: "Laos ",
                desc_en: "mobile",
                name_ru: "Лаос ",
                desc_ru: "мобильные"
            }, {
                mask: "+856-##-###-###",
                cc: "LA",
                cd: "Laos",
                desc_en: "",
                name_ru: "Лаос",
                desc_ru: ""
            }, {
                mask: "+961-##-###-###",
                cc: "LB",
                cd: "Lebanon ",
                desc_en: "mobile",
                name_ru: "Ливан ",
                desc_ru: "мобильные"
            }, {
                mask: "+961-#-###-###",
                cc: "LB",
                cd: "Lebanon",
                desc_en: "",
                name_ru: "Ливан",
                desc_ru: ""
            }, {
                mask: "+1(758)###-####",
                cc: "LC",
                cd: "Saint Lucia",
                desc_en: "",
                name_ru: "Сент-Люсия",
                desc_ru: ""
            }, {
                mask: "+423(###)###-####",
                cc: "LI",
                cd: "Liechtenstein",
                desc_en: "",
                name_ru: "Лихтенштейн",
                desc_ru: ""
            }, {
                mask: "+94-##-###-####",
                cc: "LK",
                cd: "Sri Lanka",
                desc_en: "",
                name_ru: "Шри-Ланка",
                desc_ru: ""
            }, {
                mask: "+231-##-###-###",
                cc: "LR",
                cd: "Liberia",
                desc_en: "",
                name_ru: "Либерия",
                desc_ru: ""
            }, {
                mask: "+266-#-###-####",
                cc: "LS",
                cd: "Lesotho",
                desc_en: "",
                name_ru: "Лесото",
                desc_ru: ""
            }, {
                mask: "+370(###)##-###",
                cc: "LT",
                cd: "Lithuania",
                desc_en: "",
                name_ru: "Литва",
                desc_ru: ""
            }, {
                mask: "+352-###-###",
                cc: "LU",
                cd: "Luxembourg",
                desc_en: "",
                name_ru: "Люксембург",
                desc_ru: ""
            }, {
                mask: "+352-####-###",
                cc: "LU",
                cd: "Luxembourg",
                desc_en: "",
                name_ru: "Люксембург",
                desc_ru: ""
            }, {
                mask: "+352-#####-###",
                cc: "LU",
                cd: "Luxembourg",
                desc_en: "",
                name_ru: "Люксембург",
                desc_ru: ""
            }, {
                mask: "+352-######-###",
                cc: "LU",
                cd: "Luxembourg",
                desc_en: "",
                name_ru: "Люксембург",
                desc_ru: ""
            }, {
                mask: "+371-##-###-###",
                cc: "LV",
                cd: "Latvia",
                desc_en: "",
                name_ru: "Латвия",
                desc_ru: ""
            }, {
                mask: "+218-##-###-###",
                cc: "LY",
                cd: "Libya",
                desc_en: "",
                name_ru: "Ливия",
                desc_ru: ""
            }, {
                mask: "+218-21-###-####",
                cc: "LY",
                cd: "Libya",
                desc_en: "Tripoli",
                name_ru: "Ливия",
                desc_ru: "Триполи"
            }, {
                mask: "+212-##-####-###",
                cc: "MA",
                cd: "Morocco",
                desc_en: "",
                name_ru: "Марокко",
                desc_ru: ""
            }, {
                mask: "+377(###)###-###",
                cc: "MC",
                cd: "Monaco",
                desc_en: "",
                name_ru: "Монако",
                desc_ru: ""
            }, {
                mask: "+377-##-###-###",
                cc: "MC",
                cd: "Monaco",
                desc_en: "",
                name_ru: "Монако",
                desc_ru: ""
            }, {
                mask: "+373-####-####",
                cc: "MD",
                cd: "Moldova",
                desc_en: "",
                name_ru: "Молдова",
                desc_ru: ""
            }, {
                mask: "+382-##-###-###",
                cc: "ME",
                cd: "Montenegro",
                desc_en: "",
                name_ru: "Черногория",
                desc_ru: ""
            }, {
                mask: "+261-##-##-#####",
                cc: "MG",
                cd: "Madagascar",
                desc_en: "",
                name_ru: "Мадагаскар",
                desc_ru: ""
            }, {
                mask: "+692-###-####",
                cc: "MH",
                cd: "Marshall Islands",
                desc_en: "",
                name_ru: "Маршалловы Острова",
                desc_ru: ""
            }, {
                mask: "+389-##-###-###",
                cc: "MK",
                cd: "Republic of Macedonia",
                desc_en: "",
                name_ru: "Респ. Македония",
                desc_ru: ""
            }, {
                mask: "+223-##-##-####",
                cc: "ML",
                cd: "Mali",
                desc_en: "",
                name_ru: "Мали",
                desc_ru: ""
            }, {
                mask: "+95-##-###-###",
                cc: "MM",
                cd: "Burma (Myanmar)",
                desc_en: "",
                name_ru: "Бирма (Мьянма)",
                desc_ru: ""
            }, {
                mask: "+95-#-###-###",
                cc: "MM",
                cd: "Burma (Myanmar)",
                desc_en: "",
                name_ru: "Бирма (Мьянма)",
                desc_ru: ""
            }, {
                mask: "+95-###-###",
                cc: "MM",
                cd: "Burma (Myanmar)",
                desc_en: "",
                name_ru: "Бирма (Мьянма)",
                desc_ru: ""
            }, {
                mask: "+976-##-##-####",
                cc: "MN",
                cd: "Mongolia",
                desc_en: "",
                name_ru: "Монголия",
                desc_ru: ""
            }, {
                mask: "+853-####-####",
                cc: "MO",
                cd: "Macau",
                desc_en: "",
                name_ru: "Макао",
                desc_ru: ""
            }, {
                mask: "+1(670)###-####",
                cc: "MP",
                cd: "Northern Mariana Islands",
                desc_en: "",
                name_ru: "Северные Марианские острова Сайпан",
                desc_ru: ""
            }, {
                mask: "+596(###)##-##-##",
                cc: "MQ",
                cd: "Martinique",
                desc_en: "",
                name_ru: "Мартиника",
                desc_ru: ""
            }, {
                mask: "+222-##-##-####",
                cc: "MR",
                cd: "Mauritania",
                desc_en: "",
                name_ru: "Мавритания",
                desc_ru: ""
            }, {
                mask: "+1(664)###-####",
                cc: "MS",
                cd: "Montserrat",
                desc_en: "",
                name_ru: "Монтсеррат",
                desc_ru: ""
            }, {
                mask: "+356-####-####",
                cc: "MT",
                cd: "Malta",
                desc_en: "",
                name_ru: "Мальта",
                desc_ru: ""
            }, {
                mask: "+230-###-####",
                cc: "MU",
                cd: "Mauritius",
                desc_en: "",
                name_ru: "Маврикий",
                desc_ru: ""
            }, {
                mask: "+960-###-####",
                cc: "MV",
                cd: "Maldives",
                desc_en: "",
                name_ru: "Мальдивские острова",
                desc_ru: ""
            }, {
                mask: "+265-1-###-###",
                cc: "MW",
                cd: "Malawi",
                desc_en: "Telecom Ltd",
                name_ru: "Малави",
                desc_ru: "Telecom Ltd"
            }, {
                mask: "+265-#-####-####",
                cc: "MW",
                cd: "Malawi",
                desc_en: "",
                name_ru: "Малави",
                desc_ru: ""
            }, {
                mask: "+52(###)###-####",
                cc: "MX",
                cd: "Mexico",
                desc_en: "",
                name_ru: "Мексика",
                desc_ru: ""
            }, {
                mask: "+52-##-##-####",
                cc: "MX",
                cd: "Mexico",
                desc_en: "",
                name_ru: "Мексика",
                desc_ru: ""
            }, {
                mask: "+60-##-###-####",
                cc: "MY",
                cd: "Malaysia ",
                desc_en: "mobile",
                name_ru: "Малайзия ",
                desc_ru: "мобильные"
            }, {
                mask: "+60-11-####-####",
                cc: "MY",
                cd: "Malaysia ",
                desc_en: "mobile",
                name_ru: "Малайзия ",
                desc_ru: "мобильные"
            }, {
                mask: "+60(###)###-###",
                cc: "MY",
                cd: "Malaysia",
                desc_en: "",
                name_ru: "Малайзия",
                desc_ru: ""
            }, {
                mask: "+60-##-###-###",
                cc: "MY",
                cd: "Malaysia",
                desc_en: "",
                name_ru: "Малайзия",
                desc_ru: ""
            }, {
                mask: "+60-#-###-###",
                cc: "MY",
                cd: "Malaysia",
                desc_en: "",
                name_ru: "Малайзия",
                desc_ru: ""
            }, {
                mask: "+258-##-###-###",
                cc: "MZ",
                cd: "Mozambique",
                desc_en: "",
                name_ru: "Мозамбик",
                desc_ru: ""
            }, {
                mask: "+264-##-###-####",
                cc: "NA",
                cd: "Namibia",
                desc_en: "",
                name_ru: "Намибия",
                desc_ru: ""
            }, {
                mask: "+687-##-####",
                cc: "NC",
                cd: "New Caledonia",
                desc_en: "",
                name_ru: "Новая Каледония",
                desc_ru: ""
            }, {
                mask: "+227-##-##-####",
                cc: "NE",
                cd: "Niger",
                desc_en: "",
                name_ru: "Нигер",
                desc_ru: ""
            }, {
                mask: "+672-3##-###",
                cc: "NF",
                cd: "Norfolk Island",
                desc_en: "",
                name_ru: "Норфолк (остров)",
                desc_ru: ""
            }, {
                mask: "+234(###)###-####",
                cc: "NG",
                cd: "Nigeria",
                desc_en: "",
                name_ru: "Нигерия",
                desc_ru: ""
            }, {
                mask: "+234-##-###-###",
                cc: "NG",
                cd: "Nigeria",
                desc_en: "",
                name_ru: "Нигерия",
                desc_ru: ""
            }, {
                mask: "+234-##-###-##",
                cc: "NG",
                cd: "Nigeria",
                desc_en: "",
                name_ru: "Нигерия",
                desc_ru: ""
            }, {
                mask: "+234(###)###-####",
                cc: "NG",
                cd: "Nigeria ",
                desc_en: "mobile",
                name_ru: "Нигерия ",
                desc_ru: "мобильные"
            }, {
                mask: "+505-####-####",
                cc: "NI",
                cd: "Nicaragua",
                desc_en: "",
                name_ru: "Никарагуа",
                desc_ru: ""
            }, {
                mask: "+31-##-###-####",
                cc: "NL",
                cd: "Netherlands",
                desc_en: "",
                name_ru: "Нидерланды",
                desc_ru: ""
            }, {
                mask: "+47(###)##-###",
                cc: "NO",
                cd: "Norway",
                desc_en: "",
                name_ru: "Норвегия",
                desc_ru: ""
            }, {
                mask: "+977-##-###-###",
                cc: "NP",
                cd: "Nepal",
                desc_en: "",
                name_ru: "Непал",
                desc_ru: ""
            }, {
                mask: "+674-###-####",
                cc: "NR",
                cd: "Nauru",
                desc_en: "",
                name_ru: "Науру",
                desc_ru: ""
            }, {
                mask: "+683-####",
                cc: "NU",
                cd: "Niue",
                desc_en: "",
                name_ru: "Ниуэ",
                desc_ru: ""
            }, {
                mask: "+64(###)###-###",
                cc: "NZ",
                cd: "New Zealand",
                desc_en: "",
                name_ru: "Новая Зеландия",
                desc_ru: ""
            }, {
                mask: "+64-##-###-###",
                cc: "NZ",
                cd: "New Zealand",
                desc_en: "",
                name_ru: "Новая Зеландия",
                desc_ru: ""
            }, {
                mask: "+64(###)###-####",
                cc: "NZ",
                cd: "New Zealand",
                desc_en: "",
                name_ru: "Новая Зеландия",
                desc_ru: ""
            }, {
                mask: "+968-##-###-###",
                cc: "OM",
                cd: "Oman",
                desc_en: "",
                name_ru: "Оман",
                desc_ru: ""
            }, {
                mask: "+507-###-####",
                cc: "PA",
                cd: "Panama",
                desc_en: "",
                name_ru: "Панама",
                desc_ru: ""
            }, {
                mask: "+51(###)###-###",
                cc: "PE",
                cd: "Peru",
                desc_en: "",
                name_ru: "Перу",
                desc_ru: ""
            }, {
                mask: "+689-##-##-##",
                cc: "PF",
                cd: "French Polynesia",
                desc_en: "",
                name_ru: "Французская Полинезия (Таити)",
                desc_ru: ""
            }, {
                mask: "+675(###)##-###",
                cc: "PG",
                cd: "Papua New Guinea",
                desc_en: "",
                name_ru: "Папуа-Новая Гвинея",
                desc_ru: ""
            }, {
                mask: "+63(###)###-####",
                cc: "PH",
                cd: "Philippines",
                desc_en: "",
                name_ru: "Филиппины",
                desc_ru: ""
            }, {
                mask: "+92(###)###-####",
                cc: "PK",
                cd: "Pakistan",
                desc_en: "",
                name_ru: "Пакистан",
                desc_ru: ""
            }, {
                mask: "+48(###)###-###",
                cc: "PL",
                cd: "Poland",
                desc_en: "",
                name_ru: "Польша",
                desc_ru: ""
            }, {
                mask: "+970-##-###-####",
                cc: "PS",
                cd: "Palestine",
                desc_en: "",
                name_ru: "Палестина",
                desc_ru: ""
            }, {
                mask: "+351-##-###-####",
                cc: "PT",
                cd: "Portugal",
                desc_en: "",
                name_ru: "Португалия",
                desc_ru: ""
            }, {
                mask: "+680-###-####",
                cc: "PW",
                cd: "Palau",
                desc_en: "",
                name_ru: "Палау",
                desc_ru: ""
            }, {
                mask: "+595(###)###-###",
                cc: "PY",
                cd: "Paraguay",
                desc_en: "",
                name_ru: "Парагвай",
                desc_ru: ""
            }, {
                mask: "+974-####-####",
                cc: "QA",
                cd: "Qatar",
                desc_en: "",
                name_ru: "Катар",
                desc_ru: ""
            }, {
                mask: "+262-#####-####",
                cc: "RE",
                cd: "Reunion",
                desc_en: "",
                name_ru: "Реюньон",
                desc_ru: ""
            }, {
                mask: "+40-##-###-####",
                cc: "RO",
                cd: "Romania",
                desc_en: "",
                name_ru: "Румыния",
                desc_ru: ""
            }, {
                mask: "+381-##-###-####",
                cc: "RS",
                cd: "Serbia",
                desc_en: "",
                name_ru: "Сербия",
                desc_ru: ""
            }, {
                mask: "+7(###)###-##-##",
                cc: "RU",
                cd: "Russia",
                desc_en: "",
                name_ru: "Россия",
                desc_ru: ""
            }, {
                mask: "+250(###)###-###",
                cc: "RW",
                cd: "Rwanda",
                desc_en: "",
                name_ru: "Руанда",
                desc_ru: ""
            }, {
                mask: "+966-5-####-####",
                cc: "SA",
                cd: "Saudi Arabia ",
                desc_en: "mobile",
                name_ru: "Саудовская Аравия ",
                desc_ru: "мобильные"
            }, {
                mask: "+966-#-###-####",
                cc: "SA",
                cd: "Saudi Arabia",
                desc_en: "",
                name_ru: "Саудовская Аравия",
                desc_ru: ""
            }, {
                mask: "+677-###-####",
                cc: "SB",
                cd: "Solomon Islands ",
                desc_en: "mobile",
                name_ru: "Соломоновы Острова ",
                desc_ru: "мобильные"
            }, {
                mask: "+677-#####",
                cc: "SB",
                cd: "Solomon Islands",
                desc_en: "",
                name_ru: "Соломоновы Острова",
                desc_ru: ""
            }, {
                mask: "+248-#-###-###",
                cc: "SC",
                cd: "Seychelles",
                desc_en: "",
                name_ru: "Сейшелы",
                desc_ru: ""
            }, {
                mask: "+249-##-###-####",
                cc: "SD",
                cd: "Sudan",
                desc_en: "",
                name_ru: "Судан",
                desc_ru: ""
            }, {
                mask: "+46-##-###-####",
                cc: "SE",
                cd: "Sweden",
                desc_en: "",
                name_ru: "Швеция",
                desc_ru: ""
            }, {
                mask: "+65-####-####",
                cc: "SG",
                cd: "Singapore",
                desc_en: "",
                name_ru: "Сингапур",
                desc_ru: ""
            }, {
                mask: "+290-####",
                cc: "SH",
                cd: "Saint Helena",
                desc_en: "",
                name_ru: "Остров Святой Елены",
                desc_ru: ""
            }, {
                mask: "+290-####",
                cc: "SH",
                cd: "Tristan da Cunha",
                desc_en: "",
                name_ru: "Тристан-да-Кунья",
                desc_ru: ""
            }, {
                mask: "+386-##-###-###",
                cc: "SI",
                cd: "Slovenia",
                desc_en: "",
                name_ru: "Словения",
                desc_ru: ""
            }, {
                mask: "+421(###)###-###",
                cc: "SK",
                cd: "Slovakia",
                desc_en: "",
                name_ru: "Словакия",
                desc_ru: ""
            }, {
                mask: "+232-##-######",
                cc: "SL",
                cd: "Sierra Leone",
                desc_en: "",
                name_ru: "Сьерра-Леоне",
                desc_ru: ""
            }, {
                mask: "+378-####-######",
                cc: "SM",
                cd: "San Marino",
                desc_en: "",
                name_ru: "Сан-Марино",
                desc_ru: ""
            }, {
                mask: "+221-##-###-####",
                cc: "SN",
                cd: "Senegal",
                desc_en: "",
                name_ru: "Сенегал",
                desc_ru: ""
            }, {
                mask: "+252-##-###-###",
                cc: "SO",
                cd: "Somalia",
                desc_en: "",
                name_ru: "Сомали",
                desc_ru: ""
            }, {
                mask: "+252-#-###-###",
                cc: "SO",
                cd: "Somalia",
                desc_en: "",
                name_ru: "Сомали",
                desc_ru: ""
            }, {
                mask: "+252-#-###-###",
                cc: "SO",
                cd: "Somalia ",
                desc_en: "mobile",
                name_ru: "Сомали ",
                desc_ru: "мобильные"
            }, {
                mask: "+597-###-####",
                cc: "SR",
                cd: "Suriname ",
                desc_en: "mobile",
                name_ru: "Суринам ",
                desc_ru: "мобильные"
            }, {
                mask: "+597-###-###",
                cc: "SR",
                cd: "Suriname",
                desc_en: "",
                name_ru: "Суринам",
                desc_ru: ""
            }, {
                mask: "+211-##-###-####",
                cc: "SS",
                cd: "South Sudan",
                desc_en: "",
                name_ru: "Южный Судан",
                desc_ru: ""
            }, {
                mask: "+239-##-#####",
                cc: "ST",
                cd: "Sao Tome and Principe",
                desc_en: "",
                name_ru: "Сан-Томе и Принсипи",
                desc_ru: ""
            }, {
                mask: "+503-##-##-####",
                cc: "SV",
                cd: "El Salvador",
                desc_en: "",
                name_ru: "Сальвадор",
                desc_ru: ""
            }, {
                mask: "+1(721)###-####",
                cc: "SX",
                cd: "Sint Maarten",
                desc_en: "",
                name_ru: "Синт-Маартен",
                desc_ru: ""
            }, {
                mask: "+963-##-####-###",
                cc: "SY",
                cd: "Syrian Arab Republic",
                desc_en: "",
                name_ru: "Сирийская арабская республика",
                desc_ru: ""
            }, {
                mask: "+268-##-##-####",
                cc: "SZ",
                cd: "Swaziland",
                desc_en: "",
                name_ru: "Свазиленд",
                desc_ru: ""
            }, {
                mask: "+1(649)###-####",
                cc: "TC",
                cd: "Turks & Caicos",
                desc_en: "",
                name_ru: "Тёркс и Кайкос",
                desc_ru: ""
            }, {
                mask: "+235-##-##-##-##",
                cc: "TD",
                cd: "Chad",
                desc_en: "",
                name_ru: "Чад",
                desc_ru: ""
            }, {
                mask: "+228-##-###-###",
                cc: "TG",
                cd: "Togo",
                desc_en: "",
                name_ru: "Того",
                desc_ru: ""
            }, {
                mask: "+66-##-###-####",
                cc: "TH",
                cd: "Thailand ",
                desc_en: "mobile",
                name_ru: "Таиланд ",
                desc_ru: "мобильные"
            }, {
                mask: "+66-##-###-###",
                cc: "TH",
                cd: "Thailand",
                desc_en: "",
                name_ru: "Таиланд",
                desc_ru: ""
            }, {
                mask: "+992-##-###-####",
                cc: "TJ",
                cd: "Tajikistan",
                desc_en: "",
                name_ru: "Таджикистан",
                desc_ru: ""
            }, {
                mask: "+690-####",
                cc: "TK",
                cd: "Tokelau",
                desc_en: "",
                name_ru: "Токелау",
                desc_ru: ""
            }, {
                mask: "+670-###-####",
                cc: "TL",
                cd: "East Timor",
                desc_en: "",
                name_ru: "Восточный Тимор",
                desc_ru: ""
            }, {
                mask: "+670-77#-#####",
                cc: "TL",
                cd: "East Timor",
                desc_en: "Timor Telecom",
                name_ru: "Восточный Тимор",
                desc_ru: "Timor Telecom"
            }, {
                mask: "+670-78#-#####",
                cc: "TL",
                cd: "East Timor",
                desc_en: "Timor Telecom",
                name_ru: "Восточный Тимор",
                desc_ru: "Timor Telecom"
            }, {
                mask: "+993-#-###-####",
                cc: "TM",
                cd: "Turkmenistan",
                desc_en: "",
                name_ru: "Туркменистан",
                desc_ru: ""
            }, {
                mask: "+216-##-###-###",
                cc: "TN",
                cd: "Tunisia",
                desc_en: "",
                name_ru: "Тунис",
                desc_ru: ""
            }, {
                mask: "+676-#####",
                cc: "TO",
                cd: "Tonga",
                desc_en: "",
                name_ru: "Тонга",
                desc_ru: ""
            }, {
                mask: "+90(###)###-####",
                cc: "TR",
                cd: "Turkey",
                desc_en: "",
                name_ru: "Турция",
                desc_ru: ""
            }, {
                mask: "+1(868)###-####",
                cc: "TT",
                cd: "Trinidad & Tobago",
                desc_en: "",
                name_ru: "Тринидад и Тобаго",
                desc_ru: ""
            }, {
                mask: "+688-90####",
                cc: "TV",
                cd: "Tuvalu ",
                desc_en: "mobile",
                name_ru: "Тувалу ",
                desc_ru: "мобильные"
            }, {
                mask: "+688-2####",
                cc: "TV",
                cd: "Tuvalu",
                desc_en: "",
                name_ru: "Тувалу",
                desc_ru: ""
            }, {
                mask: "+886-#-####-####",
                cc: "TW",
                cd: "Taiwan",
                desc_en: "",
                name_ru: "Тайвань",
                desc_ru: ""
            }, {
                mask: "+886-####-####",
                cc: "TW",
                cd: "Taiwan",
                desc_en: "",
                name_ru: "Тайвань",
                desc_ru: ""
            }, {
                mask: "+255-##-###-####",
                cc: "TZ",
                cd: "Tanzania",
                desc_en: "",
                name_ru: "Танзания",
                desc_ru: ""
            }, {
                mask: "+380(##)###-##-##",
                cc: "UA",
                cd: "Ukraine",
                desc_en: "",
                name_ru: "Украина",
                desc_ru: ""
            }, {
                mask: "+256(###)###-###",
                cc: "UG",
                cd: "Uganda",
                desc_en: "",
                name_ru: "Уганда",
                desc_ru: ""
            }, {
                mask: "+44-##-####-####",
                cc: "UK",
                cd: "United Kingdom",
                desc_en: "",
                name_ru: "Великобритания",
                desc_ru: ""
            }, {
                mask: "+598-#-###-##-##",
                cc: "UY",
                cd: "Uruguay",
                desc_en: "",
                name_ru: "Уругвай",
                desc_ru: ""
            }, {
                mask: "+998-##-###-####",
                cc: "UZ",
                cd: "Uzbekistan",
                desc_en: "",
                name_ru: "Узбекистан",
                desc_ru: ""
            }, {
                mask: "+39-6-698-#####",
                cc: "VA",
                cd: "Vatican City",
                desc_en: "",
                name_ru: "Ватикан",
                desc_ru: ""
            }, {
                mask: "+1(784)###-####",
                cc: "VC",
                cd: "Saint Vincent & the Grenadines",
                desc_en: "",
                name_ru: "Сент-Винсент и Гренадины",
                desc_ru: ""
            }, {
                mask: "+58(###)###-####",
                cc: "VE",
                cd: "Venezuela",
                desc_en: "",
                name_ru: "Венесуэла",
                desc_ru: ""
            }, {
                mask: "+1(284)###-####",
                cc: "VG",
                cd: "British Virgin Islands",
                desc_en: "",
                name_ru: "Британские Виргинские острова",
                desc_ru: ""
            }, {
                mask: "+1(340)###-####",
                cc: "VI",
                cd: "US Virgin Islands",
                desc_en: "",
                name_ru: "Американские Виргинские острова",
                desc_ru: ""
            }, {
                mask: "+84-##-####-###",
                cc: "VN",
                cd: "Vietnam",
                desc_en: "",
                name_ru: "Вьетнам",
                desc_ru: ""
            }, {
                mask: "+84(###)####-###",
                cc: "VN",
                cd: "Vietnam",
                desc_en: "",
                name_ru: "Вьетнам",
                desc_ru: ""
            }, {
                mask: "+678-##-#####",
                cc: "VU",
                cd: "Vanuatu ",
                desc_en: "mobile",
                name_ru: "Вануату ",
                desc_ru: "мобильные"
            }, {
                mask: "+678-#####",
                cc: "VU",
                cd: "Vanuatu",
                desc_en: "",
                name_ru: "Вануату",
                desc_ru: ""
            }, {
                mask: "+681-##-####",
                cc: "WF",
                cd: "Wallis and Futuna",
                desc_en: "",
                name_ru: "Уоллис и Футуна",
                desc_ru: ""
            }, {
                mask: "+685-##-####",
                cc: "WS",
                cd: "Samoa",
                desc_en: "",
                name_ru: "Самоа",
                desc_ru: ""
            }, {
                mask: "+967-###-###-###",
                cc: "YE",
                cd: "Yemen ",
                desc_en: "mobile",
                name_ru: "Йемен ",
                desc_ru: "мобильные"
            }, {
                mask: "+967-#-###-###",
                cc: "YE",
                cd: "Yemen",
                desc_en: "",
                name_ru: "Йемен",
                desc_ru: ""
            }, {
                mask: "+967-##-###-###",
                cc: "YE",
                cd: "Yemen",
                desc_en: "",
                name_ru: "Йемен",
                desc_ru: ""
            }, {
                mask: "+27-##-###-####",
                cc: "ZA",
                cd: "South Africa",
                desc_en: "",
                name_ru: "Южно-Африканская Респ.",
                desc_ru: ""
            }, {
                mask: "+260-##-###-####",
                cc: "ZM",
                cd: "Zambia",
                desc_en: "",
                name_ru: "Замбия",
                desc_ru: ""
            }, {
                mask: "+263-#-######",
                cc: "ZW",
                cd: "Zimbabwe",
                desc_en: "",
                name_ru: "Зимбабве",
                desc_ru: ""
            }, {
                mask: "+1(###)###-####",
                cc: [ "US", "CA" ],
                cd: "USA and Canada",
                desc_en: "",
                name_ru: "США и Канада",
                desc_ru: ""
            } ]
        }
    }), Inputmask;
});