const Event = require("./event");

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
	createBlankDiv,
	createBlankDivWith
};
