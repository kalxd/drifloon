const R = require("ramda");
const Most = require("most");

const F = require("./drifloon/function");
const GM = require("./drifloon/gm");
const N = require("./drifloon/node");
const E = require("./drifloon/error");

const M = {
	R,
	Most,

	N,
	F,
	GM,
	E
};

module.exports = M;
