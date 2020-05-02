const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");

const { F } = require("../main");

testProp(
	"fmap",
	[fc.option(fc.string())],
	n => F.fmap(R.identity, n) === n
);
