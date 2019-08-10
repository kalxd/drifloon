const R = require("ramda");
const Most = require("most");
const DOM = require("@cycle/dom");
const isolate = require("@cycle/isolate");

const Run = require("./drifloon/run");
const F = require("./drifloon/function");
const GM = require("./drifloon/gm");

const M = {
	R,
	Most,
	DOM,
	isolate,
	...Run,
	F,
	GM
};

module.exports = M;
