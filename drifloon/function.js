const R = require("ramda");

const fmap = R.curry((f, v) => {
	if (R.isNil(v)) {
		return null;
	}

	return f(v);
});

const fmap2 = R.curry((f, v1, v2) => {
	if (R.isNil(v1) || R.isNil(v2)) {
		return null;
	}

	return f(v1, v2);
});

const fmap3 = R.curry((f, v1, v2, v3) => {
	if (R.isNil(v1) || R.isNil(v2) || R.isNil(v3)) {
		return null;
	}

	return f(v1, v2, v3);
});

const fmap4 = R.curry((f, v1, v2, v3, v4) => {
	if (R.isNil(v1) || R.isNil(v2) || R.isNil(v3) || R.isNil(v4)) {
		return null;
	}

	return f(v1, v2, v3, v4);
});

const fmap5 = R.curry((f, v1, v2, v3, v4, v5) => {
	if (R.isNil(v1) || R.isNil(v2) || R.isNil(v3) || R.isNil(v4) || R.isNil(v5)) {
		return null;
	}

	return f(v1, v2, v3, v4, v5);
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

exports.fmap = fmap;
exports.fmap2 = fmap2;
exports.fmap3 = fmap3;
exports.fmap4 = fmap4;
exports.fmap5 = fmap5;

exports.makeValue = makeValue;
