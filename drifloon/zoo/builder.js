/** 创建新元素 */
const R = require("ramda");

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

// whichPos :: Element -> IO Int
const whichPos = node => {
	let index = 0;
	const parent = node.parentNode;
	for (const el of parent.children) {
		if (el === node) {
			return index;
		}
		else {
			++index;
		}
	}
	return 0;
};

module.exports = {
	blankAtBegin,
	blankAtEnd,
	blankAtBodyBegin,
	blankAtBodyEnd,
	whichPos
};
