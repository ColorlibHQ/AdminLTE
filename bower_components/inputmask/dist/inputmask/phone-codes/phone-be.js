/*!
* phone-codes/phone-be.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.10
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "../inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("../inputmask")) : factory(window.Inputmask);
}(function(Inputmask) {
    return Inputmask.extendAliases({
        phonebe: {
            alias: "abstractphone",
            countrycode: "32",
            phoneCodes: [ {
                mask: "+32(53)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Aalst (Alost)"
            }, {
                mask: "+32(3)###-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Antwerpen (Anvers)"
            }, {
                mask: "+32(63)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Arlon"
            }, {
                mask: "+32(67)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Ath"
            }, {
                mask: "+32(50)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Brugge (Bruges)"
            }, {
                mask: "+32(2)###-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Brussel/Bruxelles (Brussels)"
            }, {
                mask: "+32(71)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Charleroi"
            }, {
                mask: "+32(60)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Chimay"
            }, {
                mask: "+32(83)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Ciney"
            }, {
                mask: "+32(52)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Dendermonde"
            }, {
                mask: "+32(13)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Diest"
            }, {
                mask: "+32(82)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Dinant"
            }, {
                mask: "+32(86)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Durbuy"
            }, {
                mask: "+32(89)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Genk"
            }, {
                mask: "+32(9)###-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Gent (Gand)"
            }, {
                mask: "+32(11)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Hasselt"
            }, {
                mask: "+32(14)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Herentals"
            }, {
                mask: "+32(85)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Huy (Hoei)"
            }, {
                mask: "+32(64)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "La Louvière"
            }, {
                mask: "+32(16)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Leuven (Louvain)"
            }, {
                mask: "+32(61)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Libramont"
            }, {
                mask: "+32(4)###-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Liège (Luik)"
            }, {
                mask: "+32(15)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Mechelen (Malines)"
            }, {
                mask: "+32(46#)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Mobile Phones"
            }, {
                mask: "+32(47#)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Mobile Phones"
            }, {
                mask: "+32(48#)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Mobile Phones"
            }, {
                mask: "+32(49#)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Mobile Phones"
            }, {
                mask: "+32(461)8#-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "GSM-R (NMBS)"
            }, {
                mask: "+32(65)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Mons (Bergen)"
            }, {
                mask: "+32(81)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Namur (Namen)"
            }, {
                mask: "+32(58)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Nieuwpoort (Nieuport)"
            }, {
                mask: "+32(54)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Ninove"
            }, {
                mask: "+32(67)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Nivelles (Nijvel)"
            }, {
                mask: "+32(59)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Oostende (Ostende)"
            }, {
                mask: "+32(51)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Roeselare (Roulers)"
            }, {
                mask: "+32(55)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Ronse"
            }, {
                mask: "+32(80)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Stavelot"
            }, {
                mask: "+32(12)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Tongeren (Tongres)"
            }, {
                mask: "+32(69)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Tounai"
            }, {
                mask: "+32(14)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Turnhout"
            }, {
                mask: "+32(87)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Verviers"
            }, {
                mask: "+32(58)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Veurne"
            }, {
                mask: "+32(19)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Wareme"
            }, {
                mask: "+32(10)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Wavre (Waver)"
            }, {
                mask: "+32(50)##-##-##",
                cc: "BE",
                cd: "Belgium",
                city: "Zeebrugge"
            } ]
        }
    }), Inputmask;
});