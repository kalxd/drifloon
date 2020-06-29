const R = require("ramda");
const Most = require("most");
const Observable = require("zen-observable");

// create :: (ZenObservable ~> IO a) -> Stream a
const create = f => {
	const o = new Observable(f);
	return Most.from(o);
};

// fromCallback :: (a -> IO ()) -> Stream a
const fromCallback = g => {
	return create(ob => {
		const f = a => ob.next(a);
		g(f);
	});
};

// throwError :: ErrorClass -> String -> Stream a
const throwError = R.curry((klass, msg) => {
	const e = new klass(msg);

	return Most.throwError(e);
});

// throwMsg :: String -> Stream a
const throwMsg = throwError(Error);

// throwNil :: ErrorClass -> String -> (Maybe a) -> Stream a
const throwNil = R.curry((klass, msg , v) => {
	if (R.isNil(v)) {
		return throwError(klass, msg);
	}
	else {
		return Most.of(v);
	}
});

// throwNilMsg :: String -> Maybe a -> Stream a
const throwNilMsg = throwNil(Error);

module.exports = {
	create,
	fromCallback,

	throwError,
	throwMsg,
	throwNil,
	throwNilMsg
};
