const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");

const { Load } = require("../main");

// gen :: Aribitraty (LoadState Int)
const gen = () => {
	return fc.boolean()
		.chain(b => {
			if (b) {
				return fc.constant(Load.empty);
			}
			else {
				return fc.integer().map(Load.pure);
			}
		})
	;
};

testProp(
	"fmap id = id",
	[gen()],
	s => {
		const f = Load.fmap(R.identity);
		return R.equals(s, f(s));
	}
);

testProp(
	"fmap f . g = fmap f . fmap g",
	[gen()],
	s => {
		const f = R.inc;
		const g = R.add(10);

		const h1 = Load.fmap(
			R.compose(f, g)
		);
		const h2 = R.compose(
			Load.fmap(f),
			Load.fmap(g)
		);

		return R.equals(h1(s), h2(s));
	}
);
