const R = require("ramda");

// isAnyNil :: [Maybe a] -> Bool
const isAnyNil = R.any(R.isNil);

const fmapN = (f, ...args) => {
	if (isAnyNil(args)) {
		return null;
	}
	return R.apply(f, args);
};

const fmap = R.curryN(1, fmapN);
const fmap2 = R.curryN(2, fmapN);
const fmap3 = R.curryN(3, fmapN);
const fmap4 = R.curryN(4, fmapN);
const fmap5 = R.curryN(5, fmapN);

// traverse :: (a -> Maybe b) -> [a] -> Maybe [b]
const traverse = R.curry((f, xs) => {
	let r = [];

	for (const x of xs) {
		let a = f(x);

		if (R.isNil(a)) {
			return null;
		}
		else {
			r.push(a);
		}
	}

	return r;
});

const makeValue = v => {
	let innerValue = v;

	return (...args) => {
		if (!args.length) {
			return innerValue;
		}
		else {
			return innerValue = args[0];
		}
	};
};

const genValue = f => {
	const gen = makeValue(null);

	return () => {
		const v = gen();
		if (R.isNil(v)) {
			const value = f();
			gen(value);
			return value;
		}
		else {
			return v;
		}
	};
};

module.exports = {
	fmap,
	fmap2,
	fmap3,
	fmap4,
	fmap5,

	traverse,

	makeValue,
	genValue
};
