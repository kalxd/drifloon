const R = require("ramda");
const Rx = require("rxjs");
const Ro = require("rxjs/operators");

const mapToTarget = Ro.map(e => e.target);

const mapToValue = Rx.pipe(
	mapToTarget,
	Ro.map(el => el.value.trim())
);

const debounceAction = Ro.debounceTime(100);

// fromEvent :: String -> Element -> Stream Event
const fromEvent = R.curry((type, el) => {
	if (R.isNil(el)) {
		return Rx.NEVER;
	}

	return Rx.fromEvent(el, type);
});

// fromClick :: Element -> Stream Event
const fromClick = fromEvent("click");

// fromChange :: Element -> Stream Event
const fromChange = fromEvent("change");

// createEmptyNode :: () -> IO Element
const createEmptyNode = () => {
	const node = document.createElement("div");
	document.body.appendChild(node);
	return node;
};

// createEmptyNodeWith :: String -> IO Element
const createEmptyNodeWith = classname => {
	const node = createEmptyNode();
	node.classList = classname;
	return node;
};

exports.fromEvent = fromEvent;
exports.fromClick = fromClick;
exports.fromChange = fromChange;

exports.createEmptyNode = createEmptyNode;
exports.createEmptyNodeWith = createEmptyNodeWith;
