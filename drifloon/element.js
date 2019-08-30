const R = require("ramda");
const Most = require("most");

// fromEvent :: String -> Element -> Stream Event
const fromEvent = R.curry((type, el) => {
	if (R.isNil(el)) {
		return Most.empty();
	}

	return Most.fromEvent(type, el);
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
