const R = require("ramda");
const Most = require("most");

// fromEvent :: String -> Node -> Stream Event
const fromEvent = R.curry((type, el) => {
	if (R.isNil(el)) {
		return Most.empty();
	}

	return Most.fromEvent(type, el);
});

const fromClick = fromEvent("click");

const fromChange = fromEvent("change");

exports.fromEvent = fromEvent;
exports.fromClick = fromClick;
exports.fromChange = fromChange;
