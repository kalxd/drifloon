const R = require("ramda");
const RX = require("rxjs");

// fromEvent :: String -> Node -> Stream Event
const fromEvent = R.curry((type, el) => {
	if (R.isNil(el)) {
		return RX.NEVER;
	}

	return RX.fromEvent(el, type);
});

const fromClick = fromEvent("click");

const fromChange = fromEvent("change");

exports.fromEvent = fromEvent;
exports.fromClick = fromClick;
exports.fromChange = fromChange;
