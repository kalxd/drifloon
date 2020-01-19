const View = require("./view");
const Event = require("./event");
const Load = require("./load");

module.exports = {
	...View,
	...Event,
	Load
};
