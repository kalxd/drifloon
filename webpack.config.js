const path = require("path");

const config = {
	mode: "development",
	target: "web",
	entry: "./src/main.ts",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	}
};

module.exports = config;
