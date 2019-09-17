const R = require("ramda");
const Rx = require("rxjs");
const Ro = require("rxjs/operators");
const DOM = require("@cycle/dom");
const I = require("@cycle/isolate");

const Run = require("./drifloon/run");
const F = require("./drifloon/function");
const GM = require("./drifloon/gm");
const E = require("./drifloon/element");

const M = {
	R,
	Rx,
	Ro,
	DOM,
	I,
	...Run,
	F,
	GM,
	E
};

module.exports = M;
