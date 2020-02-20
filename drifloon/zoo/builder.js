/** 创建新元素 */
const R = require("ramda");
const { fmap }  = require("../function");

// mkElement :: (Element -> IO ()) -> IO Element
const mkElement = f => {
	const el = document.createElement("div");
	f(el);
	return el;
};

// blankAtEnd :: Element -> IO Element
const blankAtEnd = node => mkElement(el => {
	node.appendChild(el);
});

// blankAtBegin :: Element -> IO Element
const blankAtBegin = node => mkElement(el => {
	const firstChild = node.firstElementChild;

	if (R.isNil(firstChild)) {
		node.appendChild(el)
	}
	else {
		node.insertBefore(el, firstChild);
	}
});

// blankAtBodyBegin :: () -> IO Element
const blankAtBodyBegin = () => blankAtBegin(document.body);

// blankAtBodyEnd :: () -> IO Element
const blankAtBodyEnd = () => blankAtEnd(document.body);

// nodeIndex :: Element -> IO (Maybe Int)
const nodeIndex = node => {
	const parent = node.parentNode;

	return fmap(parent => {
		let index = 0;
		for (const el of parent.children) {
			if (el === node) {
				return index;
			}
			else {
				++index;
			}
		}
		return index;
	})(parent);
};

module.exports = {
	blankAtBegin,
	blankAtEnd,
	blankAtBodyBegin,
	blankAtBodyEnd,
	nodeIndex
};
