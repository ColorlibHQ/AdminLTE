/*!
* phone-codes/phone-ru.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.7
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "../inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("../inputmask")) : factory(window.Inputmask);
}(function(Inputmask) {
    return Inputmask.extendAliases({
        phoneru: {
            alias: "abstractphone",
            countrycode: "7",
            phoneCodes: [ {
                mask: "+7(301)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3012)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0423\u043b\u0430\u043d-\u0423\u0434\u044d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30130)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: [ "\u041d\u0438\u0436\u043d\u0435\u0430\u043d\u0433\u0430\u0440\u0441\u043a", "\u0421\u0435\u0432\u0435\u0440\u043e\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(30131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0411\u0430\u0440\u0433\u0443\u0437\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0422\u0430\u043a\u0441\u0438\u043c\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0411\u0438\u0447\u0443\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u041f\u0435\u0442\u0440\u043e\u043f\u0430\u0432\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0421\u043e\u0441\u043d\u043e\u0432\u043e-\u041e\u0437\u0451\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0417\u0430\u0438\u0433\u0440\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0417\u0430\u043a\u0430\u043c\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u041a\u0430\u0431\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0418\u0432\u043e\u043b\u0433\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u041a\u0438\u0436\u0438\u043d\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u041a\u044f\u0445\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u041c\u0443\u0445\u043e\u0440\u0448\u0438\u0431\u0438\u0440\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0422\u0443\u0440\u0443\u043d\u0442\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0413\u0443\u0441\u0438\u043d\u043e\u043e\u0437\u0451\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0422\u0430\u0440\u0431\u0430\u0433\u0430\u0442\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u041a\u044b\u0440\u0435\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0425\u043e\u0440\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u041a\u0443\u0440\u0443\u043c\u043a\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u041e\u0440\u043b\u0438\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0443\u0440\u044f\u0442\u0438\u044f",
                city: "\u0411\u0430\u0433\u0434\u0430\u0440\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(302)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3022)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0438\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30230)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0439 \u0427\u0438\u043a\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30231)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043a\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30232)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0430\u043b\u0435\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30233)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u0440\u0437\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30234)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u0440\u044b\u043c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30235)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u044b\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30236)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0435\u0442\u0440\u043e\u0432\u0441\u043a-\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30237)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0425\u0438\u043b\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30238)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u043b\u0451\u0442\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30239)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0433\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30240)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u0417\u0430\u0432\u043e\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30241)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u043e\u0433\u043e\u0447\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30242)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0435\u0440\u0447\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30243)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0440\u0438\u0430\u0440\u0433\u0443\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0428\u0438\u043b\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30245)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u043a\u0430\u043c\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30246)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0440\u0435\u0442\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30247)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0430\u0437\u0438\u043c\u0443\u0440\u0441\u043a\u0438\u0439 \u0417\u0430\u0432\u043e\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30248)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0435\u0440\u0447\u0438\u043d\u0441\u043a\u0438\u0439 \u0417\u0430\u0432\u043e\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30249)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u043b\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30251)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30252)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0438\u0436\u043d\u0438\u0439 \u0426\u0430\u0441\u0443\u0447\u0435\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30253)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u043b\u043e\u0432\u044f\u043d\u043d\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30255)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u043e\u0433\u043e\u0439\u0442\u0443\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30256)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0443\u043b\u044c\u0434\u0443\u0440\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30257)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u043e\u0440\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30261)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: [ "\u041a\u0430\u043b\u0430\u0440", "\u0427\u0430\u0440\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(30262)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0435\u0440\u0432\u043e\u043c\u0430\u0439\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30264)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u0435\u0440\u0445-\u0423\u0441\u0443\u0433\u043b\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30265)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0435\u0440\u043d\u044b\u0448\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(30266)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0417\u0430\u0431\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0428\u0435\u043b\u043e\u043f\u0443\u0433\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(341)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3412)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0418\u0436\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34126)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0417\u0430\u0432\u044c\u044f\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34130)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0423\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041a\u0430\u0440\u0430\u043a\u0443\u043b\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041a\u0438\u044f\u0441\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0418\u0433\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0428\u0430\u0440\u043a\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041c\u0430\u043b\u0430\u044f \u041f\u0443\u0440\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34139)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041c\u043e\u0436\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0413\u043b\u0430\u0437\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0412\u043e\u0442\u043a\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0421\u0430\u0440\u0430\u043f\u0443\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0410\u043b\u043d\u0430\u0448\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0414\u0435\u0431\u0451\u0441\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0421\u044e\u043c\u0441\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041a\u0430\u043c\u0431\u0430\u0440\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041a\u0438\u0437\u043d\u0435\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0412\u0430\u0432\u043e\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u042f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041a\u0435\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0421\u0435\u043b\u0442\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u042e\u043a\u0430\u043c\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34162)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u042f\u043a\u0448\u0443\u0440-\u0411\u043e\u0434\u044c\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0413\u0440\u0430\u0445\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0433\u043e\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34166)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0411\u0430\u043b\u0435\u0437\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(342)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(342)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0435\u0440\u043c\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(342)3##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0435\u0440\u043c\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3424)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0435\u0440\u0435\u0437\u043d\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34240)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0435\u0440\u0434\u044b\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34241)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0430\u0439\u043a\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34243)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0432\u0438\u0448\u0435\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u043e\u043b\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34245)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0430\u0439\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34246)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u042e\u0441\u044c\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34248)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0443\u0431\u0430\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34249)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u044b\u0441\u044c\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34250)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0440\u0435\u043c\u044f\u0447\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34251)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0435\u0440\u0435\u0437\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34252)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u041a\u0438\u0448\u0435\u0440\u0442\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34253)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043e\u043b\u0438\u043a\u0430\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34254)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u0435\u0440\u0435\u0449\u0430\u0433\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34255)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0438\u0437\u0435\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34256)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0443\u0441\u043e\u0432\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34257)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u043b\u044c\u0448\u0430\u044f \u0421\u043e\u0441\u043d\u043e\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34258)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u0440\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34259)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34260)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0434\u044b\u043c\u043a\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34261)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0435\u0440\u043d\u0443\u0448\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34262)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0435\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34263)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u0432\u0451\u0437\u0434\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34265)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u043e\u0431\u0440\u044f\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34266)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34268)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0430\u0441\u0442\u044b\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34269)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u043e\u0440\u043d\u043e\u0437\u0430\u0432\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34271)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u043d\u0433\u0443\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34272)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u044b\u0442\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34273)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u043a\u0430\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34274)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34275)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0443\u043a\u0441\u0443\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34276)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0418\u043b\u044c\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34277)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0438\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34278)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u0447\u0435\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34279)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u0445\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34291)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34292)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0430\u0440\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34293)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u0447\u0451\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34294)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u042e\u0440\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34296)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34297)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u0440\u0430\u0433\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34298)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u0440\u043c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(343)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(343)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043a\u0430\u0442\u0435\u0440\u0438\u043d\u0431\u0443\u0440\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(343)3##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043a\u0430\u0442\u0435\u0440\u0438\u043d\u0431\u0443\u0440\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0447\u043a\u0430\u043d\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34342)2-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u044f\u044f \u0422\u0443\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34342)3-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0441\u043d\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34342)5-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0441\u043d\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34342)6-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0441\u043d\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34343)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0443\u0440\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0448\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043d\u044f\u044f \u0421\u0430\u043b\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0430\u043f\u0430\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0431\u043e\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34349)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0443\u0440\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3435)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u0438\u0439 \u0422\u0430\u0433\u0438\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34350)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043b\u0435\u0432\u0441\u043a\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0440\u0431\u0438\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34356)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u0432\u044c\u044f\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34357)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u043e\u0432\u0433\u0440\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34358)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34360)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0432\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0443\u0440\u0438\u043d\u0441\u043a\u0430\u044f \u0421\u043b\u043e\u0431\u043e\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34362)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0439\u043a\u0430\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34363)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0442\u0435\u043c\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34364)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0435\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0441\u0431\u0435\u0441\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34367)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0443\u0433\u0443\u043b\u044b\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34368)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043d\u044f\u044f \u041f\u044b\u0448\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34369)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0440\u0451\u0437\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34370)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0443\u0440\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34371)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u043b\u0438\u0446\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34372)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u044b\u0448\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34373)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0445\u043e\u0439 \u041b\u043e\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34374)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u044b\u0441\u0435\u0440\u0442\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34375)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u044b\u0448\u043b\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34376)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0433\u0434\u0430\u043d\u043e\u0432\u0438\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34377)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u043e\u044f\u0440\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34380)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0432\u0435\u0440\u043e\u0443\u0440\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34383)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u043f\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34383)5-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u0447\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34384)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0442\u0443\u0440\u044c\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34385)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34386)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0432\u0434\u0435\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34387)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u0440\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34388)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u0430\u044f \u041b\u044f\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34389)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043e\u0442\u0443\u0440\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3439)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0432\u043e\u0443\u0440\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3439)3#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u0435\u043d\u0441\u043a-\u0423\u0440\u0430\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3439)54-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u0435\u043d\u0441\u043a-\u0423\u0440\u0430\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3439)6#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0432\u043e\u0443\u0440\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34391)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0447\u0438\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34394)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0443\u0444\u0438\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34395)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0442\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34397)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0435\u0432\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34398)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0432\u0435\u0440\u0434\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u0438\u0435 \u0421\u0435\u0440\u0433\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(345)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3452)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u044e\u043c\u0435\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34531)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u0440\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34533)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u044f\u044f \u0422\u0430\u0432\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34535)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u043b\u0443\u0442\u043e\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34537)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0441\u0435\u0442\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34539)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u0433\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34541)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u043f\u043e\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34542)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0432\u043e\u0434\u043e\u0443\u043a\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34543)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0440\u0433\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34544)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043c\u0443\u0442\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34545)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u043e\u043c\u0430\u0448\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34546)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u043b\u044b\u0448\u043c\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34547)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u043c\u0438\u0437\u043e\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34550)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0435 \u0421\u043e\u0440\u043e\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34551)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0448\u0438\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34553)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0437\u0430\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34554)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0440\u0434\u044e\u0436\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34555)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043b\u0430\u0434\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34556)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0431\u0430\u0442\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34557)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0438\u043a\u0443\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3456)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u0431\u043e\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34561)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u044e\u043c\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0432\u0430\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(346)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3462)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0421\u0443\u0440\u0433\u0443\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3463)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041d\u0435\u0444\u0442\u0435\u044e\u0433\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34634)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041f\u044b\u0442\u044c-\u042f\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34638)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041b\u044f\u043d\u0442\u043e\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34643)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041c\u0435\u0433\u0438\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3466)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041d\u0438\u0436\u043d\u0435\u0432\u0430\u0440\u0442\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34667)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041a\u043e\u0433\u0430\u043b\u044b\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34668)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0420\u0430\u0434\u0443\u0436\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34669)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041b\u0430\u043d\u0433\u0435\u043f\u0430\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34670)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0411\u0435\u043b\u043e\u044f\u0440\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34672)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041d\u044f\u0433\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34673)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34674)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0411\u0435\u0440\u0451\u0437\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34675)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34676)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0423\u0440\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34677)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041a\u043e\u043d\u0434\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34678)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043d\u0442\u044b-\u041c\u0430\u043d\u0441\u0438\u0439\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(347)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(347)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0423\u0444\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3473)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0421\u0442\u0435\u0440\u043b\u0438\u0442\u0430\u043c\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34731)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0410\u0433\u0438\u0434\u0435\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34739)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0421\u0442\u0435\u0440\u043b\u0438\u0431\u0430\u0448\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34740)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0443\u0441\u043e\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34741)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0415\u0440\u043c\u0435\u043a\u0435\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34742)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u0430\u043a\u0430\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34743)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u0438\u0436\u0431\u0443\u043b\u044f\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34744)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041a\u0430\u0440\u0430\u0438\u0434\u0435\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34745)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0422\u043e\u043b\u0431\u0430\u0437\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34746)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0424\u0451\u0434\u043e\u0440\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34747)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u042f\u0437\u044b\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34748)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0412\u0435\u0440\u0445\u043d\u0438\u0435 \u041a\u0438\u0433\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34749)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041c\u0438\u0448\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34750)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041d\u043e\u0432\u043e\u0431\u0435\u043b\u043e\u043a\u0430\u0442\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34751)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u0430\u0439\u043c\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34752)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0417\u0438\u043b\u0430\u0438\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34753)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0421\u0442\u0430\u0440\u043e\u0431\u0430\u043b\u0442\u0430\u0447\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34754)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0420\u0430\u0435\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34755)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0421\u0442\u0430\u0440\u043e\u0441\u0443\u0431\u0445\u0430\u043d\u0433\u0443\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34756)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u0443\u0440\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34757)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0415\u0440\u043c\u043e\u043b\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34758)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0410\u043a\u044a\u044f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34759)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041d\u0438\u043a\u043e\u043b\u043e-\u0411\u0435\u0440\u0435\u0437\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34760)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u042f\u043d\u0430\u0443\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34761)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041a\u0443\u043c\u0435\u0440\u0442\u0430\u0443",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34762)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0412\u0435\u0440\u0445\u043d\u0435\u044f\u0440\u043a\u0435\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34763)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0421\u0430\u043b\u0430\u0432\u0430\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34764)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041c\u0435\u043b\u0435\u0443\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34765)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041a\u0430\u0440\u043c\u0430\u0441\u043a\u0430\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34766)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u043b\u0430\u0433\u043e\u0432\u0435\u0449\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34767)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34768)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0414\u0430\u0432\u043b\u0435\u043a\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34769)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0428\u0430\u0440\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34770)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u043e\u043b\u044c\u0448\u0435\u0443\u0441\u0442\u044c\u0438\u043a\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34771)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0410\u0441\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34772)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0410\u0441\u043a\u0430\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34773)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u0443\u0437\u0434\u044f\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34774)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34775)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0421\u0438\u0431\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34776)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041a\u0440\u0430\u0441\u043d\u0430\u044f \u0413\u043e\u0440\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34777)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041c\u0430\u043b\u043e\u044f\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34778)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0412\u0435\u0440\u0445\u043d\u0438\u0435 \u0422\u0430\u0442\u044b\u0448\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34779)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041a\u0430\u043b\u0442\u0430\u0441\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34780)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041a\u0443\u0448\u043d\u0430\u0440\u0435\u043d\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34781)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041c\u0435\u0436\u0433\u043e\u0440\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34782)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0422\u0443\u0439\u043c\u0430\u0437\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34783)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041d\u0435\u0444\u0442\u0435\u043a\u0430\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34784)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u0438\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34785)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0418\u0441\u044f\u043d\u0433\u0443\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34786)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u0435\u043b\u0435\u0431\u0435\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34787)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0414\u044e\u0440\u0442\u044e\u043b\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34788)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041a\u0438\u0440\u0433\u0438\u0437-\u041c\u0438\u044f\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34789)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041c\u0440\u0430\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34791)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0423\u0447\u0430\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34792)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0411\u0435\u043b\u043e\u0440\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34794)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0418\u0448\u0438\u043c\u0431\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34795)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0418\u0433\u043b\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34796)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0427\u0435\u043a\u043c\u0430\u0433\u0443\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34797)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u0427\u0438\u0448\u043c\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34798)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0430\u0448\u043a\u043e\u0440\u0442\u043e\u0441\u0442\u0430\u043d",
                city: "\u041c\u0435\u0441\u044f\u0433\u0443\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(349)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34922)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0421\u0430\u043b\u0435\u0445\u0430\u0440\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34932)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0441\u0435\u043b\u044c\u043a\u0443\u043f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34934)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0423\u0440\u0435\u043d\u0433\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34936)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0413\u0443\u0431\u043a\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34938)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041c\u0443\u0440\u0430\u0432\u043b\u0435\u043d\u043a\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3494)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041d\u043e\u0432\u044b\u0439 \u0423\u0440\u0435\u043d\u0433\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34940)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0422\u0430\u0437\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34948)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0425\u0430\u0440\u043f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34949)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u042f\u043c\u0431\u0443\u0440\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3496)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041d\u043e\u044f\u0431\u0440\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34992)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041b\u0430\u0431\u044b\u0442\u043d\u0430\u043d\u0433\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34993)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0410\u043a\u0441\u0430\u0440\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34994)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041c\u0443\u0436\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34995)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041d\u0430\u0434\u044b\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34996)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u042f\u0440-\u0421\u0430\u043b\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(34997)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043c\u0430\u043b\u043e-\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0422\u0430\u0440\u043a\u043e-\u0421\u0430\u043b\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(351)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(351)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(351)301-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(351)7##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(351)90#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "\u0420\u043e\u0441\u0442\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: "\u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0435 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u044b \u0441 \u0437\u043e\u043d\u043e\u0432\u044b\u043c\u0438 \u043d\u043e\u043c\u0435\u0440\u0430\u043c\u0438"
            }, {
                mask: "+7(3513)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u0430\u0441\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3513)5#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u0430\u0441\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3513)6#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043b\u0430\u0442\u043e\u0443\u0441\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3513)7#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043b\u0430\u0442\u043e\u0443\u0441\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35130)2-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0437\u0451\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35130)4-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0437\u0451\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35130)6-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0437\u0451\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35130)7-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0437\u0451\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35130)9-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0437\u0451\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0433\u0430\u044f\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0442\u0430\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0436\u043d\u043e\u0443\u0440\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043c\u0430\u043d\u0436\u0435\u043b\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35139)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043f\u0435\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0433\u0430\u043f\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0440\u0435\u0434\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u0440\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043d\u0435\u0443\u0440\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u043b\u0433\u043e\u0434\u0435\u0440\u0435\u0432\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u0442\u043a\u0443\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043d\u0435\u0436\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u041a\u0430\u0442\u0430\u0432-\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a", "\u042e\u0440\u044e\u0437\u0430\u043d\u044c" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(35148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u043d\u0430\u0448\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0441\u043b\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u0430\u0441\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u044b\u0448\u0442\u044b\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0440\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0430\u0431\u0430\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0437\u0438\u043b\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u044f\u0437\u0435\u043f\u0435\u0442\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0424\u0435\u0440\u0448\u0430\u043c\u043f\u0435\u043d\u0443\u0430\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35160)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043b\u0430\u0441\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0442\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0440\u043e\u0438\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043d\u0438\u0439 \u0423\u0444\u0430\u043b\u0435\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35165)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35166)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0432\u0435\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35167)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u041a\u0430\u0442\u0430\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35168)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0431\u0430\u0440\u043a\u0443\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35169)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0441\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3519)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0433\u043d\u0438\u0442\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35191)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u043b\u044f\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0440\u0451\u0445\u0433\u043e\u0440\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(352)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3522)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0440\u0433\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35230)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0430\u0441\u0442\u043e\u043e\u0437\u0435\u0440\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35231)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0435\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35232)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u043e\u0437\u0435\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35233)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u0440\u0433\u0430\u0448\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35234)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u043a\u0440\u043e\u0443\u0441\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35235)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0442\u0443\u0445\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35236)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043a\u0443\u0448\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35237)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0431\u044f\u0436\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35238)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043b\u043e\u0432\u0438\u043d\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35239)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043b\u044f\u0434\u044f\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35240)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0432\u0435\u0440\u0438\u043d\u043e\u0433\u043e\u043b\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35241)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0426\u0435\u043b\u0438\u043d\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35242)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u044c\u043c\u0435\u043d\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35243)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0444\u0430\u043a\u0443\u043b\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0429\u0443\u0447\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35245)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0443\u043c\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35247)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u0448\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35248)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0440\u0433\u0430\u043c\u044b\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35249)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0440\u0442\u0430\u043c\u044b\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35251)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0442\u0430\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35252)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0430\u043b\u043c\u0430\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35253)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0434\u0440\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35256)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0433\u0430\u043f\u043e\u043b\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35257)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0433\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0442\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(353)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3532)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35330)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35331)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043a\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35332)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u044e\u043b\u044c\u0433\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35333)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0440\u0430\u043a\u0442\u0430\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35334)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u044f\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35335)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043a\u0431\u0443\u043b\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35336)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u043b\u044c-\u0418\u043b\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35337)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u043b\u0435\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35338)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0435\u0432\u043e\u043b\u043e\u0446\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35339)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0441\u0435\u0440\u0433\u0438\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0440\u043c\u0430\u043d\u0430\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35342)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0443\u0437\u0443\u043b\u0443\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0440\u0430\u0447\u0451\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043b\u0435\u0448\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0440\u043e\u0447\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0448\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35348)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0432\u043e\u043c\u0430\u0439\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35349)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u0446\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35351)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0441\u0435\u043a\u0435\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35352)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0443\u0433\u0443\u0440\u0443\u0441\u043b\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35354)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0432\u0435\u0440\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0431\u0434\u0443\u043b\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35356)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0442\u0432\u0435\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35357)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043d\u043e\u043c\u0430\u0440\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35358)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0440\u043b\u044b\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35359)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0432\u0430\u043d\u0434\u044b\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35362)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35363)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35364)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0432\u0430\u0440\u043a\u0435\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0434\u0430\u043c\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35366)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0432\u0435\u0442\u043b\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35367)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u043c\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35368)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u0441\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3537)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3537)3#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3537)4#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3537)6#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0442\u0440\u043e\u0438\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(35379)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u0435\u043d\u0431\u0443\u0440\u0433\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0435\u0434\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(381)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3812)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0437\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u0418\u0448\u0438\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0432\u0440\u0438\u0447\u0435\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0432\u0430\u0440\u0448\u0430\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u043b\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0435\u0432\u0440\u0438\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043b\u0430\u0447\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0443\u0441\u0441\u043a\u0430\u044f \u041f\u043e\u043b\u044f\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u0440\u044c\u043a\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0443\u0440\u043e\u043c\u0446\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0434\u0435\u0441\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38160)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u043e\u0441\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0437\u044b\u0432\u0430\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38162)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u0438\u0435 \u0423\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043b\u0442\u0430\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38165)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u044f\u044f \u041e\u043c\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38166)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043a\u043e\u043d\u0435\u0448\u043d\u0438\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38167)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0443\u0442\u0438\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38168)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0440\u044c\u044f\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38169)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u0435\u0440\u0435\u0447\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38170)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0440\u043c\u0438\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38171)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38172)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0432\u043b\u043e\u0433\u0440\u0430\u0434\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38173)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0441\u0438\u043b\u044c\u043a\u0443\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38174)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u0441\u043a\u0430\u043b\u0435\u043d\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38175)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u044e\u0431\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38176)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u044e\u043a\u0430\u043b\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38177)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0435\u0440\u0431\u0430\u043a\u0443\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38178)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0440\u0433\u0430\u0442\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38179)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043d\u0430\u043c\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(382)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3822)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3823)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0432\u0435\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38241)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0441\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38243)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u044b\u0440\u044f\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0436\u0435\u0432\u043d\u0438\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38245)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0432\u043e\u043c\u0430\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38246)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0435\u0433\u0443\u043b\u044c\u0434\u0435\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38247)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0435\u043b\u044c\u043d\u0438\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38249)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043a\u0447\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38250)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0435\u0434\u0440\u043e\u0432\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38251)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0438\u0432\u043e\u0448\u0435\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38252)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0440\u0430\u0431\u0435\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38253)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0433\u0430\u0441\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38254)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u043f\u0430\u0448\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38255)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38256)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u043b\u0447\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38257)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0434\u0433\u043e\u0440\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38258)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u044b\u0439 \u042f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38259)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0440\u0435\u0436\u0435\u0432\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(383)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38340)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u0433\u0443\u0447\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0440\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38343)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0441\u043a\u0438\u0442\u0438\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u0435\u043f\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0437\u0443\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0441\u043b\u044f\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38348)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u0448\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38349)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u043e\u0442\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38350)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0443\u043b\u044b\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38351)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0447\u0435\u043d\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38352)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u044b\u0432\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38353)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0433\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38354)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u0432\u043e\u043b\u044c\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0430\u0441\u0443\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38356)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0447\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38357)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0437\u0435\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38358)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u043f\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38359)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u0434\u044b\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38360)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0432\u0435\u0440\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0440\u0430\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38362)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0439\u0431\u044b\u0448\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38363)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0434\u0432\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38364)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0442\u0430\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0433\u0430\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38366)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0431\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38367)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0430\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38368)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0438\u0441\u0442\u043e\u043e\u0437\u0435\u0440\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38369)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u043d\u0433\u0435\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38371)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u044b\u0448\u0442\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38372)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u0422\u0430\u0440\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38373)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0431\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(384)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3842)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3843)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u043a\u0443\u0437\u043d\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38441)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38442)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u043e\u043c\u044b\u0448\u043b\u0435\u043d\u043d\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38443)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0440\u0438\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38444)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445-\u0427\u0435\u0431\u0443\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38445)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0440\u0451\u0437\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38446)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u043f\u0438\u0432\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38447)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0438\u0441\u0443\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38448)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0439\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38449)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u044f\u0436\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38451)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0440\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38452)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38453)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043d\u0436\u0435\u0440\u043e-\u0421\u0443\u0434\u0436\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38454)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u043f\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38455)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u0448\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38456)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u043d\u0438\u043d\u0441\u043a-\u041a\u0443\u0437\u043d\u0435\u0446\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38459)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0436\u043c\u043e\u0440\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3846)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u043e\u043a\u043e\u043f\u044c\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38463)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0443\u0440\u044c\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38464)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0441\u0435\u043b\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38471)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0441\u0438\u043d\u043d\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38472)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043b\u0442\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38473)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0448\u0442\u0430\u0433\u043e\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38474)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u044b\u0441\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38475)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0435\u043c\u0435\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0435\u0436\u0434\u0443\u0440\u0435\u0447\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(385)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3852)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0430\u0440\u043d\u0430\u0443\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38530)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38531)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u0441\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38532)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u0430\u043b\u0442\u0430\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38533)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043e\u043b\u0442\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38534)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0440\u043e\u0438\u0446\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38535)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0433\u043e\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38536)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38537)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38538)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u0435\u0440\u0445-\u0421\u0443\u0435\u0442\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38539)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0430\u043b\u044c\u0431\u0448\u0442\u0430\u0434\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3854)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0438\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38550)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0428\u0438\u043f\u0443\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38551)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u043b\u043c\u0430\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38552)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u043e\u043f\u0447\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38553)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043b\u0435\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38554)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u0427\u0430\u0440\u044b\u0448\u0441\u043a\u0430\u044f \u041f\u0440\u0438\u0441\u0442\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38555)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u0438\u0447\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38556)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u043e\u0441\u043f\u0435\u043b\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38557)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0420\u0443\u0431\u0446\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38558)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0428\u0435\u043b\u0430\u0431\u043e\u043b\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38559)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0442\u0430\u0440\u043e\u0430\u043b\u0435\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38560)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u0435\u0433\u043e\u0440\u044c\u0435\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38561)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0420\u043e\u043c\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38562)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u0430\u0432\u044c\u044f\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38563)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0420\u043e\u0434\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38564)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043b\u0430\u0433\u043e\u0432\u0435\u0449\u0435\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38565)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u043e\u043b\u0447\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38566)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u043b\u0443\u043d\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38567)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0430\u0431\u0443\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38568)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043b\u0430\u0432\u0433\u043e\u0440\u043e\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38569)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0425\u0430\u0431\u0430\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38570)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u0438\u0445\u0430\u0439\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38571)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u044b\u0441\u0442\u0440\u044b\u0439 \u0418\u0441\u0442\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38572)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0443\u0440\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38573)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0435\u0442\u0440\u043e\u043f\u0430\u0432\u043b\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38574)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0430\u0440\u044b\u0448\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38575)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0449\u0435\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38576)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0440\u044c\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38577)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0435\u043b\u043e\u043a\u0443\u0440\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38578)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043b\u044e\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38579)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0433\u043b\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38580)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0430\u043d\u043a\u0440\u0443\u0448\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38581)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0430\u0432\u043b\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38582)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0420\u0435\u0431\u0440\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38583)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u0430\u043c\u043e\u043d\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38584)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u043c\u0435\u043d\u044c-\u043d\u0430-\u041e\u0431\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38585)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38586)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u043e\u0440\u043d\u044f\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38587)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u043c\u0435\u0438\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38588)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u044e\u043c\u0435\u043d\u0446\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38589)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0443\u0442\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38590)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u044b\u0442\u043c\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38591)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0430\u043b\u044c\u043c\u0435\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38592)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u0430\u043b\u0435\u0441\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38593)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u043b\u044c\u0446\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38594)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043e\u043b\u043e\u043d\u0435\u0448\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38595)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u0430\u0440\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38596)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0426\u0435\u043b\u0438\u043d\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38597)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u043e\u0433\u0443\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38598)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38599)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u041a\u0430\u043b\u043c\u0430\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(388)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3882)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u0413\u043e\u0440\u043d\u043e-\u0410\u043b\u0442\u0430\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38840)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u0427\u043e\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38841)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u0427\u0435\u043c\u0430\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38842)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u041a\u043e\u0448-\u0410\u0433\u0430\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38843)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u0422\u0443\u0440\u043e\u0447\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38844)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u041c\u0430\u0439\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38845)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u041e\u043d\u0433\u0443\u0434\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38846)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u0410\u043a\u0442\u0430\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38847)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u041a\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38848)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u041a\u043e\u043a\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(38849)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u043b\u0442\u0430\u0439",
                city: "\u0428\u0435\u0431\u0430\u043b\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(390)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3902)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0410\u0431\u0430\u043a\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39031)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0427\u0435\u0440\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39032)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0423\u0441\u0442\u044c-\u0410\u0431\u0430\u043a\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39033)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0421\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39034)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0411\u043e\u0433\u0440\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39035)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0428\u0438\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39036)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u041a\u043e\u043f\u044c\u0451\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39041)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0411\u0435\u043b\u044b\u0439 \u042f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39042)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0421\u0430\u044f\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39044)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0411\u0435\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39045)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0410\u0441\u043a\u0438\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39046)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0422\u0430\u0448\u0442\u044b\u043f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39047)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u043a\u0430\u0441\u0438\u044f",
                city: "\u0410\u0431\u0430\u0437\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(391)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(391)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043e\u0441\u043d\u043e\u0432\u043e\u0431\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u0438\u043d\u0443\u0441\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u043c\u0435\u043b\u044c\u044f\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0442\u0443\u0440\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0418\u0434\u0440\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0440\u0430\u0433\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u0440\u0430\u0442\u0443\u0437\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u0440\u043c\u0430\u043a\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39139)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0428\u0443\u0448\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0430\u0440\u0442\u0438\u0437\u0430\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u043e\u0442\u044b\u0433\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0433\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u0434\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0438\u0432\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0435\u0441\u043e\u0441\u0438\u0431\u0438\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u044f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u0441\u0435\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0430\u043b\u0430\u0445\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0428\u0430\u043b\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u0431\u0438\u0440\u0438\u043b\u044e\u0441\u0441\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0447\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0438\u043a\u0441\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0428\u0430\u0440\u044b\u043f\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u0437\u0443\u043b\u044c\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0430\u0437\u0430\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0436\u0443\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u0433\u043e\u0442\u043e\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u044e\u0445\u0442\u0435\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0423\u043b\u0443\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39160)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0435\u0432\u0435\u0440\u043e-\u0415\u043d\u0438\u0441\u0435\u0439\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39162)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u0433\u0443\u0447\u0430\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0431\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0430\u0441\u0435\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39165)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u0430\u043e\u0437\u0435\u0440\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39166)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0438\u0440\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39167)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0437\u0435\u0440\u0436\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39168)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u0440\u043e\u0434\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39169)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u0435\u043b\u0435\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39170)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0443\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39171)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0438\u0436\u043d\u0438\u0439 \u0418\u043d\u0433\u0430\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39172)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0418\u0433\u0430\u0440\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39173)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0418\u043b\u0430\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39174)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0418\u0440\u0431\u0435\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39175)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0435\u0440\u0451\u0437\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39176)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0425\u0430\u0442\u0430\u043d\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39177)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u0430\u043d\u0430\u0432\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39178)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0430\u0439\u043a\u0438\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39179)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u0440\u0430\u0443\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3919)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0440\u0438\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3919)4#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0440\u0438\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39190)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0443\u0440\u0443\u0445\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39191)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0443\u0434\u0438\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39193)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043d\u0435\u0436\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39195)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u043d\u0438\u0441\u0435\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39196)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u0437\u0430\u0447\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39197)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0416\u0435\u043b\u0435\u0437\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39198)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u043b\u044c\u0448\u0430\u044f \u041c\u0443\u0440\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39199)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u044f\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0443\u0445\u043e\u0431\u0443\u0437\u0438\u043c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(394)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3942)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u041a\u044b\u0437\u044b\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39432)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0421\u0430\u0440\u044b\u0433-\u0421\u0435\u043f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39433)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0410\u043a-\u0414\u043e\u0432\u0443\u0440\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39434)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0427\u0430\u0434\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39435)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0422\u0443\u0440\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39436)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0428\u0430\u0433\u043e\u043d\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39437)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0411\u0430\u0439-\u0425\u0430\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39438)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0421\u0430\u043c\u0430\u0433\u0430\u043b\u0442\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39439)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u042d\u0440\u0437\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39441)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u041a\u044b\u0437\u044b\u043b-\u041c\u0430\u0436\u0430\u043b\u044b\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39442)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0422\u044d\u044d\u043b\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39444)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0425\u0430\u043d\u0434\u0430\u0433\u0430\u0439\u0442\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39445)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0421\u0443\u0433-\u0410\u043a\u0441\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39450)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u0422\u043e\u043e\u0440\u0430-\u0425\u0435\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39451)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0422\u044b\u0432\u0430",
                city: "\u041c\u0443\u0433\u0443\u0440-\u0410\u043a\u0441\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(395)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3952)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3953)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0440\u0430\u0442\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39530)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0443\u043b\u0443\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39535)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u0418\u043b\u0438\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39536)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0439\u0442\u0443\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39537)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u044f\u043d\u0434\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39538)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0445\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39539)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39540)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0447\u0443\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39541)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u041e\u0440\u0434\u044b\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39542)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0439\u043a\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39543)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u043e\u043b\u044c\u0435-\u0421\u0438\u0431\u0438\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39544)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043b\u044e\u0434\u044f\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39545)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u0423\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39546)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u0435\u043c\u0445\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39548)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0430\u0433\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39549)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u043d\u0443\u043a\u0443\u0442\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(3955)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043d\u0433\u0430\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39550)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0435\u043b\u0435\u0445\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39551)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0438\u0433\u0430\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39552)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u043b\u0430\u0440\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39553)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u044f\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39554)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0438\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39557)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u0435\u0443\u0434\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39558)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043b\u044c\u0445\u043e\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39559)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043b\u0430\u043d\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39560)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u0440\u0431\u043e\u0433\u0430\u0447\u0435\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39561)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0434\u0430\u0439\u0431\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39562)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0437\u0430\u0447\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39563)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0439\u0448\u0435\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39564)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0442\u0443\u043b\u0438\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39565)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u041a\u0443\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39566)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0435\u043b\u0435\u0437\u043d\u043e\u0433\u043e\u0440\u0441\u043a-\u0418\u043b\u0438\u043c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39567)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0443\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39568)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(39569)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0440\u043a\u0443\u0442\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(401)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4012)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u043d\u044f\u0445\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0437\u0451\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0443\u0441\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u0441\u0442\u0435\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0442\u0438\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0435\u043b\u0435\u043d\u043e\u0433\u0440\u0430\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0443\u0440\u044c\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0432\u0435\u0442\u043b\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0432\u0435\u0442\u043b\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0438\u043e\u043d\u0435\u0440\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0433\u0440\u0430\u0442\u0438\u043e\u043d\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u0430\u0432\u0434\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043b\u0435\u0441\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0432\u0430\u0440\u0434\u0435\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0432\u0435\u0442\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40162)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u043c\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043b\u0430\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(40164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0437\u043d\u0430\u043c\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(411)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4112)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u042f\u043a\u0443\u0442\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0411\u0435\u0440\u0434\u0438\u0433\u0435\u0441\u0442\u044f\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0412\u0438\u043b\u044e\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0412\u0435\u0440\u0445\u043d\u0435\u0432\u0438\u043b\u044e\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041d\u044e\u0440\u0431\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0421\u0443\u043d\u0442\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041c\u0438\u0440\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041b\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041e\u043b\u0451\u043a\u043c\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0421\u043e\u043b\u043d\u0435\u0447\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0423\u0441\u0442\u044c-\u041c\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0410\u043c\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041c\u0430\u0439\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041f\u043e\u043a\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0410\u043b\u0434\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041d\u0435\u0440\u044e\u043d\u0433\u0440\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0425\u043e\u043d\u0443\u0443",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0427\u0443\u0440\u0430\u043f\u0447\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u042b\u0442\u044b\u043a-\u041a\u044e\u0451\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0425\u0430\u043d\u0434\u044b\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0423\u0441\u0442\u044c-\u041d\u0435\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0417\u044b\u0440\u044f\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0421\u0440\u0435\u0434\u043d\u0435\u043a\u043e\u043b\u044b\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0427\u0435\u0440\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0427\u043e\u043a\u0443\u0440\u0434\u0430\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0411\u0435\u043b\u0430\u044f \u0413\u043e\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41160)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0411\u0430\u0442\u0430\u0433\u0430\u0439-\u0410\u043b\u044b\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0411\u043e\u0440\u043e\u0433\u043e\u043d\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41162)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041d\u0430\u043c\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0421\u0430\u043d\u0433\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0416\u0438\u0433\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41165)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0411\u0430\u0442\u0430\u0433\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41166)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0414\u0435\u043f\u0443\u0442\u0430\u0442\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41167)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0422\u0438\u043a\u0441\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41168)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u0421\u0430\u0441\u043a\u044b\u043b\u0430\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41169)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u043a\u0443\u0442\u0438\u044f",
                city: "\u041e\u043b\u0435\u043d\u0451\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(413)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4132)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41342)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u043b\u0430\u0442\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41343)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u0433\u043e\u0434\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u041e\u043c\u0447\u0443\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0441\u0443\u043c\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043c\u0441\u0443\u043a\u0447\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0439\u043c\u0447\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41348)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0433\u0430\u0434\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042d\u0432\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(415)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4152)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0435\u0442\u0440\u043e\u043f\u0430\u0432\u043b\u043e\u0432\u0441\u043a-\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41531)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u043b\u0438\u0437\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41532)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u0411\u043e\u043b\u044c\u0448\u0435\u0440\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41533)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u0438\u043b\u044c\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41534)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41535)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u0438\u043b\u044e\u0447\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41536)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043e\u0431\u043e\u043b\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41537)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0438\u0433\u0438\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41538)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u0438\u043b\u044e\u0447\u0438\u043d\u0441\u043a-3",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41539)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u0425\u0430\u0439\u0440\u044e\u0437\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41541)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043b\u044e\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41542)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u042d\u0441\u0441\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41543)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0430\u043b\u0430\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41544)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0438\u043b\u0438\u0447\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41545)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u0441\u0441\u043e\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41546)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u043c\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41547)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0438\u043a\u043e\u043b\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41548)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043c\u0447\u0430\u0442\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u0437\u044b\u0440\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(416)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4162)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0411\u043b\u0430\u0433\u043e\u0432\u0435\u0449\u0435\u043d\u0441\u043a", "\u0411\u043b\u0430\u0433\u043e\u0432\u0435\u0449\u0435\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(41631)2-0#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "\u0422\u0440\u0430\u043d\u0441\u0441\u0432\u044f\u0437\u044c\u0442\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(41632)3-0#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "\u0422\u0440\u0430\u043d\u0441\u0441\u0432\u044f\u0437\u044c\u0442\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(41633)3-0#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u0439\u0447\u0438\u0445\u0438\u043d\u0441\u043a",
                operator: "\u0422\u0440\u0430\u043d\u0441\u0441\u0432\u044f\u0437\u044c\u0442\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(41634)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0443\u0440\u0435\u0439\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41637)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u0445\u0430\u0439\u043b\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41638)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41639)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043d\u0441\u0442\u0430\u043d\u0442\u0438\u043d\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41641)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u043e\u0433\u043e\u0440\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41642)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u044b\u0448\u0435\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41643)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0432\u043e\u0431\u043e\u0434\u043d\u0435\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41644)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0437\u0430\u043d\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41645)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u043c\u043d\u0435\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41646)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u043b\u0435\u043c\u0434\u0436\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41647)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u0439\u0447\u0438\u0445\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41648)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0445\u0430\u0440\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41649)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41651)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0438\u043c\u0430\u043d\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41652)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41653)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0433\u0434\u0430\u0433\u0430\u0447\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41654)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043a\u043e\u0432\u043e\u0440\u043e\u0434\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41655)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u043b\u0435\u043c\u0434\u0436\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41656)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u044b\u043d\u0434\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41658)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0435\u0439\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(421)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4212)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0438\u043a\u043e\u043b\u0430\u0435\u0432\u0441\u043a-\u043d\u0430-\u0410\u043c\u0443\u0440\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41636)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0432\u0438\u0442\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41636)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0432\u0438\u0442\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(41636)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u043c\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0432\u0438\u0442\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u0430\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f \u0413\u0430\u0432\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u0445\u043e\u0442\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043c\u0443\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0443\u043c\u0438\u043a\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0438\u043c. \u041f\u043e\u043b\u0438\u043d\u044b \u041e\u0441\u0438\u043f\u0435\u043d\u043a\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043e\u043b\u043d\u0435\u0447\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u044f\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0435\u0433\u0434\u043e\u043c\u044b\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u044f\u0437\u0435\u043c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0435\u0440\u0435\u044f\u0441\u043b\u0430\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0438\u043a\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0440\u043e\u0438\u0446\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4217)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0425\u0430\u0431\u0430\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u043c\u0441\u043e\u043c\u043e\u043b\u044c\u0441\u043a-\u043d\u0430-\u0410\u043c\u0443\u0440\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(423)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u043b\u0430\u0434\u0438\u0432\u043e\u0441\u0442\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42331)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043b\u0430\u0432\u044f\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42334)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: [ "\u0412\u043e\u043b\u044c\u043d\u043e-\u041d\u0430\u0434\u0435\u0436\u0434\u0438\u043d\u0441\u043a\u043e\u0435", "\u0420\u0430\u0437\u0434\u043e\u043b\u044c\u043d\u043e\u0435" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(42335)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u041a\u0430\u043c\u0435\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42337)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0440\u0442\u0435\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42339)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0424\u043e\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4234)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u0441\u0443\u0440\u0438\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u043e\u043a\u0440\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u043e\u0433\u0440\u0430\u043d\u0438\u0447\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u0438\u0445\u0430\u0439\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0425\u043e\u0440\u043e\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42349)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u043c\u0435\u043d\u044c-\u0420\u044b\u0431\u043e\u043b\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42351)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0435\u0440\u043d\u0438\u0433\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42352)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043f\u0430\u0441\u0441\u043a-\u0414\u0430\u043b\u044c\u043d\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42354)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0435\u0441\u043e\u0437\u0430\u0432\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42356)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0430\u043b\u044c\u043d\u0435\u0440\u0435\u0447\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42357)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0443\u0447\u0435\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42359)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u043f\u043e\u043a\u0440\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4236)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: [ "\u041d\u0430\u0445\u043e\u0434\u043a\u0430", "\u041f\u043e\u0440\u0442 \u0412\u043e\u0441\u0442\u043e\u0447\u043d\u044b\u0439" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(42361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0440\u0441\u0435\u043d\u044c\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42362)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043d\u0443\u0447\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42363)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0430\u0440\u0442\u0438\u0437\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u043e-\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42371)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u042f\u043a\u043e\u0432\u043b\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42372)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0427\u0443\u0433\u0443\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42373)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0430\u043b\u044c\u043d\u0435\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42374)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0435\u0440\u043d\u0435\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42375)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u0432\u0430\u043b\u0435\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42376)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u043b\u044c\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42377)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0430\u0437\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(424)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4242)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0436\u043d\u043e-\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42431)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0440\u043e\u043d\u0430\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42432)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0433\u043b\u0435\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42433)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u043e\u043b\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42434)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u0441\u043a-\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42435)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0440\u0441\u0430\u043a\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42436)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u0432\u0435\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42437)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42441)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043d\u0438\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42442)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u043b\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42443)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043a\u0430\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42444)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0433\u043b\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42446)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u043c\u0430\u0440\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42447)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u044b\u043c\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42452)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043c\u0438\u0440\u043d\u044b\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42453)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0432\u0435\u0440\u043e-\u041a\u0443\u0440\u0438\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42454)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0440\u0438\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42455)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0445\u0430\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0436\u043d\u043e-\u041a\u0443\u0440\u0438\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(426)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0415\u0432\u0440\u0435\u0439\u0441\u043a\u0430\u044f \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42622)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0415\u0432\u0440\u0435\u0439\u0441\u043a\u0430\u044f \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0438\u0440\u043e\u0431\u0438\u0434\u0436\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42632)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0415\u0432\u0440\u0435\u0439\u0441\u043a\u0430\u044f \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043c\u0438\u0434\u043e\u0432\u0438\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42663)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0415\u0432\u0440\u0435\u0439\u0441\u043a\u0430\u044f \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u043d\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42665)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0415\u0432\u0440\u0435\u0439\u0441\u043a\u0430\u044f \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043c\u0443\u0440\u0437\u0435\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42666)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0415\u0432\u0440\u0435\u0439\u0441\u043a\u0430\u044f \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0431\u043b\u0443\u0447\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(427)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42722)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0410\u043d\u0430\u0434\u044b\u0440\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42732)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0423\u0433\u043e\u043b\u044c\u043d\u044b\u0435 \u041a\u043e\u043f\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42733)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0411\u0435\u0440\u0438\u043d\u0433\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42734)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u042d\u0433\u0432\u0435\u043a\u0438\u043d\u043e\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42735)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041f\u0440\u043e\u0432\u0438\u0434\u0435\u043d\u0438\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42736)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041b\u0430\u0432\u0440\u0435\u043d\u0442\u0438\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42737)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041f\u0435\u0432\u0435\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42738)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u0411\u0438\u043b\u0438\u0431\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(42739)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u043a\u043e\u0442\u0441\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433",
                city: "\u041c\u044b\u0441 \u0428\u043c\u0438\u0434\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(471)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4712)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0440\u0447\u0430\u0442\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043b\u0443\u0448\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u0440\u0448\u0435\u0447\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u0438\u0441\u0442\u0435\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043d\u044b\u0440\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0435 \u0421\u043e\u043b\u0434\u0430\u0442\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u043e\u043c\u0443\u0442\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u044c\u0433\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0431\u043e\u044f\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u044f\u043c\u0438\u0446\u044b\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0434\u0436\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0424\u0430\u0442\u0435\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0429\u0438\u0433\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0435\u0434\u0432\u0435\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0440\u0435\u043d\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0435\u043b\u0435\u0437\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043c\u0438\u0442\u0440\u0438\u0435\u0432-\u041b\u044c\u0433\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043e\u043b\u043e\u0442\u0443\u0445\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u044b\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0438\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u043b\u043d\u0446\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043d\u0442\u0443\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043d\u044b\u0448\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0441\u0442\u043e\u0440\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0448\u0435\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u0435\u043c\u0438\u0441\u0438\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(472)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4722)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47231)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0440\u043e\u0447\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47232)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u043d\u044f\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47233)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u044b\u0439 \u041e\u0441\u043a\u043e\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47234)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0435\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47235)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u043a\u043e\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47236)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u043b\u0443\u0439\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47237)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0439\u0434\u0435\u043b\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47238)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0432\u0435\u043d\u044c\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47241)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0443\u0431\u043a\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47242)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u043e\u0445\u043e\u0440\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47243)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0432\u043d\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47245)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u043a\u0438\u0442\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47246)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0440\u0438\u0441\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47247)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0433\u0432\u0430\u0440\u0434\u0435\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47248)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0435\u0431\u0435\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4725)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u044b\u0439 \u041e\u0441\u043a\u043e\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47261)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0440\u0430\u0439\u0432\u043e\u0440\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47262)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47263)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0435\u043b\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u0430\u044f \u042f\u0440\u0443\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(473)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47340)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u043c\u043e\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u0430\u044f \u0423\u0441\u043c\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47342)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0448\u0438\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47343)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043d\u044f\u044f \u0425\u0430\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042d\u0440\u0442\u0438\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043d\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0435\u0440\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47348)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0440\u0438\u0431\u0430\u043d\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47350)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0431\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47352)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u043b\u043e\u0432\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47353)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0445\u043e\u043f\u0435\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47354)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0440\u0438\u0441\u043e\u0433\u043b\u0435\u0431\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043d\u0438\u0439 \u041c\u0430\u043c\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47356)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0440\u043e\u0431\u044c\u0451\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47357)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u0435\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0443\u0442\u0443\u0440\u043b\u0438\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47362)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0432\u043b\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47363)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043b\u0430\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47364)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0432\u043e\u0440\u043e\u043d\u0435\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0442\u0440\u043e\u043f\u0430\u0432\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47366)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0433\u0443\u0447\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47367)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043d\u0442\u0435\u043c\u0438\u0440\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47370)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u0435\u0434\u0435\u0432\u0438\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47371)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u043e\u0445\u043e\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47372)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0421\u0435\u043c\u0438\u043b\u0443\u043a\u0438", "\u0421\u0435\u043c\u0438\u043b\u0443\u043a\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(47374)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0435\u043f\u044c\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47375)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0441\u0442\u0440\u043e\u0433\u043e\u0436\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47376)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0432\u043e\u0440\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47391)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0438\u0441\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47394)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0434\u0433\u043e\u0440\u0435\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47395)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043b\u044c\u0445\u043e\u0432\u0430\u0442\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47396)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u0440\u043e\u043d\u0435\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0441\u0441\u043e\u0448\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(474)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4742)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0438\u043f\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47461)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0440\u044f\u0437\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47462)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u0431\u0440\u0438\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47463)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u0431\u0440\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47464)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0432 \u0422\u043e\u043b\u0441\u0442\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47465)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0430\u043d\u043a\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47466)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0431\u0435\u0434\u044f\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47467)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043b\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47468)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u043b\u0433\u043e\u0440\u0443\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47469)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47471)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0434\u043e\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47472)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u043c\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47473)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47474)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0435\u0440\u0431\u0443\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47475)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0430\u043f\u043b\u044b\u0433\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47476)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u043d\u043e\u0432\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47477)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u043b\u0435\u0432\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47478)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0438\u043f\u0435\u0446\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0437\u043c\u0430\u043b\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(475)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4752)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u043c\u0431\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47531)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u0441\u0441\u043a\u0430\u0437\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47532)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0441\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47533)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u0440\u0448\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47534)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043d\u0434\u0430\u0440\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47535)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0435\u0440\u0434\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47536)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043c\u0438\u0442\u0440\u0438\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47537)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u0441\u0430\u043d\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47541)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0442\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47542)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u0440\u0434\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47543)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u043e\u044e\u0440\u044c\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47544)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0442\u0440\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47545)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u0447\u0443\u0440\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47546)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0443\u0447\u043a\u0430\u043f\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47548)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0432\u043e\u043c\u0430\u0439\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47551)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u0432\u0440\u0438\u043b\u043e\u0432\u043a\u0430 \u0412\u0442\u043e\u0440\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47552)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043d\u0430\u043c\u0435\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47553)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u043d\u0436\u0430\u0432\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47554)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0438\u0447\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47555)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0436\u0430\u043a\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47556)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0442\u0438\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47557)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u043a\u0430\u0440\u0451\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47558)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0432\u0430\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(47559)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u043c\u0451\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(481)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4812)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48130)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u044b\u0447\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u044f\u0437\u044c\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u043b\u0438\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0443\u043c\u044f\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0441\u043b\u0430\u0432\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u0433\u0430\u0440\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0451\u043c\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0433\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0434\u0443\u0433\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48139)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u043e\u043b\u043c-\u0416\u0438\u0440\u043a\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u0438\u0441\u043b\u0430\u0432\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0443\u0434\u043d\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0444\u043e\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u0440\u0446\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u0440\u043e\u0433\u043e\u0431\u0443\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043b\u044c\u043d\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0435\u043c\u0438\u0434\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u043d\u0430\u0441\u0442\u044b\u0440\u0449\u0438\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0447\u0438\u043d\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0435\u0441\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u0440\u0448\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48165)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043b\u0438\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48166)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0443\u0445\u043e\u0432\u0449\u0438\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48167)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u043c\u043e\u043b\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0434\u044b\u043c\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(482)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4822)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0432\u0435\u0440\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48230)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48231)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0436\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48232)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0436\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48233)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u044b\u0448\u043d\u0438\u0439 \u0412\u043e\u043b\u043e\u0447\u0435\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48234)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0448\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48235)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0441\u0442\u0430\u0448\u043a\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48236)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u043c\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48237)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0439 \u0425\u043e\u043b\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48238)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u043e\u0433\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48239)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0424\u0438\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48242)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043d\u0430\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u043c\u0435\u0448\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48246)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u043d\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48249)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043b\u044f\u0437\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48250)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48251)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u0440\u0436\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48253)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043a\u0441\u0430\u0442\u0438\u0445\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48255)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0434\u043e\u043c\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48257)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0432\u0448\u0438\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48258)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043b\u0435\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48261)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0438\u0445\u043e\u0441\u043b\u0430\u0432\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48262)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0443\u0431\u0446\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48263)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u0438\u0446\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48264)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0441\u044c\u0435\u0433\u043e\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48265)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u043f\u0430\u0434\u043d\u0430\u044f \u0414\u0432\u0438\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48266)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u043b\u0438\u0434\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48267)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043d\u0434\u0440\u0435\u0430\u043f\u043e\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48268)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u0440\u043e\u043f\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48269)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u043b\u0438\u0436\u0430\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48271)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0441\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48272)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043d\u0434\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48273)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0430\u0440\u043a\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48274)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0435\u0441\u043e\u0432\u0430 \u0413\u043e\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48275)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u043b\u043e\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48276)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043f\u0438\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(483)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4832)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0411\u0440\u044f\u043d\u0441\u043a", "\u0421\u0435\u043b\u044c\u0446\u043e", "\u0411\u0435\u043b\u044b\u0435 \u0411\u0435\u0440\u0435\u0433\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(48330)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0440\u0430\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48331)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0433\u043d\u0435\u0434\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48332)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0443\u0431\u0440\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48333)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0414\u044f\u0442\u044c\u043a\u043e\u0432\u043e", "\u0424\u043e\u043a\u0438\u043d\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(48334)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0443\u043a\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48335)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0430\u0447\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48336)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043b\u0438\u043d\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48338)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043b\u0435\u0442\u043d\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48339)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0433\u043b\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48340)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u0440\u0434\u0435\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u044b\u0433\u043e\u043d\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48342)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0432\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48343)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0437\u044b\u0431\u043a\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0438\u0440\u044f\u0442\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0447\u0435\u043f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u0430\u044f \u0413\u043e\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043b\u0438\u043c\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48348)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u043e\u0434\u0443\u0431",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48349)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0433\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48351)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u043d\u0435\u0447\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48352)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0440\u0443\u0431\u0447\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48353)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0437\u0435\u043c\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48354)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u043e\u043a\u043e\u0442\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043c\u0430\u0440\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48356)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48358)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0411\u0440\u044f\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043b\u044b\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(484)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4842)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043b\u0443\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48431)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043b\u043e\u044f\u0440\u043e\u0441\u043b\u0430\u0432\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48432)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0443\u043a\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48433)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0435\u0434\u044b\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48434)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043d\u0434\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48435)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0440\u0443\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48436)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0445\u043d\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48437)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0424\u0435\u0440\u0437\u0438\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48438)2-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0430\u0431\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48438)4-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48438)6-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0430\u0431\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48439)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0431\u043d\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48441)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0435\u043c\u044b\u0448\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48442)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0437\u0435\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48443)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48444)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u044e\u0434\u0438\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48445)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0438\u0437\u0434\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48446)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0435\u0449\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48447)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0443\u043c\u0438\u043d\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48448)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0431\u044b\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48449)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0437\u043d\u043e\u0441\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48451)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0445\u0438\u043d\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48452)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u0441\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48453)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u0432\u0430\u0441\u0442\u043e\u0432\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48454)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0440\u044f\u0442\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48455)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043f\u0430\u0441-\u0414\u0435\u043c\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48456)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48457)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0442\u043b\u0438\u0446\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(485)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4852)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48531)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u043a\u0440\u0430\u0441\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48532)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0433\u043b\u0438\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48533)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0443\u0442\u0430\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48534)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u0432\u0440\u0438\u043b\u043e\u0432 \u042f\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48535)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0435\u0441\u043b\u0430\u0432\u043b\u044c-\u0417\u0430\u043b\u0435\u0441\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48536)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0441\u0442\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48538)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0430\u043d\u0438\u043b\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48539)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0440\u0438\u0441\u043e\u0433\u043b\u0435\u0431\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48542)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0435 \u0421\u0435\u043b\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48543)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u044e\u0431\u0438\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48544)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u044b\u0448\u043a\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48545)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0440\u0435\u0439\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48546)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0448\u0435\u0445\u043e\u043d\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48547)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u044b\u0439 \u041d\u0435\u043a\u043e\u0443\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48549)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u0435\u0447\u0438\u0441\u0442\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4855)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u044b\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(486)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4862)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u041e\u0440\u0451\u043b", "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(48640)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u0445\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48642)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u043e\u0442\u044b\u043d\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48643)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u043e\u043c\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48644)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0431\u043b\u044b\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48645)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043c\u0438\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48646)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0446\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48647)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0440\u044b\u0448\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48648)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u043b\u0435\u0433\u043e\u0449\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48649)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043c\u0438\u0442\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48661)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "\u041c\u0422\u0421",
                desc: "\u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0435 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u044b \u0441 \u0437\u043e\u043d\u043e\u0432\u044b\u043c\u0438 \u043d\u043e\u043c\u0435\u0440\u0430\u043c\u0438"
            }, {
                mask: "+7(48662)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043d\u0430\u043c\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48663)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u0430\u044f \u0417\u0430\u0440\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48664)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043a\u0440\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48665)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0441\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48666)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0440\u043e\u0441\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48667)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0440\u0441\u0430\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48672)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u043b\u0433\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48673)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0441\u0438\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48674)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u043f\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48675)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043b\u0430\u0437\u0443\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48676)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043e\u0432\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48677)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0438\u0432\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48678)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u043e\u043c\u0443\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48679)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043b\u043e\u0430\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(487)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4872)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0443\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48731)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0437\u043b\u043e\u0432\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48732)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0443\u0431\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48733)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0441\u0435\u043d\u044c\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48734)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u043e\u043a\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48735)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u043c\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48736)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0434\u043e\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48741)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u0444\u0440\u0435\u043c\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48742)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48743)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0440\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48744)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48745)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u043d\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48746)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u043d\u0441\u043a\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48751)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0429\u0435\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48752)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043b\u0430\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48753)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48754)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u0435\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48755)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0451\u043f\u043b\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48756)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48761)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0433\u043e\u0440\u043e\u0434\u0438\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48762)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u043c\u043e\u0441\u043a\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48763)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0432\u043e\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48766)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u0441\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48767)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u043d\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(48768)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0443\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(491)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4912)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0420\u044f\u0437\u0430\u043d\u044c", "\u0421\u043e\u043b\u043e\u0442\u0447\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(49130)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u0445\u0430\u0439\u043b\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0441\u0438\u043c\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u044f\u0436\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0441\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043f\u0430\u0441\u0441\u043a-\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0438\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u044b\u0431\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0443\u0447\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49139)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0434\u043e\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u043c\u0438\u0447\u0443\u0440\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043f\u0430\u0441-\u041a\u043b\u0435\u043f\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0440\u0430\u0431\u043b\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u0440\u043c\u0438\u0448\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0438\u0442\u0435\u043b\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0443\u0442\u044f\u0442\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0440\u0430\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u043e\u0436\u0438\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043f\u043e\u0436\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0445\u0430\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0445\u043e\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u043e\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043a\u043e\u043f\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u043b\u043e\u0441\u043b\u0430\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u044f\u0437\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e-\u041d\u0435\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(492)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4922)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49231)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0437\u0434\u0430\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49232)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0432\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49233)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u044f\u0437\u043d\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49234)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0443\u0440\u043e\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49235)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0434\u043e\u0433\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49236)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u0430\u044f \u0413\u043e\u0440\u0431\u0430\u0442\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49237)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u0436\u0430\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49238)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u0440\u043e\u0445\u043e\u0432\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49241)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0443\u0441\u044c-\u0425\u0440\u0443\u0441\u0442\u0430\u043b\u044c\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49242)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0431\u0438\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49243)2-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0442\u0443\u0448\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49243)6-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043a\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49245)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u044c\u0447\u0443\u0433\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49246)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0440\u044c\u0435\u0432-\u041f\u043e\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49247)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0435\u043b\u0435\u043d\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49248)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u0435\u0448\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49254)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u0434\u0443\u0436\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(493)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4932)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0432\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49331)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u043d\u0435\u0448\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49333)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0432\u043e\u043b\u0436\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49334)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u043b\u0435\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49336)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0434\u043d\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49337)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0440\u044c\u0435\u0432\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49339)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u0438\u0432\u043e\u043b\u0436\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0424\u0443\u0440\u043c\u0430\u043d\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49343)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0435\u0439\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0443\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0443\u0447\u0435\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0441\u0442\u044f\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0436\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49349)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043d\u0438\u0439 \u041b\u0430\u043d\u0434\u0435\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49351)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0443\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49352)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043c\u0441\u043e\u043c\u043e\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49353)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u043b\u044c\u0438\u043d\u0441\u043a\u043e\u0435-\u0425\u043e\u0432\u0430\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49354)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0438\u0447\u0443\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u0432\u0440\u0438\u043b\u043e\u0432 \u041f\u043e\u0441\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49356)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0432\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49357)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0436\u043d\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(494)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(4942)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49430)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043d\u0442\u0440\u043e\u043f\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49431)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u0440\u0435\u0445\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49432)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0435-\u043d\u0430-\u0412\u043e\u043b\u0433\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49433)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0434\u0438\u0441\u043b\u0430\u0432\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49434)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0441\u0430\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49435)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0443\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49436)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u043b\u0438\u0433\u0430\u043b\u0438\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49437)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u043b\u0438\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49438)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0441\u0442\u0440\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49439)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0432\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49440)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0440\u0444\u0435\u043d\u044c\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49441)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0443\u0445\u043b\u043e\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49442)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0434\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49443)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u043e\u0433\u0440\u0438\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49444)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49445)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043a\u0430\u0440\u044c\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49446)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043d\u0442\u0443\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49447)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0435\u043e\u0440\u0433\u0438\u0435\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49448)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043d\u0430\u0437\u044b\u0440\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49449)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0440\u044c\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49450)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0445\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49451)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0433\u043e\u0432\u0430\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49452)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u044b\u0449\u0443\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(49453)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u043e\u0441\u0442\u0440\u043e\u043c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u0433\u043e\u0440\u0435\u0447\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(495)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(495)323-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0410\u044d\u0440\u043e\u043f\u043e\u0440\u0442 \u0414\u043e\u043c\u043e\u0434\u0435\u0434\u043e\u0432\u043e",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)323-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0410\u044d\u0440\u043e\u043f\u043e\u0440\u0442 \u0414\u043e\u043c\u043e\u0434\u0435\u0434\u043e\u0432\u043e",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)338-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u0440\u0435\u043d\u0442\u0433\u0435\u043d",
                operator: "\u041c\u0413\u0422\u0421",
                desc: "\u0447\u0430\u0441\u0442\u044c \u043d\u043e\u043c\u0435\u0440\u043e\u0432 \u0410\u0422\u0421"
            }, {
                mask: "+7(495)339-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u0440\u0435\u043d\u0442\u0433\u0435\u043d",
                operator: "\u041c\u0413\u0422\u0421",
                desc: "\u0447\u0430\u0441\u0442\u044c \u043d\u043e\u043c\u0435\u0440\u043e\u0432 \u0410\u0422\u0421"
            }, {
                mask: "+7(495)355-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0420\u0430\u0437\u0432\u0438\u043b\u043a\u0430",
                operator: "\u041e\u0410\u041e \xab\u0413\u0430\u0437\u043f\u0440\u043e\u043c\u0441\u0432\u044f\u0437\u044c\xbb",
                desc: ""
            }, {
                mask: "+7(495)408-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0414\u043e\u043b\u0433\u043e\u043f\u0440\u0443\u0434\u043d\u044b\u0439",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)439-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: "\u0447\u0430\u0441\u0442\u044c \u043d\u043e\u043c\u0435\u0440\u043e\u0432 \u0410\u0422\u0421"
            }, {
                mask: "+7(495)50#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041b\u044e\u0431\u0435\u0440\u0446\u044b",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)500-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: [ "\u041c\u0435\u0433\u0430\u0444\u043e\u043d", "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444" ],
                desc: ""
            }, {
                mask: "+7(495)51#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u041a\u043e\u0440\u043e\u043b\u0451\u0432", "\u042e\u0431\u0438\u043b\u0435\u0439\u043d\u044b\u0439" ],
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)52#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u0411\u0430\u043b\u0430\u0448\u0438\u0445\u0430", "\u0416\u0435\u043b\u0435\u0437\u043d\u043e\u0434\u043e\u0440\u043e\u0436\u043d\u044b\u0439", "\u0420\u0435\u0443\u0442\u043e\u0432" ],
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)541-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0412\u0438\u0434\u043d\u043e\u0435",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)542-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: [ "\u041c\u0435\u0433\u0430\u0444\u043e\u043d", "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444" ],
                desc: ""
            }, {
                mask: "+7(495)543-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: [ "\u041c\u0435\u0433\u0430\u0444\u043e\u043d", "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444" ],
                desc: ""
            }, {
                mask: "+7(495)544-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: [ "\u041c\u0435\u0433\u0430\u0444\u043e\u043d", "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444" ],
                desc: ""
            }, {
                mask: "+7(495)545-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: [ "\u041c\u0435\u0433\u0430\u0444\u043e\u043d", "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444" ],
                desc: ""
            }, {
                mask: "+7(495)546-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: "\u0420\u043e\u0441\u0442\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)546-1#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0414\u043e\u043c\u043e\u0434\u0435\u0434\u043e\u0432\u043e",
                operator: "\u0420\u043e\u0441\u0442\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)546-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u0412\u0438\u0434\u043d\u043e\u0435", "\u0420\u0430\u0437\u0432\u0438\u043b\u043a\u0430" ],
                operator: "\u0420\u043e\u0441\u0442\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)546-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0414\u043e\u043c\u043e\u0434\u0435\u0434\u043e\u0432\u043e",
                operator: "\u0420\u043e\u0441\u0442\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)548-0#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0412\u0438\u0434\u043d\u043e\u0435",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)548-1#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0412\u0438\u0434\u043d\u043e\u0435",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)548-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0412\u0438\u0434\u043d\u043e\u0435",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)548-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0412\u0438\u0434\u043d\u043e\u0435",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)548-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041f\u043e\u0441\u0435\u043b\u043e\u043a \u0441\u043e\u0432\u0445\u043e\u0437\u0430 \u0438\u043c. \u041b\u0435\u043d\u0438\u043d\u0430",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)548-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u041f\u043e\u0441\u0435\u043b\u043e\u043a \u0441\u043e\u0432\u0445\u043e\u0437\u0430 \u0438\u043c. \u041b\u0435\u043d\u0438\u043d\u0430", "\u041f\u043e\u0441\u0435\u043b\u043e\u043a \u0412\u043e\u043b\u043e\u0434\u0430\u0440\u0441\u043a\u043e\u0433\u043e", "\u0413\u043e\u0440\u043a\u0438 \u041b\u0435\u043d\u0438\u043d\u0441\u043a\u0438\u0435" ],
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)548-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u041f\u043e\u0441\u0435\u043b\u043e\u043a \u0412\u043e\u043b\u043e\u0434\u0430\u0440\u0441\u043a\u043e\u0433\u043e", "\u0413\u043e\u0440\u043a\u0438 \u041b\u0435\u043d\u0438\u043d\u0441\u043a\u0438\u0435" ],
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)548-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0412\u0438\u0434\u043d\u043e\u0435",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: "\u043f\u0440\u043e\u043c\u0437\u043e\u043d\u0430"
            }, {
                mask: "+7(495)549-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u0412\u0438\u0434\u043d\u043e\u0435", "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0438\u0439", "\u043f\u043e\u0441. \u041d\u043e\u0432\u043e-\u0414\u0440\u043e\u0436\u0436\u0438\u043d\u043e", "\u043f\u043e\u0441. \u0418\u0437\u043c\u0430\u0439\u043b\u043e\u0432\u043e", "\u043f\u043e\u0441. \u0411\u0443\u043b\u0430\u0442\u043d\u0438\u043a\u043e\u0432\u043e", "\u043f\u043e\u0441. \u0414\u0443\u0431\u0440\u043e\u0432\u0441\u043a\u0438\u0439", "\u043f\u043e\u0441. \u0418\u043d\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u0421\u0430\u0434\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u0430" ],
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)55#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041b\u044e\u0431\u0435\u0440\u0446\u044b",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)552-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041b\u044b\u0442\u043a\u0430\u0440\u0438\u043d\u043e",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)555-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041b\u044b\u0442\u043a\u0430\u0440\u0438\u043d\u043e",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)56#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)57#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u041a\u043e\u0440\u043e\u043b\u0451\u0432", "\u041c\u044b\u0442\u0438\u0449\u0438", "\u042e\u0431\u0438\u043b\u0435\u0439\u043d\u044b\u0439" ],
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)573-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0425\u0438\u043c\u043a\u0438",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)576-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0414\u043e\u043b\u0433\u043e\u043f\u0440\u0443\u0434\u043d\u044b\u0439",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)577-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041b\u043e\u0431\u043d\u044f",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)578-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u041b\u043e\u0431\u043d\u044f", "\u041c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u044b\u0439 \u0430\u044d\u0440\u043e\u043f\u043e\u0440\u0442 \xab\u0428\u0435\u0440\u0435\u043c\u0435\u0442\u044c\u0435\u0432\u043e\xbb" ],
                operator: "\u041f\u043e\u0440\u0442-\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)579-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: [ "\u0414\u043e\u043b\u0433\u043e\u043f\u0440\u0443\u0434\u043d\u044b\u0439", "\u041b\u043e\u0431\u043d\u044f" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(495)58#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u0425\u0438\u043c\u043a\u0438",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)585-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: [ "\u041c\u0435\u0433\u0430\u0444\u043e\u043d", "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444" ],
                desc: ""
            }, {
                mask: "+7(495)589-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: [ "\u041c\u0435\u0433\u0430\u0444\u043e\u043d", "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444" ],
                desc: ""
            }, {
                mask: "+7(495)59#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041e\u0434\u0438\u043d\u0446\u043e\u0432\u043e",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(495)597-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430 \u0438 \u0431\u043b\u0438\u0436\u043d\u0435\u0435 \u041f\u043e\u0434\u043c\u043e\u0441\u043a\u043e\u0432\u044c\u0435",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: [ "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444", "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c" ],
                desc: ""
            }, {
                mask: "+7(496)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)20#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u043b\u0434\u043e\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)21#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0443\u0431\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)22#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043c\u0438\u0442\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)24#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043b\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)25#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0429\u0451\u043b\u043a\u043e\u0432\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)26#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u043b\u043d\u0435\u0447\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)27#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0443\u0437\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)28#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u043e\u0442\u043e\u0448\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)30#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0410\u041e \u041a\u0430\u043b\u0438\u0442\u0430-\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)31#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0441\u0442\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)34#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0440\u043e-\u0424\u043e\u043c\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)36#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u043a\u043e\u043b\u0430\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)37#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0445\u043e\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)38#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u0436\u0430\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)40#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u0433\u043e\u0440\u044c\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)41#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u0435\u0445\u043e\u0432\u043e-\u0417\u0443\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)42#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u0435\u0445\u043e\u0432\u043e-\u0417\u0443\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)43#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0432\u043b\u043e\u0432\u0441\u043a\u0438\u0439 \u041f\u043e\u0441\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)44#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)45#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0442\u0443\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)46#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u043c\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)51#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0433\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)52#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u043d\u043e\u0433\u043e\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)53#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0443\u0448\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)54#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u0433\u0438\u0435\u0432 \u041f\u043e\u0441\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)55#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u0433\u0438\u0435\u0432 \u041f\u043e\u0441\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)56#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0429\u0435\u043b\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)57#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u0441\u0442\u0430\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)61#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u043e\u043c\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)63#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0443\u0445\u043e\u0432\u0438\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)64#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0443\u043f\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)66#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0440\u0430\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)67#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u0435\u0431\u0440\u044f\u043d\u044b\u0435 \u041f\u0440\u0443\u0434\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)69#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0448\u0438\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)70#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0437\u0435\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)72#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0445\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)73#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u043f\u0443\u0445\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)75#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0434\u043e\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)76#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0434\u043e\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)77#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u043f\u0443\u0445\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(496)79#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u043c\u043e\u0434\u0435\u0434\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(498)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(498)48#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: "\u0416\u0443\u043a\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(498)54#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: [ "\u0412\u0438\u0434\u043d\u043e\u0435", "\u041b\u0435\u043d\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d" ],
                operator: "\u0426\u0435\u043d\u0442\u0440\u0422\u0435\u043b\u0435\u043a\u043e\u043c",
                desc: ""
            }, {
                mask: "+7(498)617-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: [ "\u0413\u0430\u0437\u043e\u043f\u0440\u043e\u0432\u043e\u0434", "\u041a\u043e\u043c\u043c\u0443\u043d\u0430\u0440\u043a\u0430" ],
                operator: "\u0417\u0410\u041e \xab\u0413\u0430\u0437\u0442\u0435\u043b\u0435\u043a\u043e\u043c\xbb",
                desc: "\u041b\u0435\u043d\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d"
            }, {
                mask: "+7(498)657-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: "\u0420\u0430\u0437\u0432\u0438\u043b\u043a\u0430",
                operator: "\u041e\u041e\u041e \xab\u0413\u0430\u0437\u043f\u0440\u043e\u043c \u0441\u0432\u044f\u0437\u044c\xbb",
                desc: "\u041b\u0435\u043d\u0438\u043d\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d"
            }, {
                mask: "+7(498)664-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: "\u0416\u0435\u043b\u0435\u0437\u043d\u043e\u0434\u043e\u0440\u043e\u0436\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(498)68#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: "\u041b\u043e\u0431\u043d\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(498)713-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: "\u0414\u043e\u043b\u0433\u043e\u043f\u0440\u0443\u0434\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(498)744-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u0441\u043e\u043f\u0430\u0440\u043a\u043e\u0432\u044b\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043f\u043e\u044f\u0441 \u041c\u043e\u0441\u043a\u0432\u044b",
                city: "\u0414\u043e\u043b\u0433\u043e\u043f\u0440\u0443\u0434\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(499)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(499)39#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: "\u041c\u0435\u0433\u0430\u0424\u043e\u043d",
                desc: ""
            }, {
                mask: "+7(499)50#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u0444",
                desc: ""
            }, {
                mask: "+7(499)755-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0441\u043a\u0432\u0430",
                city: "\u041c\u043e\u0441\u043a\u0432\u0430",
                operator: "\u041c\u0435\u0433\u0430\u0424\u043e\u043d",
                desc: ""
            }, {
                mask: "+7(811)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8112)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0441\u043a\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0434\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0440\u0443\u0433\u0438 \u041a\u0440\u0430\u0441\u043d\u044b\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043b\u044e\u0441\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0440\u0445\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0435\u0434\u043e\u0432\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0433\u043e\u0440\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043f\u043e\u0447\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81139)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u043e\u043a\u043d\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0431\u0435\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0436\u0430\u043d\u0438\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0443\u0441\u0442\u043e\u0448\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0440\u0436\u0435\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0441\u043e\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u043b\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0443\u0448\u043a\u0438\u043d\u0441\u043a\u0438\u0435 \u0413\u043e\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u044b\u0442\u0430\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0447\u043e\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u043d\u044c\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0432\u044f\u0442\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u0432\u0435\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0441\u0442\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u043b\u0438\u043a\u0438\u0435 \u041b\u0443\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(812)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(813)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u0441\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81362)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u041a\u0438\u0440\u043e\u0432\u0441\u043a", "\u0428\u043b\u0438\u0441\u0441\u0435\u043b\u044c\u0431\u0443\u0440\u0433" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81363)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0412\u043e\u043b\u0445\u043e\u0432", "\u041d\u043e\u0432\u0430\u044f \u041b\u0430\u0434\u043e\u0433\u0430", "\u0421\u044f\u0441\u044c\u0441\u0442\u0440\u043e\u0439" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81364)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u043e\u0434\u0435\u0439\u043d\u043e\u0435 \u041f\u043e\u043b\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0434\u043f\u043e\u0440\u043e\u0436\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81366)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0411\u043e\u043a\u0441\u0438\u0442\u043e\u0433\u043e\u0440\u0441\u043a", "\u041f\u0438\u043a\u0430\u043b\u0451\u0432\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81367)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0438\u0445\u0432\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81368)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u041a\u0438\u0440\u0438\u0448\u0438", "\u0411\u0443\u0434\u043e\u0433\u043e\u0449\u044c" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81369)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0441\u043d\u043e\u0432\u044b\u0439 \u0411\u043e\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81370)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0412\u0441\u0435\u0432\u043e\u043b\u043e\u0436\u0441\u043a", "\u0422\u043e\u043a\u0441\u043e\u0432\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81371)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0413\u0430\u0442\u0447\u0438\u043d\u0430", "\u0412\u044b\u0440\u0438\u0446\u0430", "\u041a\u043e\u043c\u043c\u0443\u043d\u0430\u0440" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81372)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0443\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81373)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u0441\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81374)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043b\u0430\u043d\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81375)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u041a\u0438\u043d\u0433\u0438\u0441\u0435\u043f\u043f", "\u0418\u0432\u0430\u043d\u0433\u043e\u0440\u043e\u0434" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81376)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u043e\u043c\u043e\u043d\u043e\u0441\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81378)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0412\u044b\u0431\u043e\u0440\u0433", "\u0412\u044b\u0441\u043e\u0446\u043a", "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a", "\u0421\u0432\u0435\u0442\u043e\u0433\u043e\u0440\u0441\u043a" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81379)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u0438\u043e\u0437\u0435\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(814)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8142)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u0435\u0442\u0440\u043e\u0437\u0430\u0432\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81430)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u043e\u0440\u0442\u0430\u0432\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81430)3-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0412\u044f\u0440\u0442\u0441\u0438\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81430)3-1#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0425\u0435\u043b\u044e\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81430)3-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0420\u0443\u0441\u043a\u0435\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81430)3-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u0443\u0439\u043a\u043a\u043e\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81430)3-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0425\u0430\u0430\u043f\u0430\u043b\u0430\u043c\u043f\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81430)3-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0430\u0430\u043b\u0430\u043c\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81430)3-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0417\u0430\u043e\u0437\u0451\u0440\u043d\u044b\u0439", "\u041b\u0430\u043c\u0431\u0435\u0440\u0433", "\u0421\u043e\u0440\u0442\u0430\u0432\u0430\u043b\u0430", "\u0425\u044e\u043c\u043f\u0435\u043b\u044f" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81431)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u0435\u0433\u0435\u0436\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81431)3-0#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u043e\u0447\u043a\u043e\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81431)3-1#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041e\u043b\u0435\u043d\u0438\u0439", "\u041f\u0435\u0440\u0442\u043e\u0437\u0435\u0440\u043e", "\u0427\u0435\u0440\u043d\u044b\u0439 \u041f\u043e\u0440\u043e\u0433" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81431)3-2#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0412\u0430\u043b\u0434\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81431)3-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u043e\u043b\u0434\u043e\u0437\u0435\u0440\u043e", "\u0418\u0434\u0435\u043b\u044c", "\u041a\u044f\u0440\u0433\u043e\u0437\u0435\u0440\u043e", "\u041f\u043e\u043f\u043e\u0432 \u041f\u043e\u0440\u043e\u0433" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81431)3-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0430\u043c\u0435\u043d\u043d\u044b\u0439 \u0411\u043e\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81431)3-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u043e\u043b\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81431)3-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041d\u0430\u0434\u0432\u043e\u0438\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81433)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u0438\u0442\u043a\u044f\u0440\u0430\u043d\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81433)2-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041b\u044f\u0441\u043a\u0435\u043b\u044f", "\u0420\u0430\u0443\u0442\u0430\u043b\u0430\u0445\u0442\u0438", "\u0425\u0430\u0440\u043b\u0443", "\u0425\u0438\u0439\u0434\u0435\u043d\u0441\u0435\u043b\u044c\u0433\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81433)2-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0420\u044f\u0439\u043c\u044f\u043b\u044f", "\u0421\u0430\u043b\u043c\u0438" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81433)2-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0418\u043c\u043f\u0438\u043b\u0430\u0445\u0442\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81433)2-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041b\u0435\u043f\u043f\u044f\u0441\u0438\u043b\u0442\u0430", "\u0423\u0443\u043a\u0441\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041c\u0435\u0434\u0432\u0435\u0436\u044c\u0435\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)3-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0422\u043e\u043b\u0432\u0443\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)3-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0428\u0443\u043d\u044c\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)3-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u0435\u043b\u0438\u043a\u0430\u044f \u0413\u0443\u0431\u0430", "\u0412\u0435\u043b\u0438\u043a\u0430\u044f \u041d\u0438\u0432\u0430", "\u041a\u0438\u0436\u0438", "\u041a\u043e\u0441\u043c\u043e\u0437\u0435\u0440\u043e", "\u041b\u0430\u043c\u0431\u0430\u0441\u0440\u0443\u0447\u0435\u0439", "\u0421\u0435\u043d\u043d\u0430\u044f \u0413\u0443\u0431\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)3-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041a\u0443\u043c\u0441\u0430", "\u041b\u0430\u0432\u0430\u0441 \u0413\u0443\u0431\u0430", "\u041b\u0443\u043c\u0431\u0443\u0448\u0438", "\u0427\u0435\u0431\u0438\u043d\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)3-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u043e\u043b\u043e\u0437\u0435\u0440\u043e", "\u0413\u0430\u0431\u0441\u0435\u043b\u044c\u0433\u0430", "\u0421\u043e\u0441\u043d\u043e\u0432\u043a\u0430", "\u0427\u0435\u043b\u043c\u0443\u0436\u0438" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)4-2#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041e\u0433\u043e\u0440\u0435\u043b\u044b\u0448\u0438", "\u0421\u0435\u0440\u0433\u0438\u0435\u0432\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)4-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u043e\u0432\u0435\u043d\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)4-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u0438\u043d\u0434\u0443\u0448\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81434)4-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u0430\u0434\u0430\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81436)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041e\u043b\u043e\u043d\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81436)2-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0418\u043b\u044c\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81436)2-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u0435\u0440\u0445\u043d\u0438\u0439 \u041e\u043b\u043e\u043d\u0435\u0446", "\u041a\u043e\u0432\u0435\u0440\u0430", "\u0420\u0435\u0447\u043d\u0430\u044f \u0421\u0435\u043b\u044c\u0433\u0430", "\u0421\u044f\u043d\u0434\u0435\u0431\u0430", "\u0422\u0443\u043b\u043e\u043a\u0441\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81436)2-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041c\u0438\u0445\u0430\u0439\u043b\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81436)2-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0410\u043b\u0435\u043a\u0441\u0430\u043b\u0430", "\u041c\u0435\u0433\u0440\u0435\u0433\u0430", "\u0420\u044b\u043f\u0443\u0448\u043a\u0430\u043b\u0438\u0446\u0430", "\u0422\u0443\u043a\u0441\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81436)2-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0412\u0438\u0434\u043b\u0438\u0446\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81436)2-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u043e\u0442\u043a\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81436)2-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0443\u0439\u0442\u0435\u0436\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81437)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0411\u0435\u043b\u043e\u043c\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81437)3-0#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u0443\u043c\u0441\u043a\u0438\u0439 \u041f\u043e\u0441\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81437)3-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0417\u043e\u043b\u043e\u0442\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81437)3-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041a\u043e\u043b\u0435\u0436\u043c\u0430", "\u041b\u0430\u043f\u0438\u043d\u043e", "\u041b\u0435\u0445\u0442\u0430", "\u041c\u0430\u043b\u0435\u043d\u044c\u0433\u0430", "\u041d\u043e\u0432\u043e\u0435 \u041c\u0430\u0448\u043e\u0437\u0435\u0440\u043e", "\u041d\u044e\u0445\u0447\u0430", "\u0422\u0443\u043d\u0433\u0443\u0437\u0430", "\u0425\u0432\u043e\u0439\u043d\u044b\u0439", "\u0428\u0443\u0435\u0440\u0435\u0446\u043a\u043e\u0435" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81437)3-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u043e\u0441\u043d\u043e\u0432\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81437)3-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041b\u0435\u0441\u043e\u0431\u0438\u0440\u0436\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81437)3-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u0438\u0440\u0430\u043d\u0434\u043e\u0437\u0435\u0440\u043e", "\u041b\u0435\u0442\u043d\u0435\u0440\u0435\u0447\u0435\u043d\u0441\u043a\u0438\u0439" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81437)3-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u0443\u0448\u043d\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81439)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041b\u043e\u0443\u0445\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81439)2-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0435\u0441\u0442\u0435\u043d\u044c\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81439)2-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0421\u043e\u0444\u043f\u043e\u0440\u043e\u0433", "\u0422\u0443\u043d\u0433\u043e\u0437\u0435\u0440\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81439)2-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u044f\u043e\u0437\u0435\u0440\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81439)3-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0410\u043c\u0431\u0430\u0440\u043d\u044b\u0439", "\u041f\u043b\u043e\u0442\u0438\u043d\u0430", "\u0421\u043e\u0441\u043d\u043e\u0432\u044b\u0439", "\u042d\u043d\u0433\u043e\u0437\u0435\u0440\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81439)4-1#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0427\u0443\u043f\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81439)4-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0427\u043a\u0430\u043b\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81439)45#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0422\u044d\u0434\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81450)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041b\u0430\u0445\u0434\u0435\u043d\u043f\u043e\u0445\u044c\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81450)2-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0418\u0445\u0430\u043b\u0430", "\u041c\u0438\u0439\u043d\u0430\u043b\u0430", "\u042f\u043a\u043a\u0438\u043c\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81450)2-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041a\u0443\u0440\u043a\u0438\u0451\u043a\u0438", "\u0425\u0438\u0439\u0442\u043e\u043b\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81450)2-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u042d\u043b\u0438\u0441\u0435\u043d\u0432\u0430\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u043e\u043d\u0434\u043e\u043f\u043e\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)2-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0435\u0434\u0440\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)3-1#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0413\u0438\u0440\u0432\u0430\u0441", "\u0422\u0438\u0432\u0434\u0438\u044f", "\u042d\u043b\u044c\u043c\u0443\u0441" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)3-2#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u043f\u0430\u0441\u0441\u043a\u0430\u044f \u0413\u0443\u0431\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)3-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041a\u0438\u0432\u0430\u0447", "\u041d\u043e\u0432\u0438\u043d\u043a\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)3-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041a\u044f\u043f\u0435\u0441\u0435\u043b\u044c\u0433\u0430", "\u041d\u0435\u043b\u0433\u043e\u043c\u043e\u0437\u0435\u0440\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)3-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u043e\u043d\u0447\u0435\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)3-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0411\u0435\u0440\u0451\u0437\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81451)3-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0421\u0443\u043d\u0430", "\u042f\u043d\u0438\u0448\u043f\u043e\u043b\u0435" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81452)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u0443\u0434\u043e\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81452)2-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0411\u043e\u0447\u0438\u043b\u043e\u0432\u043e", "\u041a\u0430\u0440\u0448\u0435\u0432\u043e", "\u041a\u043e\u043b\u043e\u0432\u043e", "\u041a\u043e\u043b\u043e\u0434\u043e\u0437\u0435\u0440\u043e", "\u0421\u0435\u043c\u0451\u043d\u043e\u0432\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81452)2-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u043e\u0434\u043b\u0430", "\u041a\u0443\u0431\u043e\u0432\u043e", "\u041e\u043d\u0435\u0436\u0441\u043a\u0438\u0439", "\u0420\u0430\u0433\u043d\u0443\u043a\u0441\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81452)2-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041a\u0440\u0438\u0432\u0446\u044b", "\u041f\u0440\u0438\u0440\u0435\u0447\u043d\u044b\u0439" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81452)2-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0410\u0432\u0434\u0435\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81452)2-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u043e\u0434\u043f\u043e\u0440\u043e\u0436\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81452)2-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0428\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81452)2-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u044f\u043b\u044c\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81454)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0430\u043b\u0435\u0432\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81454)5-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0435\u043f\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81454)5-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u042e\u0448\u043a\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81454)5-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u043e\u0439\u043d\u0438\u0446\u0430", "\u041a\u0443\u0443\u0441\u0438\u043d\u0438\u0435\u043c\u0438", "\u041b\u0443\u0443\u0441\u0430\u043b\u043c\u0438" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81455)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041c\u0443\u0435\u0437\u0435\u0440\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81455)2-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0422\u0438\u043a\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81455)2-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0420\u0435\u0431\u043e\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81455)2-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0420\u0438\u0433\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81455)2-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u043e\u043b\u043e\u043c\u0430", "\u041f\u0435\u043d\u0438\u043d\u0433\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81455)2-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u0443\u043a\u043a\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81455)2-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041b\u0435\u0434\u043c\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81455)2-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041b\u0435\u043d\u0434\u0435\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81456)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u0440\u044f\u0436\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81456)2-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u0438\u043b\u043b\u0430 \u0413\u043e\u0440\u0430", "\u0421\u043e\u0434\u0434\u0435\u0440", "\u0421\u044f\u043f\u0441\u044f", "\u042d\u0441\u0441\u043e\u0439\u043b\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81456)2-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u0435\u0434\u043b\u043e\u0437\u0435\u0440\u043e", "\u041a\u0438\u043d\u0435\u043b\u0430\u0445\u0442\u0430", "\u041a\u043e\u0439\u0432\u0443\u0441\u0435\u043b\u044c\u0433\u0430", "\u041a\u043e\u043b\u0430\u0442\u0441\u0435\u043b\u044c\u0433\u0430", "\u0421\u0430\u0432\u0438\u043d\u043e\u0432\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81456)2-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0427\u0430\u043b\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81456)2-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041c\u0430\u0442\u0440\u043e\u0441\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81456)2-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0412\u0435\u0440\u0445\u043d\u0438\u0435 \u0412\u0430\u0436\u0438\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81456)2-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0440\u043e\u0448\u043d\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81456)2-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u0432\u044f\u0442\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81457)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u0443\u043e\u044f\u0440\u0432\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81457)2-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041b\u0430\u0445\u043a\u043e\u043b\u0430\u043c\u0431\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81457)2-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041f\u043e\u0440\u043e\u0441\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81457)2-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041d\u0430\u0439\u0441\u0442\u0435\u043d\u044c\u044f\u0440\u0432\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81457)2-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u0435\u0433\u0430\u0440\u0443\u0441", "\u0421\u0443\u043e\u0451\u043a\u0438", "\u0422\u043e\u0439\u0432\u043e\u043b\u0430", "\u0425\u0430\u0443\u0442\u043e\u0432\u0430\u0430\u0440\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81457)2-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0412\u0435\u0448\u043a\u0435\u043b\u0438\u0446\u0430", "\u041b\u043e\u0439\u043c\u043e\u043b\u0430", "\u041f\u0438\u0439\u0442\u0441\u0438\u0451\u043a\u0438" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81457)2-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041b\u0435\u043f\u043f\u044f\u0441\u044e\u0440\u044c\u044f", "\u0420\u0430\u0439\u043a\u043e\u043d\u043a\u043e\u0441\u043a\u0438", "\u0421\u0443\u0439\u0441\u0442\u0430\u043c\u043e" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81457)3-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041b\u0435\u043f\u043f\u044f\u043d\u0438\u0435\u043c\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0435\u043c\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)3-1#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0430\u043b\u0433\u0430\u043b\u0430\u043a\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)3-2#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u041f\u0430\u043d\u043e\u0437\u0435\u0440\u043e", "\u041f\u043e\u043d\u044c\u0433\u043e\u043c\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)3-4#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: [ "\u0410\u0432\u043d\u0435\u043f\u043e\u0440\u043e\u0433", "\u041a\u0440\u0438\u0432\u043e\u0439 \u041f\u043e\u0440\u043e\u0433" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)3-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0420\u0430\u0431\u043e\u0447\u0435\u043e\u0441\u0442\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)3-6#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0428\u043e\u043c\u0431\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)3-7#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u0443\u0437\u0435\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)3-8#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0411\u0430\u0431-\u0413\u0443\u0431\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81458)3-9#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0421\u043e\u043a\u043e\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81459)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u043e\u0441\u0442\u043e\u043c\u0443\u043a\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81459)9-3#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u041a\u043e\u043d\u0442\u043e\u043a\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81459)9-5#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0440\u0435\u043b\u0438\u044f",
                city: "\u0412\u043e\u043a\u043d\u0430\u0432\u043e\u043b\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(815)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8152)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81530)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043d\u0435\u0436\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81531)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81532)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043b\u044f\u0440\u043d\u044b\u0435 \u0417\u043e\u0440\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81533)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043d\u0434\u0430\u043b\u0430\u043a\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81535)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0432\u0434\u043e\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81536)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u043d\u0447\u0435\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81537)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0432\u0435\u0440\u043e\u043c\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81538)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u043e\u0432\u043e\u0437\u0435\u0440\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81539)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u0434\u0436\u0438\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81551)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043b\u044f\u0440\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81552)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043b\u0435\u043d\u0435\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81553)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81554)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u0417\u0430\u043f\u043e\u043b\u044f\u0440\u043d\u044b\u0439", "\u041d\u0438\u043a\u0435\u043b\u044c" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(81555)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043f\u0430\u0442\u0438\u0442\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81556)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u043e\u0437\u0435\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81558)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0441\u0442\u0440\u043e\u0432\u043d\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81559)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0443\u0440\u043c\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u043c\u0431\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(816)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8162)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u043b\u0438\u043a\u0438\u0439 \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81650)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0440\u0444\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81651)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0435\u043c\u044f\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81652)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u0430\u044f \u0420\u0443\u0441\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81653)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u0448\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81654)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u043e\u043b\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81655)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u043b\u044c\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81656)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0438\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81657)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043a\u0443\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81658)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0434\u0434\u043e\u0440\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81659)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0435\u0441\u0442\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81660)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043b\u0430\u044f \u0412\u0438\u0448\u0435\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81661)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0442\u0435\u0446\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81662)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81663)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0440\u0451\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81664)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0440\u043e\u0432\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81665)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0443\u0434\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81666)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u043b\u0434\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81667)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u0432\u043e\u0439\u043d\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81668)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u044e\u0431\u044b\u0442\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81669)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0441\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(817)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8172)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u0433\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81732)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u0430\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81733)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u043a\u043e\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81737)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044e\u0436\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81738)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u043b\u0438\u043a\u0438\u0439 \u0423\u0441\u0442\u044e\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81739)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u0442\u044c\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81740)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0447\u043c\u0435\u043d\u0433\u0441\u043a\u0438\u0439 \u0413\u043e\u0440\u043e\u0434\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81741)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0430\u0433\u043e\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81742)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0434\u0443\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81743)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0431\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81744)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0436\u0435\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81745)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u043b\u043e \u0438\u043c\u0435\u043d\u0438 \u0411\u0430\u0431\u0443\u0448\u043a\u0438\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81746)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u044b\u0442\u0435\u0433\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81747)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u044e\u043a\u0441\u0435\u043d\u0438\u0446\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81748)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0440\u043d\u043e\u0433\u0441\u043a\u0438\u0439 \u0413\u043e\u0440\u043e\u0434\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81749)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0443\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81751)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0435\u043a\u0441\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81752)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u044f\u043c\u0436\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81753)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81754)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u043a\u043e\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81755)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0440\u044f\u0437\u043e\u0432\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81756)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u043e\u0437\u0435\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81757)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u0438\u043b\u043b\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81758)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0438\u043f\u0438\u043d \u0411\u043e\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81759)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043e\u0432\u0430\u0436\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(818)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81830)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0425\u043e\u043b\u043c\u043e\u0433\u043e\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81831)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0411\u0435\u0440\u0435\u0437\u043d\u0438\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81832)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041f\u043b\u0435\u0441\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81833)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041b\u0435\u0448\u0443\u043a\u043e\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81834)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041c\u0438\u0440\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81835)9-0#-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0421\u043e\u043b\u043e\u0432\u0435\u0446\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81836)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0412\u0435\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81837)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041a\u043e\u0442\u043b\u0430\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81838)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041d\u044f\u043d\u0434\u043e\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81839)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041e\u043d\u0435\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81840)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0431\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81841)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041a\u0430\u0440\u0433\u043e\u043f\u043e\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81842)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0421\u0435\u0432\u0435\u0440\u043e\u0434\u0432\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81843)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0418\u043b\u044c\u0438\u043d\u0441\u043a\u043e-\u041f\u043e\u0434\u043e\u043c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81848)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041c\u0435\u0437\u0435\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81850)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041a\u043e\u0440\u044f\u0436\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81851)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0428\u0435\u043d\u043a\u0443\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81852)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041d\u043e\u0432\u043e\u0434\u0432\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81853)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041d\u0430\u0440\u044c\u044f\u043d-\u041c\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81854)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u0412\u0435\u0440\u0445\u043d\u044f\u044f \u0422\u043e\u0439\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81855)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81856)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041a\u0430\u0440\u043f\u043e\u0433\u043e\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81858)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u041a\u043e\u043d\u043e\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(81859)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: [ "\u0410\u0440\u0445\u0430\u043d\u0433\u0435\u043b\u044c\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "\u041d\u0435\u043d\u0435\u0446\u043a\u0438\u0439 \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433" ],
                city: "\u042f\u0440\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(820)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8202)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u043e\u0433\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u0435\u043f\u043e\u0432\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(821)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8212)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0421\u044b\u043a\u0442\u044b\u0432\u043a\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82130)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0412\u044b\u043b\u044c\u0433\u043e\u0440\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0412\u0438\u0437\u0438\u043d\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u041a\u043e\u0439\u0433\u043e\u0440\u043e\u0434\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u041e\u0431\u044a\u044f\u0447\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0410\u0439\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0423\u0441\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u041a\u043e\u0440\u0442\u043a\u0435\u0440\u043e\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0423\u0441\u0442\u044c-\u041a\u0443\u043b\u043e\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0422\u0440\u043e\u0438\u0446\u043a\u043e-\u041f\u0435\u0447\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82139)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0415\u043c\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0418\u0436\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0423\u0441\u0442\u044c-\u0426\u0438\u043b\u044c\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u041f\u0435\u0447\u043e\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0423\u0441\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0418\u043d\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0412\u0443\u043a\u0442\u044b\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0421\u043e\u0441\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(82151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0412\u043e\u0440\u043a\u0443\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8216)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u043c\u0438",
                city: "\u0423\u0445\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(831)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u0438\u0439 \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8313)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0437\u0435\u0440\u0436\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83130)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0438\u0432\u0435\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u0434\u0430\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u043a\u043e\u043b\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0435 \u0411\u043e\u043b\u0434\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83139)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0432\u043e\u043c\u0430\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0430\u0445\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0441\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0437\u0430\u043c\u0430\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0435\u0432\u043e\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u044b\u0441\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0442\u043b\u0443\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u043d\u0448\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0445\u0443\u043d\u044c\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u043d\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0440\u0435\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0440\u0430\u043d\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0435 \u0411\u0430\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0432\u0435\u0440\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u0440\u043d\u0430\u0432\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83160)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u043a\u0430\u043b\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u0440\u043e\u0434\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83162)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u043c\u0451\u043d\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0440\u043e\u0442\u044b\u043d\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83165)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043f\u0430\u0441\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83166)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043d\u044f\u0433\u0438\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83167)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0435 \u041c\u0443\u0440\u0430\u0448\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83168)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0430\u043b\u044c\u043d\u0435\u0435 \u041a\u043e\u043d\u0441\u0442\u0430\u043d\u0442\u0438\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83169)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0432\u043e\u043b\u0436\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83170)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0433\u043e\u0440\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83171)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: [ "\u041f\u0430\u0432\u043b\u043e\u0432\u043e", "\u0412\u043e\u0440\u0441\u043c\u0430" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(83172)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0443\u0442\u0443\u0440\u043b\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83173)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u0447\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83174)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0441\u043d\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83175)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0432\u0430\u0448\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83176)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u043b\u0435\u0431\u0430\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83177)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u044b\u043a\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83178)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0437\u043d\u0435\u0441\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83179)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0434\u0430\u0442\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83190)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0442\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83191)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u0433\u0430\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83192)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0438\u043b\u044c\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83193)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0447\u0435\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83194)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0440\u0430\u0437\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83195)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0430\u0433\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83196)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0443\u043a\u043e\u044f\u043d\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83197)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041d\u0438\u0436\u0435\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0447\u0438\u043d\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(833)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8332)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83330)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u0431\u0430\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83331)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0444\u0430\u043d\u0430\u0441\u044c\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83332)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0424\u0430\u043b\u0435\u043d\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83333)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83334)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u044f\u0442\u0441\u043a\u0438\u0435 \u041f\u043e\u043b\u044f\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83335)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0440\u0445\u043e\u0448\u0438\u0436\u0435\u043c\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83336)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0430\u0440\u043e\u0432\u0441\u043a\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83337)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0443\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83338)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u043b\u044c\u043c\u0435\u0437\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83339)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83340)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0443\u0436\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u043a\u043d\u0443\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83342)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0442\u0435\u043b\u044c\u043d\u0438\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83343)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u043c\u0435\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u0431\u044f\u0436\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u043d\u0438\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0443\u0437\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043b\u043c\u044b\u0436",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83348)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0443\u0440\u0430\u0448\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83349)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83350)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83351)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0434\u043e\u0441\u0438\u043d\u043e\u0432\u0435\u0446",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83352)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043c\u0443\u0442\u043d\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83353)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043f\u0430\u0440\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83354)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0438\u0436\u0430\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83357)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043d\u0447\u0443\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83358)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0432\u0435\u0447\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83359)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u043d\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u0440\u043e\u0432\u043e-\u0427\u0435\u043f\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83362)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043b\u043e\u0431\u043e\u0434\u0441\u043a\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83363)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0440\u0436\u0443\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83364)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u0430\u044f \u0425\u043e\u043b\u0443\u043d\u0438\u0446\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u043b\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83366)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042e\u0440\u044c\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83367)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042f\u0440\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83368)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u043b\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83369)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83375)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0432\u0435\u0442\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(834)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8342)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0421\u0430\u0440\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83431)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0410\u0440\u0434\u0430\u0442\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83432)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0421\u0442\u0430\u0440\u043e\u0435 \u0428\u0430\u0439\u0433\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83433)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u041a\u0435\u043c\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83434)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0410\u0442\u044f\u0448\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83436)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0411\u043e\u043b\u044c\u0448\u0438\u0435 \u0411\u0435\u0440\u0435\u0437\u043d\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83437)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0427\u0430\u043c\u0437\u0438\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83438)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0420\u043e\u043c\u043e\u0434\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83439)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u041a\u043e\u0447\u043a\u0443\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83441)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u041b\u044f\u043c\u0431\u0438\u0440\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83442)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0435 \u0418\u0433\u043d\u0430\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83443)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0441\u043b\u043e\u0431\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83444)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0415\u043b\u044c\u043d\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83445)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0422\u0435\u043c\u043d\u0438\u043a\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83446)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0422\u0435\u043d\u044c\u0433\u0443\u0448\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83447)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0414\u0443\u0431\u0435\u043d\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83448)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u041a\u0430\u0434\u043e\u0448\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83449)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0418\u043d\u0441\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83451)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0420\u0443\u0437\u0430\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83453)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u041a\u043e\u0432\u044b\u043b\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83454)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0410\u0442\u044e\u0440\u044c\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83456)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0422\u043e\u0440\u0431\u0435\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83457)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u042f\u0432\u0430\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83458)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u043e\u0440\u0434\u043e\u0432\u0438\u044f",
                city: "\u0417\u0443\u0431\u043e\u0432\u0430 \u041f\u043e\u043b\u044f\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(835)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8352)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0427\u0435\u0431\u043e\u043a\u0441\u0430\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8352)7#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041d\u043e\u0432\u043e\u0447\u0435\u0431\u043e\u043a\u0441\u0430\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83530)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0430\u0440\u043c\u0435\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83531)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0410\u043b\u0430\u0442\u044b\u0440\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83532)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0411\u0430\u0442\u044b\u0440\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83533)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041a\u0430\u043d\u0430\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83534)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041a\u043e\u0437\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83535)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0410\u043b\u0438\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83536)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0428\u0443\u043c\u0435\u0440\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83537)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0412\u0443\u0440\u043d\u0430\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83538)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0418\u0431\u0440\u0435\u0441\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83539)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041a\u043e\u043c\u0441\u043e\u043c\u043e\u043b\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83540)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041a\u0443\u0433\u0435\u0441\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83541)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041c\u043e\u0440\u0433\u0430\u0443\u0448\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83542)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041c\u0430\u0440\u0438\u0438\u043d\u0441\u043a\u0438\u0439 \u041f\u043e\u0441\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83543)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041f\u043e\u0440\u0435\u0446\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83544)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0423\u0440\u043c\u0430\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83545)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0426\u0438\u0432\u0438\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83546)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u0428\u0435\u043c\u0443\u0440\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83547)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u042f\u0434\u0440\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83548)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u042f\u043d\u0442\u0438\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83549)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u042f\u043b\u044c\u0447\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83551)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0443\u0432\u0430\u0448\u0438\u044f",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0435 \u0427\u0435\u0442\u0430\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(836)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8362)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u0419\u043e\u0448\u043a\u0430\u0440-\u041e\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83631)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u0412\u043e\u043b\u0436\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83632)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u041a\u043e\u0437\u044c\u043c\u043e\u0434\u0435\u043c\u044c\u044f\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83633)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u0421\u0435\u0440\u043d\u0443\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83634)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u041c\u0430\u0440\u0438-\u0422\u0443\u0440\u0435\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83635)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u041c\u043e\u0440\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83636)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u041d\u043e\u0432\u044b\u0439 \u0422\u043e\u0440\u044a\u044f\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83637)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u041a\u0443\u0436\u0435\u043d\u0435\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83638)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83639)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u041f\u0430\u0440\u0430\u043d\u044c\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83641)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u041e\u0440\u0448\u0430\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83643)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u041a\u0438\u043b\u0435\u043c\u0430\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83644)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u042e\u0440\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(83645)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041c\u0430\u0440\u0438\u0439 \u042d\u043b",
                city: "\u0417\u0432\u0435\u043d\u0438\u0433\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(840)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0431\u0445\u0430\u0437\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(840)22#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0431\u0445\u0430\u0437\u0438\u044f",
                city: "\u0421\u0443\u0445\u0443\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(840)23#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0431\u0445\u0430\u0437\u0438\u044f",
                city: "\u0413\u0430\u0433\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(840)24#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0431\u0445\u0430\u0437\u0438\u044f",
                city: "\u0413\u0443\u0434\u0430\u0443\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(840)25#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0431\u0445\u0430\u0437\u0438\u044f",
                city: "\u041e\u0447\u0430\u043c\u0447\u044b\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(840)26#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0431\u0445\u0430\u0437\u0438\u044f",
                city: "\u0422\u043a\u0443\u0430\u0440\u0447\u0430\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(840)27#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0431\u0445\u0430\u0437\u0438\u044f",
                city: "\u0413\u0443\u043b\u0440\u044b\u043f\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(840)28#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0431\u0445\u0430\u0437\u0438\u044f",
                city: "\u0413\u0430\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(841)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8412)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u043d\u0437\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0441\u0441\u043e\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0430\u0434\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0448\u043c\u0430\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0441\u0441\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u041a\u0430\u043c\u0435\u0448\u043a\u0438\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043b\u044b\u0448\u043b\u0435\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043d\u0434\u043e\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u043e\u043f\u0430\u0442\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u043a\u0448\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043f\u0430\u0441\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0447\u0435\u043b\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u0436\u043d\u0438\u0439 \u041b\u043e\u043c\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0435\u043c\u0435\u0442\u0447\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u0435\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0437\u043d\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u0440\u043e\u0434\u0438\u0449\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0435\u043c\u044b\u0448\u0435\u0439\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0443\u043d\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84162)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u043b\u0430\u044f \u0421\u0435\u0440\u0434\u043e\u0431\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0440\u043e\u0432\u0447\u0430\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u0432\u0435\u0440\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84165)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u043a\u043e\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84167)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u0434\u043e\u0431\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84168)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0441\u043d\u043e\u0432\u043e\u0431\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84169)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041f\u0435\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u043c\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(842)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8422)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84230)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u0430\u044f \u041c\u0430\u0439\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84231)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u0434\u0430\u043a\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84232)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u0430\u044f \u041c\u0430\u043b\u044b\u043a\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84233)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u043d\u0433\u0438\u043b\u0435\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84234)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0435\u0440\u0435\u043d\u044c\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84235)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0438\u043c\u0438\u0442\u0440\u043e\u0432\u0433\u0440\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84237)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0437\u043e\u0432\u0430\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84238)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0441\u043f\u0430\u0441\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84239)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0430\u0434\u0438\u0449\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84240)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0437\u0430\u0440\u043d\u044b\u0439 \u0421\u044b\u0437\u0433\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84241)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u043d\u0437\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84242)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84243)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0448\u043a\u0430\u0439\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0439\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84245)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0435 \u041d\u0430\u0433\u0430\u0442\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84246)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0440\u0441\u0443\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84247)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u043a\u043e\u043b\u0430\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84248)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u0432\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84249)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u0430\u044f \u041a\u0443\u043b\u0430\u0442\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84253)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0440\u044b\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84254)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0448\u0435\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84255)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0423\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0443\u043b\u044c\u044f\u043d\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(843)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041a\u0430\u0437\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0410\u043b\u0435\u043a\u0441\u0435\u0435\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84342)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0427\u0438\u0441\u0442\u043e\u043f\u043e\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0410\u043a\u0441\u0443\u0431\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041d\u0443\u0440\u043b\u0430\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84346)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u0430\u0437\u0430\u0440\u043d\u044b\u0435 \u041c\u0430\u0442\u0430\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u043e\u043b\u0433\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84348)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041d\u043e\u0432\u043e\u0448\u0435\u0448\u043c\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84360)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0422\u044e\u043b\u044f\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0420\u044b\u0431\u043d\u0430\u044f \u0421\u043b\u043e\u0431\u043e\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84362)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u043e\u0433\u0430\u0442\u044b\u0435 \u0421\u0430\u0431\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84364)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041a\u0443\u043a\u043c\u043e\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0412\u044b\u0441\u043e\u043a\u0430\u044f \u0413\u043e\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84366)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0410\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84367)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041f\u0435\u0441\u0442\u0440\u0435\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84368)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u0430\u043b\u0442\u0430\u0441\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84369)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u043e\u043b\u044c\u0448\u0430\u044f \u0410\u0442\u043d\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84370)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u043e\u043b\u044c\u0448\u0438\u0435 \u041a\u0430\u0439\u0431\u0438\u0446\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84371)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0417\u0435\u043b\u0435\u043d\u043e\u0434\u043e\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84373)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0422\u0435\u0442\u044e\u0448\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84374)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u0443\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84375)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0421\u0442\u0430\u0440\u043e\u0435 \u0414\u0440\u043e\u0436\u0436\u0430\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84376)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0410\u043f\u0430\u0441\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84377)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041a\u0430\u043c\u0441\u043a\u043e\u0435 \u0423\u0441\u0442\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84378)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041b\u0430\u0438\u0448\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84379)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0412\u0435\u0440\u0445\u043d\u0438\u0439 \u0423\u0441\u043b\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84396)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0427\u0435\u0440\u0435\u043c\u0448\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(844)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(844)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(844)70#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8443)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u0436\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84442)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0440\u044e\u043f\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84443)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u0445\u0430\u0435\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84444)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u043d\u0438\u043a\u043e\u043b\u0430\u0435\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84445)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u0435\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84446)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0435\u0435\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84447)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0430\u043d\u043d\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84452)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043b\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84453)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0443\u0434\u043d\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84454)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0438\u0440\u043d\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84455)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84456)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043b\u044c\u0445\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84457)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u044b\u0448\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84458)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0443\u0431\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84461)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0430\u043d\u0438\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84462)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u043c\u044b\u043b\u0436\u0435\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84463)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u0445\u0430\u0439\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84464)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u0430\u0444\u0438\u043c\u043e\u0432\u0438\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84465)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0424\u0440\u043e\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84466)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043b\u0435\u0442\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84467)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u043b\u043e\u0432\u043b\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84468)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u0440\u043e\u0434\u0438\u0449\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84472)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043b\u0430\u0447-\u043d\u0430-\u0414\u043e\u043d\u0443",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84473)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0443\u0440\u043e\u0432\u0438\u043a\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84474)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u043d\u044b\u0448\u043a\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84475)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84476)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0442\u0435\u043b\u044c\u043d\u0438\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84477)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0432\u0435\u0442\u043b\u044b\u0439 \u042f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84478)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0435\u043d\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84479)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0440\u0435\u0434\u043d\u044f\u044f \u0410\u0445\u0442\u0443\u0431\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84492)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0430\u043b\u043b\u0430\u0441\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84493)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0430\u0440\u0430\u044f \u041f\u043e\u043b\u0442\u0430\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84494)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0438\u043a\u043e\u043b\u0430\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84495)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u044b\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(845)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8452)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8453)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0430\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8453)3#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0430\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8453)4#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0430\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8453)5#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042d\u043d\u0433\u0435\u043b\u044c\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8453)7#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042d\u043d\u0433\u0435\u043b\u044c\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8453)9#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u042d\u043d\u0433\u0435\u043b\u044c\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84540)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0442\u0438\u0449\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84542)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0440\u043a\u0430\u0434\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84543)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0443\u0440\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84544)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u043c\u0430\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84545)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0430\u0448\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84548)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u043e\u0439\u043b\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84549)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84550)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0430\u0440\u043c\u0435\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84551)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u044b\u0441\u044b\u0435 \u0413\u043e\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84552)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0442\u043a\u0430\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84554)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043a\u0430\u0442\u0435\u0440\u0438\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84555)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0442\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84557)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u044b\u0435 \u0411\u0443\u0440\u0430\u0441\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84558)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0442\u0438\u0449\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84560)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0439 \u041a\u0443\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84561)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0438\u0442\u0435\u0440\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84562)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0443\u0437\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84563)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0435\u0440\u0433\u0430\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84564)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u0440\u0448\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84565)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u043a\u0440\u043e\u0443\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84566)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0442\u0435\u043f\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84567)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0440\u043a\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84568)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84573)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0443\u0445\u043e\u0432\u043d\u0438\u0446\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84574)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0443\u0433\u0430\u0447\u0451\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84575)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0440\u0435\u043b\u044e\u0431",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84576)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0437\u0438\u043d\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84577)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u043e\u0440\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84578)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432 \u0413\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84579)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0432\u0430\u043d\u0442\u0435\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84591)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0437\u0430\u0440\u043d\u044b\u0439 \u041a\u0430\u0440\u0430\u0431\u0443\u043b\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84592)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u043b\u0442\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84593)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84595)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u0432\u0430\u043b\u044b\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84596)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u0440\u0430\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0432\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)300-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)302-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)303-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)309-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)31#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)33#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)34#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)37#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(846)9##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043c\u0430\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84630)5-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u0436\u0441\u043a\u0438\u0439 \u0423\u0442\u0451\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84635)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u043a\u0443\u0439\u0431\u044b\u0448\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84639)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0430\u043f\u0430\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8464)3#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u044b\u0437\u0440\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8464)4#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u044b\u0437\u0440\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8464)9#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u044b\u0437\u0440\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84646)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84647)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u0438\u0432\u043e\u043b\u0436\u044c\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84648)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0438\u0433\u043e\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84650)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u0448\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84651)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u043b\u043d\u043e-\u0412\u0435\u0440\u0448\u0438\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84652)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0435\u043d\u0442\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84653)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043b\u044f\u0432\u043b\u0438\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84654)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u0441\u0430\u043a\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84655)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u0440\u0433\u0438\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84656)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u0445\u0432\u0438\u0441\u0442\u043d\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84657)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0439 \u042f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84658)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043b\u0445\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84660)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u043d\u0435\u043b\u044c-\u0427\u0435\u0440\u043a\u0430\u0441\u0441\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84661)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0442\u0440\u0430\u0434\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84663)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0438\u043d\u0435\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84664)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u044b\u0448\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84666)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0433\u0430\u0442\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84667)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u0440\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84670)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0435\u0444\u0442\u0435\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84671)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043b\u0435\u043a\u0441\u0435\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84672)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u0430\u044f \u0427\u0435\u0440\u043d\u0438\u0433\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84673)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u0430\u044f \u0413\u043b\u0443\u0448\u0438\u0446\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84674)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0441\u0442\u0440\u0430\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84675)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0430\u0440\u043c\u0435\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84676)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u0437\u0435\u043d\u0447\u0443\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84677)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u0432\u043e\u0440\u043e\u0441\u0442\u044f\u043d\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(847)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84722)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u042d\u043b\u0438\u0441\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84731)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u0413\u043e\u0440\u043e\u0434\u043e\u0432\u0438\u043a\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84732)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u0418\u043a\u0438-\u0411\u0443\u0440\u0443\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84733)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u041b\u0430\u0433\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84734)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u041c\u0430\u043b\u044b\u0435 \u0414\u0435\u0440\u0431\u0435\u0442\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84735)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u041a\u0435\u0442\u0447\u0435\u043d\u0435\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84736)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u041f\u0440\u0438\u044e\u0442\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84741)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u0421\u0430\u0434\u043e\u0432\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84742)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u0422\u0440\u043e\u0438\u0446\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84743)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u041a\u043e\u043c\u0441\u043e\u043c\u043e\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84744)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u0426\u0430\u0433\u0430\u043d \u0410\u043c\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84745)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u042f\u0448\u0430\u043b\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84746)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u042f\u0448\u043a\u0443\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84747)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u043b\u043c\u044b\u043a\u0438\u044f",
                city: "\u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0426\u0430\u0440\u044b\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(848)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8482)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u043e\u043b\u044c\u044f\u0442\u0442\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(84862)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0430\u043c\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0416\u0438\u0433\u0443\u043b\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(851)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8512)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u043d\u0430\u043c\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0445\u0442\u0443\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u043d\u043e\u0442\u0430\u0435\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0418\u043a\u0440\u044f\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u044b\u0437\u044f\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0439 \u042f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041b\u0438\u043c\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0425\u0430\u0440\u0430\u0431\u0430\u043b\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0451\u0440\u043d\u044b\u0439 \u042f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85171)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0440\u0438\u043c\u0430\u043d\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85172)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u0430\u0447\u0430\u043b\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(855)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8552)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041d\u0430\u0431\u0435\u0440\u0435\u0436\u043d\u044b\u0435 \u0427\u0435\u043b\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8553)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0410\u043b\u044c\u043c\u0435\u0442\u044c\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85549)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041c\u0435\u043d\u0434\u0435\u043b\u0435\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8555)3#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041d\u0438\u0436\u043d\u0435\u043a\u0430\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8555)4#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041d\u0438\u0436\u043d\u0435\u043a\u0430\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85551)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0410\u0433\u0440\u044b\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85552)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0410\u043a\u0442\u0430\u043d\u044b\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85555)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041c\u0435\u043d\u0437\u0435\u043b\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85556)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041c\u0443\u0441\u043b\u044e\u043c\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85557)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0415\u043b\u0430\u0431\u0443\u0433\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85558)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0417\u0430\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85559)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0421\u0430\u0440\u043c\u0430\u043d\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85563)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041c\u0430\u043c\u0430\u0434\u044b\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85569)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u0430\u0432\u043b\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8557)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041d\u0430\u0431\u0435\u0440\u0435\u0436\u043d\u044b\u0435 \u0427\u0435\u043b\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8557)3#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041d\u0430\u0431\u0435\u0440\u0435\u0436\u043d\u044b\u0435 \u0427\u0435\u043b\u043d\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85592)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0410\u0437\u043d\u0430\u043a\u0430\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85593)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0423\u0440\u0443\u0441\u0441\u0443",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85594)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u0411\u0443\u0433\u0443\u043b\u044c\u043c\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(85595)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0422\u0430\u0442\u0430\u0440\u0441\u0442\u0430\u043d",
                city: "\u041b\u0435\u043d\u0438\u043d\u043e\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(861)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86130)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0438\u043c\u0430\u0448\u0451\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86131)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u044b\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86133)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043d\u0430\u043f\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u0442\u044c-\u041b\u0430\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86137)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0440\u043c\u0430\u0432\u0438\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86138)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u043e\u043f\u043e\u0442\u043a\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86140)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0423\u0441\u043f\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86141)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0435\u043b\u0435\u043d\u0434\u0436\u0438\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u0440\u0435\u043d\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u043e-\u0410\u0445\u0442\u0430\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86144)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041e\u0442\u0440\u0430\u0434\u043d\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0435\u043d\u0438\u043d\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u043b\u0430\u0432\u044f\u043d\u0441\u043a-\u043d\u0430-\u041a\u0443\u0431\u0430\u043d\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0440\u0433\u0430\u043d\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0435\u043c\u0440\u044e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86149)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u043f\u043e\u043a\u0440\u043e\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86150)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86151)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0442\u0430\u0440\u043e\u0449\u0435\u0440\u0431\u0438\u043d\u043e\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043f\u0448\u0435\u0440\u043e\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86153)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0442\u0430\u0440\u043e\u043c\u0438\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0435\u043b\u0430\u044f \u0413\u043b\u0438\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0435\u043b\u043e\u0440\u0435\u0447\u0435\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0440\u044e\u0445\u043e\u0432\u0435\u0446\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86157)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0412\u044b\u0441\u0435\u043b\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86158)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0431\u0438\u043b\u0438\u0441\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86159)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u043e\u0440\u044f\u0447\u0438\u0439 \u041a\u043b\u044e\u0447",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86160)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0443\u043b\u044c\u043a\u0435\u0432\u0438\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86161)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u044b\u043b\u043e\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86162)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0438\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86163)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u043b\u0438\u043d\u0438\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u043d\u0435\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86165)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u043e\u043b\u0442\u0430\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86166)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0435\u0432\u0435\u0440\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86167)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0443\u0430\u043f\u0441\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86168)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0449\u0451\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86169)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0430\u0431\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8617)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u0440\u043e\u0441\u0441\u0438\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86191)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u0430\u0432\u043b\u043e\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86192)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86193)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0430\u0432\u043a\u0430\u0437\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86195)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u043a\u0443\u0431\u0430\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86196)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0422\u0438\u0445\u043e\u0440\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(862)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: "\u0430\u0433\u043b\u043e\u043c\u0435\u0440\u0430\u0446\u0438\u044f \u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0421\u043e\u0447\u0438"
            }, {
                mask: "+7(862)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: [ "\u0410\u0448\u0435", "\u0412\u0430\u0440\u0434\u0430\u043d\u0435", "\u0413\u043e\u043b\u043e\u0432\u0438\u043d\u043a\u0430", "\u0413\u043e\u043b\u043e\u0432\u0438\u043d\u043a\u0430", "\u0421\u043e\u0447\u0438", "\u0425\u043e\u0441\u0442\u0430" ],
                operator: "",
                desc: "\u0430\u0433\u043b\u043e\u043c\u0435\u0440\u0430\u0446\u0438\u044f \u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0421\u043e\u0447\u0438"
            }, {
                mask: "+7(862)23#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "\u041c\u0422\u0421",
                desc: "\u0430\u0433\u043b\u043e\u043c\u0435\u0440\u0430\u0446\u0438\u044f \u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0421\u043e\u0447\u0438"
            }, {
                mask: "+7(862)24#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0434\u043b\u0435\u0440",
                operator: "",
                desc: "\u0430\u0433\u043b\u043e\u043c\u0435\u0440\u0430\u0446\u0438\u044f \u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0421\u043e\u0447\u0438"
            }, {
                mask: "+7(862)247-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0434\u0435\u043f\u0441\u0442\u0430",
                operator: "",
                desc: "\u0430\u0433\u043b\u043e\u043c\u0435\u0440\u0430\u0446\u0438\u044f \u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0421\u043e\u0447\u0438"
            }, {
                mask: "+7(862)252-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: [ "\u0414\u0430\u0433\u043e\u043c\u044b\u0441", "\u041b\u043e\u043e" ],
                operator: "",
                desc: "\u0430\u0433\u043b\u043e\u043c\u0435\u0440\u0430\u0446\u0438\u044f \u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0421\u043e\u0447\u0438"
            }, {
                mask: "+7(862)27#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0430\u0437\u0430\u0440\u0435\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: "\u0430\u0433\u043b\u043e\u043c\u0435\u0440\u0430\u0446\u0438\u044f \u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0421\u043e\u0447\u0438"
            }, {
                mask: "+7(862)295-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "\u041c\u0435\u0433\u0430\u0424\u043e\u043d",
                desc: "\u0430\u0433\u043b\u043e\u043c\u0435\u0440\u0430\u0446\u0438\u044f \u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0421\u043e\u0447\u0438"
            }, {
                mask: "+7(863)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(863)2##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0441\u0442\u043e\u0432-\u043d\u0430-\u0414\u043e\u043d\u0443",
                operator: "",
                desc: ""
            }, {
                mask: "+7(863)3##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0441\u0442\u043e\u0432-\u043d\u0430-\u0414\u043e\u043d\u0443",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8634)3#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0433\u0430\u043d\u0440\u043e\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8634)43-1#-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0433\u0430\u043d\u0440\u043e\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8634)6#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0433\u0430\u043d\u0440\u043e\u0433",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86340)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u0434\u0438\u043e\u043d\u043e\u0432\u043e-\u041d\u0435\u0441\u0432\u0435\u0442\u0430\u0439\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0430\u0442\u0432\u0435\u0435\u0432-\u041a\u0443\u0440\u0433\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86342)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u0437\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0433\u0430\u043b\u044c\u043d\u0438\u0446\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86347)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u043e\u043a\u0440\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86348)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0443\u0439\u0431\u044b\u0448\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86349)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0430\u043b\u0442\u044b\u0440\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8635)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0447\u0435\u0440\u043a\u0430\u0441\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86350)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0410\u043a\u0441\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86351)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0423\u0441\u0442\u044c-\u0414\u043e\u043d\u0435\u0446\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86353)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0451\u0448\u0435\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86354)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0442\u0430\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86355)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0432\u0435\u0440\u0435\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86356)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0435\u043c\u0438\u043a\u0430\u0440\u0430\u043a\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86357)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0430\u0433\u0430\u0435\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86358)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u0435\u0441\u0451\u043b\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86359)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0435\u0440\u043d\u043e\u0433\u0440\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8636)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0428\u0430\u0445\u0442\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86360)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u0435\u043d\u043e\u043b\u043e\u043c\u043d\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86361)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0413\u0443\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86363)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86364)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0437\u0430\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86365)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u043c\u0435\u043d\u0441\u043a-\u0428\u0430\u0445\u0442\u0438\u043d\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86367)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0440\u0430\u0441\u043d\u044b\u0439 \u0421\u0443\u043b\u0438\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86368)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u043e\u043d\u0435\u0446\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86369)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041d\u043e\u0432\u043e\u0448\u0430\u0445\u0442\u0438\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86370)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0415\u0433\u043e\u0440\u043b\u044b\u043a\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86371)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0426\u0435\u043b\u0438\u043d\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86372)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0421\u0430\u043b\u044c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86373)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0435\u0441\u0447\u0430\u043d\u043e\u043a\u043e\u043f\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86374)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041f\u0440\u043e\u043b\u0435\u0442\u0430\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86375)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0440\u043b\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86376)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0438\u043c\u043e\u0432\u043d\u0438\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86377)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0414\u0443\u0431\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86378)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0417\u0430\u0432\u0435\u0442\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86379)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u0435\u043c\u043e\u043d\u0442\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86382)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043a\u043e\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86383)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u0435\u043b\u0430\u044f \u041a\u0430\u043b\u0438\u0442\u0432\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86384)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u043e\u0440\u043e\u0437\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86385)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u043b\u043b\u0435\u0440\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86386)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0440\u0430\u0441\u043e\u0432\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86387)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0427\u0435\u0440\u0442\u043a\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86388)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u0430\u0448\u0430\u0440\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86389)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041c\u0438\u043b\u044e\u0442\u0438\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8639)2#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0412\u043e\u043b\u0433\u043e\u0434\u043e\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86391)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0426\u0438\u043c\u043b\u044f\u043d\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86393)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041a\u043e\u043d\u0441\u0442\u0430\u043d\u0442\u0438\u043d\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86394)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0420\u043e\u043c\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86395)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0411\u043e\u043b\u044c\u0448\u0430\u044f \u041c\u0430\u0440\u0442\u044b\u043d\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86396)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u041e\u0431\u043b\u0438\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86397)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u043e\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c",
                city: "\u0422\u0430\u0446\u0438\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(865)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8652)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86540)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0440\u0430\u0447\u0451\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86541)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0433\u0432\u0430\u0440\u0434\u0435\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86542)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0418\u043f\u0430\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86543)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0435\u0432\u043e\u043a\u0443\u043c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86544)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u0430\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86545)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0418\u0437\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86546)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u043e\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86547)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0432\u0435\u0442\u043b\u043e\u0433\u0440\u0430\u0434",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86548)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u0441\u0435\u043b\u0438\u0446\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86549)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86550)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u043e\u0447\u0443\u0431\u0435\u0435\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86552)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0417\u0435\u043b\u0435\u043d\u043e\u043a\u0443\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86553)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u0438\u0445\u0430\u0439\u043b\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86554)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0435\u0432\u0438\u043d\u043d\u043e\u043c\u044b\u0441\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86555)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0414\u0438\u0432\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86556)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0440\u0441\u0430\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86557)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86558)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u0435\u0444\u0442\u0435\u043a\u0443\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86559)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0411\u0443\u0434\u0435\u043d\u043d\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86560)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0410\u0440\u0437\u0433\u0438\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86563)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0421\u0442\u0435\u043f\u043d\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86565)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0435\u0442\u043d\u044f\u044f \u0421\u0442\u0430\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(866)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8662)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u041d\u0430\u043b\u044c\u0447\u0438\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86630)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u0427\u0435\u0433\u0435\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86631)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u041f\u0440\u043e\u0445\u043b\u0430\u0434\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86632)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u0422\u0435\u0440\u0435\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86633)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u041c\u0430\u0439\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86634)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u0411\u0430\u043a\u0441\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86635)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u041d\u0430\u0440\u0442\u043a\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86636)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u041a\u0430\u0448\u0445\u0430\u0442\u0430\u0443",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86637)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u0417\u0430\u043b\u0443\u043a\u043e\u043a\u043e\u0430\u0436\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86638)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u041a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u043e-\u0411\u0430\u043b\u043a\u0430\u0440\u0438\u044f",
                city: "\u0422\u044b\u0440\u043d\u044b\u0430\u0443\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(867)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8672)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u0412\u043b\u0430\u0434\u0438\u043a\u0430\u0432\u043a\u0430\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86731)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u0410\u043b\u0430\u0433\u0438\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86732)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u0410\u0440\u0434\u043e\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86733)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u0414\u0438\u0433\u043e\u0440\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86734)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u0427\u0438\u043a\u043e\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86735)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u042d\u043b\u044c\u0445\u043e\u0442\u043e\u0432\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86736)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u041c\u043e\u0437\u0434\u043e\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86737)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u0411\u0435\u0441\u043b\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86738)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(86739)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041e\u0441\u0435\u0442\u0438\u044f",
                city: "\u0410\u0440\u0445\u043e\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(871)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8712)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0413\u0440\u043e\u0437\u043d\u044b\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87132)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0417\u043d\u0430\u043c\u0435\u043d\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87134)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0412\u0435\u0434\u0435\u043d\u043e",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87135)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0428\u0430\u0442\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87136)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0428\u0435\u043b\u043a\u043e\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87142)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0410\u0447\u0445\u043e\u0439-\u041c\u0430\u0440\u0442\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87143)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041d\u0430\u0443\u0440\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87145)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0423\u0440\u0443\u0441-\u041c\u0430\u0440\u0442\u0430\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87146)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0428\u0430\u043b\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87147)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0410\u0440\u0433\u0443\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87148)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041d\u043e\u0436\u0430\u0439-\u042e\u0440\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87152)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0413\u0443\u0434\u0435\u0440\u043c\u0435\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87154)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0421\u0435\u0440\u043d\u043e\u0432\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87155)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u041a\u0443\u0440\u0447\u0430\u043b\u043e\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87156)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: [ "\u0422\u043e\u043b\u0441\u0442\u043e\u0439-\u042e\u0440\u0442", "\u0421\u0442\u0430\u0440\u044b\u0435 \u0410\u0442\u0430\u0433\u0438" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(87164)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0427\u0435\u0447\u0435\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
                city: "\u0418\u0442\u0443\u043c-\u041a\u0430\u043b\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(872)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8722)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041c\u0430\u0445\u0430\u0447\u043a\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87230)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0421\u0435\u0440\u0433\u043e\u043a\u0430\u043b\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87231)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0425\u0430\u0441\u0430\u0432\u044e\u0440\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87232)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041a\u0430\u0440\u0430\u0431\u0443\u0434\u0430\u0445\u043a\u0435\u043d\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87233)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0425\u0443\u043d\u0437\u0430\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87234)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041a\u0438\u0437\u0438\u043b\u044e\u0440\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87235)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041c\u0430\u0433\u0430\u0440\u0430\u043c\u043a\u0435\u043d\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87236)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041a\u0430\u0441\u0443\u043c\u043a\u0435\u043d\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87237)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0411\u0443\u0439\u043d\u0430\u043a\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87238)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041c\u0430\u0434\u0436\u0430\u043b\u0438\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87239)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041a\u0438\u0437\u043b\u044f\u0440",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87240)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0414\u0435\u0440\u0431\u0435\u043d\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87242)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041d\u043e\u0432\u043e\u043b\u0430\u043a\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87243)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: [ "\u0422\u043f\u0438\u0433", "\u0410\u0433\u0443\u043b" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(87244)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0425\u0438\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87245)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0418\u0437\u0431\u0435\u0440\u0431\u0430\u0448",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87246)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041a\u0430\u0441\u043f\u0438\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87247)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0411\u0430\u0431\u0430\u044e\u0440\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87248)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041d\u043e\u0432\u043e\u043a\u0430\u044f\u043a\u0435\u043d\u0442",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87249)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0425\u0443\u0447\u043d\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87252)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041b\u0435\u0432\u0430\u0448\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87254)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0423\u0440\u043a\u0430\u0440\u0430\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87255)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0413\u0435\u0440\u0433\u0435\u0431\u0438\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87256)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0422\u0435\u0440\u0435\u043a\u043b\u0438-\u041c\u0435\u043a\u0442\u0435\u0431",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87257)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0423\u043d\u0446\u0443\u043a\u0443\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87258)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0413\u0443\u043d\u0438\u0431",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87259)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0425\u0435\u0431\u0434\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87260)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0410\u043a\u0443\u0448\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87261)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0422\u0430\u0440\u0443\u043c\u043e\u0432\u043a\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87262)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041a\u0443\u0440\u0430\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87263)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0410\u0445\u0442\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87264)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0420\u0443\u0442\u0443\u043b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87265)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0422\u043b\u044f\u0440\u0430\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87266)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0426\u0443\u0440\u0438\u0431",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87267)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041a\u0443\u043c\u0443\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87268)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0412\u0430\u0447\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87271)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0411\u043e\u0442\u043b\u0438\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87272)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u041c\u0435\u0445\u0435\u043b\u044c\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87273)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0410\u0433\u0432\u0430\u043b\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87274)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0411\u0435\u0436\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87275)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d\u0441\u043a\u0438\u0435 \u041e\u0433\u043d\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87276)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u042e\u0436\u043d\u043e-\u0421\u0443\u0445\u043e\u043a\u0443\u043c\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87279)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0414\u0430\u0433\u0435\u0441\u0442\u0430\u043d",
                city: "\u0414\u044b\u043b\u044b\u043c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(873)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0418\u043d\u0433\u0443\u0448\u0435\u0442\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8732)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0418\u043d\u0433\u0443\u0448\u0435\u0442\u0438\u044f",
                city: "\u041d\u0430\u0437\u0440\u0430\u043d\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87341)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0418\u043d\u0433\u0443\u0448\u0435\u0442\u0438\u044f",
                city: "\u041e\u0440\u0434\u0436\u043e\u043d\u0438\u043a\u0438\u0434\u0437\u0435\u0432\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87342)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0418\u043d\u0433\u0443\u0448\u0435\u0442\u0438\u044f",
                city: "\u041c\u0430\u043b\u0433\u043e\u0431\u0435\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87343)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0418\u043d\u0433\u0443\u0448\u0435\u0442\u0438\u044f",
                city: "\u0414\u0436\u0435\u0439\u0440\u0430\u0445",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87344)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0418\u043d\u0433\u0443\u0448\u0435\u0442\u0438\u044f",
                city: "\u041a\u0430\u0440\u0430\u0431\u0443\u043b\u0430\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87345)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0418\u043d\u0433\u0443\u0448\u0435\u0442\u0438\u044f",
                city: "\u041c\u0430\u0433\u0430\u0441",
                operator: "",
                desc: ""
            }, {
                mask: "+7(877)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8772)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "\u041c\u0430\u0439\u043a\u043e\u043f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87770)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "\u041a\u043e\u0448\u0435\u0445\u0430\u0431\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87771)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "\u0422\u0430\u0445\u0442\u0430\u043c\u0443\u043a\u0430\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87772)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "\u0410\u0434\u044b\u0433\u0435\u0439\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87773)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "\u0425\u0430\u043a\u0443\u0440\u0438\u043d\u043e\u0445\u0430\u0431\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87777)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "\u0422\u0443\u043b\u044c\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87778)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "\u041a\u0440\u0430\u0441\u043d\u043e\u0433\u0432\u0430\u0440\u0434\u0435\u0439\u0441\u043a\u043e\u0435",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87779)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0410\u0434\u044b\u0433\u0435\u044f",
                city: "\u0413\u0438\u0430\u0433\u0438\u043d\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(878)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8782)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u0427\u0435\u0440\u043a\u0435\u0441\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87870)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u0410\u0434\u044b\u0433\u0435-\u0425\u0430\u0431\u043b\u044c",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87872)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: [ "\u0422\u0435\u0431\u0435\u0440\u0434\u0430", "\u0414\u043e\u043c\u0431\u0430\u0439" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7(87873)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u0425\u0430\u0431\u0435\u0437",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87874)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u041a\u0430\u0432\u043a\u0430\u0437\u0441\u043a\u0438\u0439",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87875)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u0423\u0441\u0442\u044c-\u0414\u0436\u0435\u0433\u0443\u0442\u0430",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87876)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u041f\u0440\u0435\u0433\u0440\u0430\u0434\u043d\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87877)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u0423\u0447\u043a\u0435\u043a\u0435\u043d",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87878)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u0417\u0435\u043b\u0435\u043d\u0447\u0443\u043a\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87879)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0427\u0435\u0440\u043a\u0435\u0441\u0438\u044f",
                city: "\u041a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(879)###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87922)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041c\u0438\u043d\u0435\u0440\u0430\u043b\u044c\u043d\u044b\u0435 \u0412\u043e\u0434\u044b",
                operator: "",
                desc: ""
            }, {
                mask: "+7(8793)##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041f\u044f\u0442\u0438\u0433\u043e\u0440\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87932)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0416\u0435\u043b\u0435\u0437\u043d\u043e\u0432\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87934)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u0441\u0441\u0435\u043d\u0442\u0443\u043a\u0438",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87935)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041b\u0435\u0440\u043c\u043e\u043d\u0442\u043e\u0432",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87937)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0438\u0441\u043b\u043e\u0432\u043e\u0434\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87938)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041d\u043e\u0432\u043e\u043f\u0430\u0432\u043b\u043e\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87951)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0413\u0435\u043e\u0440\u0433\u0438\u0435\u0432\u0441\u043a",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87961)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u0415\u0441\u0441\u0435\u043d\u0442\u0443\u043a\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(87964)#-##-##",
                cc: "RU",
                cd: "Russia",
                region: "\u0421\u0442\u0430\u0432\u0440\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u043a\u0440\u0430\u0439",
                city: "\u041a\u0443\u0440\u0441\u043a\u0430\u044f",
                operator: "",
                desc: ""
            }, {
                mask: "+7(9##)###-##-##",
                cc: "RU",
                cd: "Russia",
                type: "mobile"
            } ]
        }
    }), Inputmask;
});