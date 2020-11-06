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

testProp(
	"fmap",
	[fc.option(fc.string())],
	n => F.fmap(R.identity, n) === n
);

testProp(
	"fmap2 - liftA2",
	[arbInt(), arbInt()],
	([a, ma], [b, mb]) => {
		return R.pipe(
			F.fmap2(R.add),
			checkMaybe(R.add(a, b))
		)(ma, mb);
	}
);

testProp(
	"fmap3 - liftA3",
	[arbInt(), arbInt(), arbInt()],
	([a, ma], [b, mb], [c, mc]) => {
		const f = R.curry((a, b, c) => a + b + c);

		return R.pipe(
			F.fmap3(f),
			checkMaybe(f(a, b, c))
		)(ma, mb, mc);
	}
);

testProp(
	"fmap4 - liftA4",
	[arbInt(), arbInt(), arbInt(), arbInt()],
	([a, ma], [b, mb], [c, mc], [d, md]) => {
		const f = R.curry((a, b, c, d) => a + b + c + d);

		return R.pipe(
			F.fmap4(f),
			checkMaybe(f(a, b, c, d))
		)(ma, mb, mc, md);
	}
);

testProp(
	"fmap5 - liftA5",
	[arbInt(), arbInt(), arbInt(), arbInt(), arbInt()],
	([a, ma], [b, mb], [c, mc], [d, md], [e, me]) => {
		const f = R.curry((a, b, c, d, e) => a + b + c + d + e);

		return R.pipe(
			F.fmap5(f),
			checkMaybe(f(a, b, c, d, e))
		)(ma, mb, mc, md, me);
	}
);

testProp(
	"fmap6 - liftA6",
	mkArbIntN(6),
	(
		[a1, m1],
		[a2, m2],
		[a3, m3],
		[a4, m4],
		[a5, m5],
		[a6, m6]
	) => {
		const f = R.curryN(6, adds);

		return R.pipe(
			F.fmap6(f),
			checkMaybe(f(a1, a2, a3, a4, a5, a6))
		)(m1, m2, m3, m4, m5, m6);
	}
);

testProp(
	"fmap8 - liftA8",
	mkArbIntN(8),
	(
		[a1, m1],
		[a2, m2],
		[a3, m3],
		[a4, m4],
		[a5, m5],
		[a6, m6],
		[a7, m7],
		[a8, m8],
	) => {
		const f = R.curryN(8, adds);

		return R.pipe(
			F.fmap8(f),
			checkMaybe(f(a1, a2, a3, a4, a5, a6, a7, a8))
		)(m1, m2, m3, m4, m5, m6, m7, m8);
	}
);

testProp(
	"fmap9 - liftA9",
	mkArbIntN(9),
	(
		[a1, m1],
		[a2, m2],
		[a3, m3],
		[a4, m4],
		[a5, m5],
		[a6, m6],
		[a7, m7],
		[a8, m8],
		[a9, m9]
	) => {
		const f = R.curryN(9, adds);

		return R.pipe(
			F.fmap9(f),
			checkMaybe(f(a1, a2, a3, a4, a5, a6, a7, a8, a9))
		)(m1, m2, m3, m4, m5, m6, m7, m8, m9);
	}
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
