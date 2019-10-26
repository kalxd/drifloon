const R = require("ramda");
const Most = require("most");
const DOM = require("@cycle/dom");

const F = require("./drifloon/function");
const GM = require("./drifloon/gm");
const N = require("./drifloon/node");
const S = require("./drifloon/stream");

const Run = require("./drifloon/run");

const M = {
	R,
	Most,
	DOM,

	N,
	F,
	GM,
	S,

	...Run
};

module.exports = M;
