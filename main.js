const R = require("ramda");
const Rx = require("rxjs");
const Ro = require("rxjs/operators");
const Http = require("rxjs/ajax");
const DOM = require("@cycle/dom");
const I = require("@cycle/isolate").default;

const Run = require("./drifloon/run");
const F = require("./drifloon/function");
const GM = require("./drifloon/gm");
const Element = require("./drifloon/element");
const E = require("./drifloon/error");

const M = {
	R,
	Rx,
	Ro,
	Http,
	DOM,
	I,
	...Run,
	...Element,
	F,
	GM,
	E
};

module.exports = M;
