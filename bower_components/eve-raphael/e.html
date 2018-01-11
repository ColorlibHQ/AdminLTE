<!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8">
    <title>Eve Use Case</title>
    <script src="eve.js"></script>
    <script>
        var log = function (text) {
            log.log = log.log || [];
            log.log.push(text);
        };
        window.onload = function () {
            document.getElementById("res").innerHTML = log.log.join("<br>");
        };
    </script>
    <script>
        var f1, f2, f3, f4;

        // setting up listeners
        eve.on("hit", f1 = function () {
            log("   I’m hit!");
        });
        eve.on("hit/face", f2 = function () {
            log("   Oh, my face!");
        });
        eve.on("hit/chest", f3 = function () {
            log("   Oh, my chest!");
        });
        eve.on("hit/*/leg", f4 = function () {
            log("   Ouch!");
        });
        eve.once("hit", function () {
            log("   You scoundrel!");
        })(-1);
        
        // fire events
        log("In your face!");
        eve("hit/face");
        // I’m hit!
        // Oh, my face!
        log("Take that!");
        // You can use “.” or “/” as delimiter
        eve("hit.chest.leg");
        // I’m hit!
        // Oh, my chest!
        // Ouch!

        // Unbinding
        log("");
        eve.unbind("hit", f3);
        log("Take that!");
        eve("hit.chest.leg");
        // I’m hit!
        // Ouch!

        // Unbinding by wildcard
        log("");
        eve.unbind("hit/*");
        log("In your face!");
        eve("hit.face");
        // I’m hit!
        log("Take that!");
        eve("hit.chest.leg");
        // I’m hit!
    </script>
    <pre id="res"></pre>
</html>
