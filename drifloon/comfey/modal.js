/** 模态对话框实现 */

const { blankAtBodyEnd } = require("../zoo/builder");

// createDimmer :: () -> IO Element
const createDimmer = () => {
	const dimmer = blankAtBodyEnd();
	dimmer.classList = "_ dimmer";
	return dimmer;
};

module.exports = {
	createDimmer
};
