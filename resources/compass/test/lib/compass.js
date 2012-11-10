var cp = require("child_process");
var fs = require("fs");
var path = require("path");

module.exports = {
	compile : function (dir, callback) {
		var cwd = process.cwd(),
			importPath = path.join(cwd, "scss", "caboose");

		var child = cp.spawn("compass", [
			"compile",
			"-I", importPath,
			"--sass-dir", dir,
			"--css-dir", dir,
			"--images-dir", path.join(importPath, "rosy/google-chrome-frame/images"),
			"--no-line-comments",
			"--force"
		], {
			stdio: "pipe"
		});

		child.on("exit", function (code) {
			callback();
		});
	},

	buildTests : function (dir) {
		var expect = require("expect.js"),
			globber = require("glob-whatev");

		before(function (done) {
			this.compile(dir, done);
		}.bind(this));

		var cases = globber.glob(path.join(dir, "**", "*.scss")).filter(function (file) {
			return !(/^_/).test(path.basename(file));
		}).map(function (file) {
			return file.replace(".scss", "");
		});

		cases.forEach(function (file) {
			var cssPath = path.join(file) + ".css";
			var expectedPath = path.join(file) + ".expected.css";

			it(file.replace(path.dirname(dir) + "/", "") + ".scss", function (done) {
				expect(fs.existsSync(cssPath)).to.be.ok();
				var actual = fs.readFileSync(cssPath, "utf8").split("\n");

				expect(fs.existsSync(expectedPath)).to.be.ok();
				var expected = fs.readFileSync(expectedPath, "utf8").split("\n");

				expect(actual).to.eql(expected);

				done();
			});
		});

	}
};
