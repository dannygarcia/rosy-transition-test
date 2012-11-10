var Mocha = require("mocha");

var mocha = new Mocha({
	setup : "bdd",
	reporter : "spec",
	timeout : 10000
});

mocha.addFile("test/tests.js");

var runner = mocha.run();
