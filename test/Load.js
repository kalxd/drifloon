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

testProp(
	"Monad(Left identity): return a >>= f = f a",
	[fc.integer()],
	n => {
		const f = Load.pure;

		const a = R.pipe(
			Load.pure,
			Load.bind(f)
		)(n);

		const b = f(n);

		R.equals(a, b);
	}
);

testProp(
	"Monad(Right identity): m >>= return = m",
	[gen()],
	s => {
		const ss = Load.bind(Load.pure, s);
		return R.equals(s, ss);
	}
);

testProp(
	"Monad(associativity): (m >>= f) >>= g = m >>= (\\x -> f x >>= g)",
	[gen()],
	s => {
		const f = Load.pure;
		const g = Load.pure;

		const a = R.pipe(
			Load.bind(f),
			Load.bind(g)
		)(s);

		const b = Load.bind(
			x => Load.bind(g, f(x)),
			s
		);

		return R.equals(a, b);
	}
);
