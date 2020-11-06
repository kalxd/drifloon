const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");
const Most = require("most");

const { F } = require("../main");

// checkMaybe :: Eq a => a -> Maybe a -> Bool
const checkMaybe = R.curry((a, ma) => {
	if (R.isNil(ma)) {
		true
	}
	else {
		return a === ma;
	}
});

// arbInt :: () -> Arbitraty (Int, Maybe Int)
const arbInt = () => {
	return fc.integer()
		.chain(a => {
			return fc.constantFrom(null, a)
				.map(ma => ([a, ma]))
			;
		})
	;
};

// mkArbIntN :: Int -> [() -> Arbitraty (Int, Maybe Int)]
const mkArbIntN = R.times(arbInt);

const adds = (...ns) => R.sum(ns);

const checkFmap = (f, inputs) => {
	const N = inputs.length;
	const as = R.map(R.head, inputs);
	const ms = R.map(R.last, inputs);
	const g = R.curryN(N, adds);

	const r1 = g(...as);
	const r2 = f(g, ...ms);
	return checkMaybe(r1, r2);
};

testProp(
	"fmap",
	[fc.option(fc.string())],
	n => F.fmap(R.identity, n) === n
);

testProp(
	"fmap2 - liftA2",
	mkArbIntN(2),
	(...inputs) => checkFmap(F.fmap2, inputs)
);

testProp(
	"fmap3 - liftA3",
	mkArbIntN(3),
	(...inputs) => checkFmap(F.fmap3, inputs)
);

testProp(
	"fmap4 - liftA4",
	mkArbIntN(4),
	(...inputs) => checkFmap(F.fmap4, inputs)
);

testProp(
	"fmap5 - liftA5",
	mkArbIntN(5),
	(...inputs) => checkFmap(F.fmap5, inputs)
);

testProp(
	"fmap6 - liftA6",
	mkArbIntN(6),
	(...inputs) => checkFmap(F.fmap6, inputs)
);

testProp(
	"fmap7 - liftA7",
	mkArbIntN(7),
	(...inputs) => checkFmap(F.fmap7, inputs)
);

testProp(
	"fmap8 - liftA8",
	mkArbIntN(8),
	(...inputs) => checkFmap(F.fmap8, inputs)
);

testProp(
	"fmap9 - liftA9",
	mkArbIntN(9),
	(...inputs) => checkFmap(F.fmap9, inputs)
);

testProp(
	"fmap7 - liftA7",
	mkArbIntN(7),
	(
		[a1, m1],
		[a2, m2],
		[a3, m3],
		[a4, m4],
		[a5, m5],
		[a6, m6],
		[a7, m7]
	) => {
		const f = R.curryN(7, adds);

		return R.pipe(
			F.fmap7(f),
			checkMaybe(f(a1, a2, a3, a4, a5, a6, a7))
		)(m1, m2, m3, m4, m5, m6, m7);
	}
);
testProp(
	"traverse",
	[
		fc.option(fc.integer()),
		fc.array(fc.string()).filter(R.complement(R.isEmpty))
	],
	(n, xs) => {
		const f = R.always(n);
		const ys = F.traverse(f, xs);

		if (R.isNil(n) && R.isNil(ys)) {
			return true;
		}
		else {
			return R.all(R.equals(n), ys);
		}
	}
);

testProp(
	"isJust",
	[
		fc.integer(),
		fc.object(),
		fc.string(),
		fc.array(fc.anything()),
		fc.constantFrom(undefined, null)
	],
	(a, b, c, d, e) => {
		return F.isJust(a) && F.isJust(b) && F.isJust(c) && F.isJust(d) && !F.isJust(e);
	}
);

testProp(
	"maybe",
	[fc.option(fc.integer()), fc.integer()],
	(ma, b) => {
		const c = F.maybe(b, R.identity, ma);

		if (R.isNil(ma)) {
			return c === b;
		}
		else {
			return c === ma;
		}
	}
);

testProp(
	"maybeElse",
	[fc.option(fc.integer()), fc.integer(), fc.integer()],
	(ma, b, c) => {
		const x = F.maybeElse(b, c, ma);

		if (R.isNil(ma)) {
			return x === b;
		}
		else {
			return x === c;
		}
	}
);

testProp(
	"maybeOr",
	[fc.option(fc.integer()), fc.integer()],
	(ma, a) => {
		const v = F.maybeOr(a, ma);
		if (R.isNil(ma)) {
			return v === a;
		}
		else {
			return v === ma;
		}
	}
);

testProp(
	"makeValue",
	[fc.string(), fc.array(fc.integer())],
	(init, xs) => {
		const f = F.makeValue(init);
		const g = x => {
			f(x);
			return x === f(x);
		};

		return R.all(g, xs);
	}
);

testProp(
	"genValue",
	[
		fc.integer(),
		fc.array(fc.option(fc.integer()))
	],
	(init, xs) => {
		const f = F.genValue(R.always(init));

		const g = x => {
			f(x);
			if (R.isNil(x)) {
				return f() === init;
			}
			else {
				return f() === x;
			}
		};

		return R.all(g, xs);
	}
);
