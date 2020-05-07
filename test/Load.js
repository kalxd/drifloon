const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");

const { Load } = require("../main");

// genEmpty :: () -> Arbitraty (LoadState Int)
const genEmpty = () => fc.constant(Load.empty);

// genLoad :: () -> Arbitraty (LoadState Int)
const genLoad = () => {
	return fc.integer()
		.map(Load.pure)
	;
};

testProp(
	"fmap id = id",
	[genEmpty(), genLoad()],
	(s1, s2) => {
		const f = Load.fmap(R.identity);
		return R.equals(f(s1), s1) && R.equals(f(s2), s2);
	}
);

testProp(
	"fmap f . g = fmap f . fmap g",
	[genEmpty(), genLoad()],
	(s1, s2) => {
		const h1 = Load.fmap(
			R.compose(
				R.dec,
				R.inc
			)
		);
		const h2 = R.compose(
			Load.fmap(R.dec),
			Load.fmap(R.inc)
		);

		return R.equals(h1(s1), h2(s1)) && R.equals(h1(s2), h2(s2));
	}
);
