const { testProp, fc } = require("ava-fast-check");
const R = require("rambda");
const Most = require("most");

const { F } = require("../main");

// checkMaybe :: Eq a => a -> Maybe a -> Bool
const checkMaybe = R.curry((a, ma) => {
	if (R.isNil(ma)) {
		return true
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
	(t, n) => t.true(F.fmap(R.identity, n) === n)
);

testProp(
	"fmap2 - liftA2",
	mkArbIntN(2),
	(t, ...inputs) => t.true(checkFmap(F.fmap2, inputs))
);

testProp(
	"fmap3 - liftA3",
	mkArbIntN(3),
	(t, ...inputs) => t.true(checkFmap(F.fmap3, inputs))
);

testProp(
	"fmap4 - liftA4",
	mkArbIntN(4),
	(t, ...inputs) => t.true(checkFmap(F.fmap4, inputs))
);

testProp(
	"fmap5 - liftA5",
	mkArbIntN(5),
	(t, ...inputs) => t.true(checkFmap(F.fmap5, inputs))
);

testProp(
	"fmap6 - liftA6",
	mkArbIntN(6),
	(t, ...inputs) => t.true(checkFmap(F.fmap6, inputs))
);

testProp(
	"fmap7 - liftA7",
	mkArbIntN(7),
	(t, ...inputs) => t.true(checkFmap(F.fmap7, inputs))
);

testProp(
	"fmap8 - liftA8",
	mkArbIntN(8),
	(t, ...inputs) => t.true(checkFmap(F.fmap8, inputs))
);

testProp(
	"fmap9 - liftA9",
	mkArbIntN(9),
	(t, ...inputs) => t.true(checkFmap(F.fmap9, inputs))
);

testProp(
	"traverse",
	[
		fc.option(fc.integer()),
		fc.array(fc.string()).filter(R.complement(R.isEmpty))
	],
	(t, n, xs) => {
		const f = R.always(n);
		const ys = F.traverse(f, xs);

		if (R.isNil(n) && R.isNil(ys)) {
			return t.pass();
		}
		else {
			return t.true(R.all(R.equals(n), ys));
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
	(t, a, b, c, d, e) => {
		const result = F.isJust(a) && F.isJust(b) && F.isJust(c) && F.isJust(d) && !F.isJust(e);
		return t.true(result);
	}
);

testProp(
	"maybe",
	[fc.option(fc.integer()), fc.integer()],
	(t, ma, b) => {
		const c = F.maybe(b, R.identity, ma);

		if (R.isNil(ma)) {
			t.true(c === b);
		}
		else {
			t.true(c === ma);
		}
	}
);

testProp(
	"maybeElse",
	[fc.option(fc.integer()), fc.integer(), fc.integer()],
	(t, ma, b, c) => {
		const x = F.maybeElse(b, c, ma);

		if (R.isNil(ma)) {
			t.true(x === b);
		}
		else {
			t.true(x === c);
		}
	}
);

testProp(
	"_fst lens",
	[fc.tuple(fc.nat(), fc.string())],
	(t, xs) => {
		const fst = R.view(F._fst, xs);
		return t.true(fst === xs[0]);
	}
);

testProp(
	"_snd lens",
	[fc.tuple(fc.nat(), fc.string())],
	(t, xs) => {
		const snd = R.view(F._snd, xs);
		return t.true(snd === xs[1]);
	}
);

testProp(
	"makeValue",
	[fc.string(), fc.array(fc.integer())],
	(t, init, xs) => {
		const f = F.makeValue(init);
		const g = x => {
			f(x);
			return x === f(x);
		};

		t.true(R.all(g, xs));
	}
);

testProp(
	"genValue",
	[
		fc.integer(),
		fc.array(fc.option(fc.integer()))
	],
	(t, init, xs) => {
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

		t.true(R.all(g, xs));
	}
);

testProp(
	"seqWith empty",
	[fc.integer(), fc.string()],
	(t, a, b) => {
		const base = {};
		const seqBase = F.seqWith(base);

		const output = seqBase(
			F.Set("a", a),
			F.Set("b", b)
		);

		const expected = { a, b };

		t.deepEqual(output, expected);
	}
);

testProp(
	"seqWith optional",
	[fc.string(), fc.option(fc.string())],
	(t, a, ma) => {
		const base = {
			a: null
		};
		const seqBase = F.seqWith(base);
		const output = seqBase(
			F.Set("a", a),
			F.SetWhen("b", ma)
		);

		const expect = (ma => {
			if (R.isNil(ma)) {
				return { a };
			}
			else {
				return { a, b: ma };
			}
		})(ma);

		t.deepEqual(output, expect);
	}
);
