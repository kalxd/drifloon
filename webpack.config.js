const path = require("path");
const pkg = require("./package.json");

const config = {
	entry: "./main",
	mode: "production",
	output: {
		path: path.resolve("./dist"),
		filename: `drifloon.${pkg.version}.js`,
		library: "M",
		libraryTarget: "umd2"
	}
};

module.exports = config;
