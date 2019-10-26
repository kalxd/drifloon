const R = require("ramda");
const Most = require("most");
const DOM = require("@cycle/dom");

const F = require("./drifloon/function");
const GM = require("./drifloon/gm");
const Z = require("./drifloon/zoo");
const S = require("./drifloon/stream");
const V = require("./drifloon/vnode");

const Run = require("./drifloon/run");

const M = {
	R,
	Most,
	DOM,

	Z,
	V,
	F,
	GM,
	S,

	...Run
};

module.exports = M;
