const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");
const DOM = require("@cycle/dom");

const { V } = require("../main");

// v1 :: View
const v1 = DOM.div("hello")

// v2 :: View
const v2 = DOM.div("world");

testProp(
	"guard & only",
	[fc.boolean(), fc.constantFrom(v1, v2)],
	b => {
		const v = V.guard(b, R.always(v1));

		if (b) {
			return v === v1;
		}
		else {
			return R.isNil(v);
		}
	}
);


testProp(
	"select & select_",
	[
		fc.object({
			maxDepth: 0,
			key: fc.hexaString(),
			values: [fc.boolean()]
		})
	],
	o => {
		const css = V.select("", o);

		return R.pipe(
			R.split("."),
			R.drop(1),
			R.all(R.flip(R.prop)(o))
		)(css);
	}
);
