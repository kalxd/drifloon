const R = require("rambda");

// isAnyNil :: [Maybe a] -> Bool
const isAnyNil = R.any(R.isNil);

// fmap :: (a -> b) -> Maybe a -> Maybe b
const fmap = R.curry((f, a) => {
	if (R.isNil(a)) {
		return null;
	}

	return f(a);
});

// fmap2 :: (a -> b -> c) -> Maybe a -> Maybe b -> Maybe c
const fmap2 = R.curry((f, a, b) => {
	if (isAnyNil([a, b])) {
		return null;
	}

	return f(a, b);
});

// fmap3 :: (a -> b -> c -> d) -> Maybe a -> Maybe b -> Maybe c -> Maybe d
const fmap3 = R.curry((f, a, b, c) => {
	if (isAnyNil([a, b, c])) {
		return null;
	}

	return f(a, b, c);
});

// fmap4 :: (a -> b -> c -> d -> e) -> Maybe a -> Maybe b -> Maybe c -> Maybe d -> Maybe e
const fmap4 = R.curry((f, a, b, c, d) => {
	if (isAnyNil([a, b, c, d])) {
		return null;
	}

	return f(a, b, c, d);
});

// fmap5 :: (a -> b -> c -> d -> e -> f) -> Maybe a -> Maybe b -> Maybe c -> Maybe d -> Maybe e -> Maybe f
const fmap5 = R.curry((f, a, b, c, d, e) => {
	if (isAnyNil([a, b, c, d, e])) {
		return null;
	}

	return f(a, b, c, d, e);
});

// fmap6 :: (a1 -> a2 -> a3 -> a4 -> a5 -> a6 -> z)
//       -> Maybe a1
//       -> Maybe a2
//       -> Maybe a3
//       -> Maybe a4
//       -> Maybe a5
//       -> Maybe a6
//       -> Maybe z
const fmap6 = R.curry((f, a1, a2, a3, a4, a5, a6) => {
	if (isAnyNil([a1, a2, a3, a4, a5, a6])) {
		return null;
	}
	return f(a1, a2, a3, a4, a5, a6);
});

// fmap7 :: (a1 -> a2 -> a3 -> a4 -> a5 -> a6 -> a7 -> z)
//       -> Maybe a1
//       -> Maybe a2
//       -> Maybe a3
//       -> Maybe a4
//       -> Maybe a5
//       -> Maybe a6
//       -> Maybe a7
//       -> Maybe z
const fmap7 = R.curry((f, a1, a2, a3, a4, a5, a6, a7) => {
	if (isAnyNil([a1, a2, a3, a4, a5, a6, a7])) {
		return null;
	}
	return f(a1, a2, a3, a4, a5, a6, a7);
});

// fmap8 :: (a1 -> a2 -> a3 -> a4 -> a5 -> a6 -> a7 -> a8 -> z)
//       -> Maybe a1
//       -> Maybe a2
//       -> Maybe a3
//       -> Maybe a4
//       -> Maybe a5
//       -> Maybe a6
//       -> Maybe a7
//       -> Maybe a8
//       -> Maybe z
const fmap8 = R.curry((f, a1, a2, a3, a4, a5, a6, a7, a8) => {
	if (isAnyNil([a1, a2, a3, a4, a5, a6, a7, a8])) {
		return null;
	}
	return f(a1, a2, a3, a4, a5, a6, a7, a8);
});


// fmap9 :: (a1 -> a2 -> a3 -> a4 -> a5 -> a6 -> a7 -> a8 -> a9 -> z)
//       -> Maybe a1
//       -> Maybe a2
//       -> Maybe a3
//       -> Maybe a4
//       -> Maybe a5
//       -> Maybe a6
//       -> Maybe a7
//       -> Maybe a8
//       -> Maybe a9
//       -> Maybe z
const fmap9 = R.curry((f, a1, a2, a3, a4, a5, a6, a7, a8, a9) => {
	if (isAnyNil([a1, a2, a3, a4, a5, a6, a7, a8, a9])) {
		return null;
	}
	return f(a1, a2, a3, a4, a5, a6, a7, a8, a9);
});

// traverse :: Foldable t => (a -> Maybe b) -> t a -> Maybe (t b)
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

// isJust :: Maybe a -> Bool
const isJust = R.complement(R.isNil);

// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = R.curry((b, f, c) => {
	if (R.isNil(c)) {
		return b;
	}
	else {
		return f(c);
	}
});

// maybeElse :: b -> b -> Maybe a -> b
const maybeElse = R.curry((a, b, c) => {
	if (R.isNil(c)) {
		return a;
	}
	else {
		return b;
	}
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

	return (...args) => {
		if (args.length) {
			return gen(...args);
		}

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
	fmap6,
	fmap7,
	fmap8,
	fmap9,

	traverse,

	isJust,
	maybe,
	maybeElse,

	makeValue,
	genValue
};
