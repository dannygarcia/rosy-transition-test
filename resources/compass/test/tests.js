var cwd = process.cwd(),
	fs = require("fs"),
	cp = require("child_process"),
	path = require("path");

var compass = require("./lib/compass"),
	caboose = path.join(cwd, "test", "caboose");

describe("Base", function () {
	compass.buildTests(path.join(caboose, "caboose"));
});

describe("Mixins", function () {
	compass.buildTests(path.join(caboose, "mixins"));
});

describe("Placeholders", function () {
	compass.buildTests(path.join(caboose, "placeholders"));
});

describe("Rosy", function () {
	compass.buildTests(path.join(caboose, "rosy"));
});

describe("Project", function () {
	compass.buildTests(path.join(cwd, "test", "project"));
});
