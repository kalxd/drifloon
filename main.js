const R = require("ramda");
const Most = require("most");
const DOM = require("@cycle/dom");

const F = require("./drifloon/function");
const GM = require("./drifloon/gm");
const N = require("./drifloon/node");
const E = require("./drifloon/error");

const Run = require("./drifloon/run");

const M = {
	R,
	Most,
	DOM,

	N,
	F,
	GM,
	E,

	...Run
};

module.exports = M;
