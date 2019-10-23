const R = require("ramda");
const Rx = require("rxjs");
const Ro = require("rxjs/operators");
const Http = require("rxjs/ajax");

const F = require("./drifloon/function");
const GM = require("./drifloon/gm");
const N = require("./drifloon/node");
const E = require("./drifloon/error");

const M = {
	R,
	Rx,
	Ro,
	Http,
	I,

	N,
	F,
	GM,
	E
};

module.exports = M;
