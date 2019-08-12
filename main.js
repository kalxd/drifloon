const R = require("ramda");
const RX = require("rxjs");
const RO = require("rxjs/operators");
const DOM = require("@cycle/dom");
const I = require("@cycle/isolate");

const Run = require("./drifloon/run");
const F = require("./drifloon/function");
const GM = require("./drifloon/gm");
const E = require("./drifloon/element");

const M = {
	R,
	RX,
	RO,
	DOM,
	I,
	...Run,
	F,
	GM,
	E
};

module.exports = M;
