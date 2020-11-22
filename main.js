const R = require("rambda");
const Most = require("most");
const DOM = require("@cycle/dom");

const F = require("./drifloon/function");
const GX = require("./drifloon/gm");
const Z = require("./drifloon/zoo");
const S = require("./drifloon/stream");
const V = require("./drifloon/vnode");
const State = require("./drifloon/state");
const Load = require("./drifloon/load");
const C = require("./drifloon/comfey");
const struct = require("./drifloon/struct");

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
	Load,
	C,

	struct,

	...Run
};

module.exports = M;
