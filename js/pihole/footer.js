// User menu toggle
$("#dropdown-menu a").on("click", function(event) {
    $(this).parent().toggleClass("open");
});
$("body").on("click", function(event) {
    if(!$("#dropdown-menu").is(event.target) && $("#dropdown-menu").has(event.target).length === 0) {
        $("#dropdown-menu").removeClass("open");
    }
});

var piholeVersion = $("#piholeVersion").html();
var webVersion = $("#webVersion").html();

// Credit for following function: https://gist.github.com/alexey-bass/1115557
function versionCompare(left, right) {
    if (typeof left + typeof right != 'stringstring')
        return false;

    var a = left.split('.')
        ,   b = right.split('.')
        ,   i = 0, len = Math.max(a.length, b.length);

    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }

    return 0;
}

// Update check
$.getJSON("https://api.github.com/repos/pi-hole/pi-hole/releases/latest", function(json) {
    if(versionCompare(piholeVersion, json.tag_name.slice(1)) < 0) {
        // Alert user
        $("#alPiholeUpdate").show();
        if(!$("#dropdown-menu").hasClass("open")) {
            $("#dropdown-menu").addClass("open");
        }
    }
});
$.getJSON("https://api.github.com/repos/pi-hole/AdminLTE/releases/latest", function(json) {
    if(versionCompare(webVersion, json.tag_name.slice(1)) < 0) {
        // Alert user
        $("#alWebUpdate").show();
        if(!$("#dropdown-menu").hasClass("open")) {
            $("#dropdown-menu").addClass("open");
        }
    }
});

/*
 * Make sure that Pi-hole is updated to at least v2.6.4, since that is needed to use the sudo
 * features of the interface
 */
if(versionCompare(piholeVersion, "v2.6.4") < 0)
    alert("Pi-hole needs to be updated to at least v2.6.4 before you can use features such as whitelisting/blacklisting from this web interface!")
