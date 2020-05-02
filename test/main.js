const { testProp, fc } = require("ava-fast-check");

testProp(
	"test one",
	[fc.nat()],
	a => a === a
);
