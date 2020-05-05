const R = require("ramda");

// guard :: (() -> View ) -> Bool -> Maybe View
const guard = R.curry((f, isShow) => {
	if (isShow) {
		return f();
	}
	else {
		return null;
	}
});

// only :: View -> Bool -> Maybe View
const only = R.curry((view, isShow) => {
	if (isShow) {
		return view;
	}
	else {
		return null;
	}
});

// select :: String -> Record -> String
const select = R.curry((baseKlass, option) => {
	const base = R.pipe(
		R.split(" "),
		R.filter(R.complement(R.isEmpty)),
		R.map(s => `.${s}`)
	)(baseKlass);

	const selected = R.pipe(
		R.toPairs,
		R.filter(R.nth(1)),
		R.map(([k, _]) => `.${k}`)
	)(option);

	return R.pipe(
		R.concat(base),
		R.join("")
	)(selected);
});

// select_ :: Record -> String
const select_ = select("");

module.exports = {
	guard,
	only,
	select,
	select_
};
