var webpage = require("webpage"),
    fs = require("fs");

var html_path = fs.absolute("test.html");
var examples = [];

function run_example(example_index) {
  if (example_index >= examples.length) {
    phantom.exit(0);
    return;
  }

  var example = examples[example_index];
  var snapshot_index = 0;
  var page = webpage.create();

  page.viewportSize = { width: 500, height: 300 };
  page.clipRect = { width: 500, height: 300 };
  page.onAlert = function (msg) {
    var e = JSON.parse(msg);
    if (e.fn == "snapshot") {
      page.render("output/" + example.name + snapshot_index + ".png");
      snapshot_index += 1;
    } else if (e.fn == "mousemove") {
      page.sendEvent("mousemove", e.x, e.y);
    }
  };

  page.open(html_path, function (status) {
    if (status == "fail") {
      console.log("Failed to load test page: " + example.name);
      phantom.exit(1);
    } else {
      page.evaluate(example.runner);
    }
    page.close();
    run_example(example_index + 1);
  });
}

exports.def = function (name, runner) {
  examples.push({ name: name, runner: runner });
};

exports.run = function () {
  if (fs.isDirectory("output")) {
    fs.list("output").forEach(function (path) {
      if (path != "." && path != "..") {
        fs.remove("output/" + path);
      }
    });
  } else {
    fs.makeDirectory("output");
  }
  run_example(0);
};
