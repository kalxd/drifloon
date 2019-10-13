const R = require("ramda");
const Rx = require("rxjs");

// throwError :: ErrorClass -> String -> Stream a
const throwError = R.curry((klass, msg) => {
	const e = new klass(msg);

	return Rx.throwError(e);
});

// throwMsg :: String -> Stream a
const throwMsg = throwError(Error);

// throwNil :: ErrorClass -> String -> (Maybe a) -> Stream (Maybe a)
const throwNil = R.curry((klass, msg , v) => {
	if (R.isNil(v)) {
		return throwError(klass, msg);
	}
	else {
		return Rx.of(v);
	}
});

// throwNilMsg :: String -> Maybe a -> Stream (Maybe a)
const throwNilMsg = throwNil(Error);

module.exports = {
	throwError,
	throwMsg,
	throwNil,
	throwNilMsg
};
