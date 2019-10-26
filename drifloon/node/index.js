const Event = require("./event");
const VNode = require("./vnode");

// createBlankDiv :: () -> IO Element
const createBlankDiv = () => {
	const node = document.createElement("div");
	document.body.appendChild(node);
	return node;
};

// createBlankDivWith :: String -> IO Element
const createBlankDivWith = classname => {
	const node = createEmptyNode();
	node.classList = classname;
	return node;
};

module.exports = {
	...Event,
	...VNode,
	createBlankDiv,
	createBlankDivWith
};
