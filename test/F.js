const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");

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
	"maybeOr",
	[fc.option(fc.integer()), fc.integer(), fc.integer()],
	(ma, b, c) => {
		const x = F.maybeOr(b, c, ma);

		if (R.isNil(ma)) {
			return x === b;
		}
		else {
			return x === c;
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
