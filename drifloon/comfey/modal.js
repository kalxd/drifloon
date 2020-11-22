/** 模态对话框实现 */
const R = require("rambda");
const DOM = require("@cycle/dom");

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

// renderBy :: Selector -> View -> View
const renderBy = R.curry((klass, view) => DOM.div(klass, view));

// renderTitle :: View -> View
const renderTitle = renderBy(".title");

// renderContent :: View -> View
const renderContent = renderBy(".content");

// renderContent :: View -> View
const renderFooter = renderBy(".footer");

module.exports = {
	BASE_MODAL_STYLE,
	createDimmer,

	renderTitle,
	renderContent,
	renderFooter
};
