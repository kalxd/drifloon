const R = require("rambda");
const Most = require("most");
const DOM = require("@cycle/dom");

const F = require("./drifloon/function");
const GX = require("./drifloon/gm");
const Z = require("./drifloon/zoo");
const S = require("./drifloon/stream");
const V = require("./drifloon/vnode");
const State = require("./drifloon/state");
const C = require("./drifloon/comfey");
const Data = require("./drifloon/data");

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
	C,
	Data,

	...Run
};

module.exports = M;
