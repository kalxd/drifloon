/** 模态对话框实现 */

const { blankAtBodyEnd } = require("../zoo/builder");

const BASE_MODAL_STYLE = {
	transform: "translateY(100%) scale(0) rotateX(89deg)",
	opacity: 0,
	delayed: {
		transform: "translateY(0) scale(1) rotateX(0)",
		opacity: 1
	}
};

// createDimmer :: () -> IO Element
const createDimmer = () => {
	const dimmer = blankAtBodyEnd();
	dimmer.classList = "_ dimmer";
	return dimmer;
};

module.exports = {
	BASE_MODAL_STYLE,
	createDimmer
};
