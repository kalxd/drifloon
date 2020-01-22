const R = require("ramda");
const Most = require("most");
const DOM = require("@cycle/dom");

const F = require("./drifloon/function");
const GX = require("./drifloon/gm");
const Z = require("./drifloon/zoo");
const S = require("./drifloon/stream");
const V = require("./drifloon/vnode");
const State = require("./drifloon/state");
const X = require("./drifloon/extra");

const Run = require("./drifloon/run");

const M = {
	R,
	Most,
	DOM,

	Z,
	V,
	F,
	GX,
	S,
	State,
	X,

	...Run
};

module.exports = M;
