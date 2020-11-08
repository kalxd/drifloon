const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");
const DOM = require("@cycle/dom");

const { V } = require("../main");

// genDiv :: () -> View
const genDiv = () => {
	return fc.string()
		.map(s => DOM.div(s))
	;
};

testProp(
	"guard",
	[fc.boolean(), genDiv()],
	(t, b, div) => {
		const v = V.guard(R.always(div), b);

		if (b) {
			t.deepEqual(v, div);
		}
		else {
			t.falsy(v);
		}
	}
);

testProp(
	"only",
	[fc.boolean(), genDiv()],
	(t, b, div) => {
		const v = V.only(div, b);
		if (b) {
			t.deepEqual(v, div);
		}
		else {
			t.falsy(v);
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
	(t, o) => {
		const css = V.select("", o);

		const r = R.pipe(
			R.split("."),
			R.drop(1),
			R.all(R.flip(R.prop)(o))
		)(css);

		t.true(r);
	}
);
