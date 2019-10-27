/** 创建新元素 */

// blankAfter :: Element -> IO Element
const blankAfter = node => {
	const el = document.createElement("div");
	node.appendChild(el);
	return el;
};

// blankBefore :: Element -> IO Element
const blankBefore = node => {
	const el = document.createElement("div");
	node.parentNode.insertBefore(el, node);
	return node;
};

// blankAfterBody :: () -> IO Element
const blankAfterBody = () => blankAfter(document.body);

// blankBeforeBody :: () -> IO Element
const blankBeforeBody = () => blankBefore(document.body);

module.exports = {
	blankAfter,
	blankBefore,
	blankAfterBody,
	blankBeforeBody
};
