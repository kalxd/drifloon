/** 方便取元素事件 */
const R = require("ramda");

const {
	toElement,
	toValue,
	filterEnterCode,
	debounceAction
} = require("../internal");

/**
 * type Selector = String
 */

// fromEvent :: String -> Selector -> Source -> Stream Event
const fromEvent = R.curry((eventType, selector, source) => {
	return source.DOM.select(selector).events(eventType);
});

// fromClick :: Selector -> Source -> Stream Event
const fromClick = fromEvent("click");

// fromClick_ :: Selector -> Source -> Stream Event
const fromClick_ = R.compose(
	debounceAction,
	fromClick
);

// fromClickE :: Selector -> Source -> Stream Element
const fromClickE = R.compose(
	toElement,
	fromClick
);

// fromClickE_ :: Selector -> Source -> Stream Element
const fromClickE_ = R.compose(
	toElement,
	fromClick_
);

// fromChange :: Selector -> Source -> Stream Event
const fromChange = fromEvent("change");

// fromChange_ :: Selector -> Source -> Stream Event
const fromChange_ = R.compose(
	debounceAction,
	fromChange
);

// fromChangeV :: Selector -> Source -> Stream String
const fromChangeV = R.compose(
	toValue,
	fromChange
);

// fromChangeV_ :: Selector -> Source -> Stream String
const fromChangeV_ = R.compose(
	toValue,
	fromChange_
);

// fromKeydown :: Selector -> Source -> Stream Event
const fromKeydown = fromEvent("keydown");

// fromKeydown_ :: Selector -> Source -> Stream Event
const fromKeydown_ = R.compose(
	debounceAction,
	fromKeydown
);

// fromKeydownV :: Selector -> Source -> Stream String
const fromKeydownV = R.compose(
	toValue,
	fromKeydown
);

// fromKeydownV_ :: Selector -> Source -> Stream String
const fromKeydownV_ = R.compose(
	toValue,
	fromKeydown_
);

// fromKeyup :: Selector -> Source -> Stream Event
const fromKeyup = fromEvent("keyup");

// fromKeyup_ :: Selector -> Source -> Stream Event
const fromKeyup_ = R.compose(
	debounceAction,
	fromKeyup
);

// fromKeyupV :: Selector -> Source -> Stream String
const fromKeyupV = R.compose(
	toValue,
	fromKeyup
);

// fromKeyupV_ :: Selector -> Source -> Stream String
const fromKeyupV_ = R.compose(
	toValue,
	fromKeyup_
);

// fromEnterPress :: Selector -> Source -> Stream Event
const fromEnterPress = R.compose(
	filterEnterCode,
	fromKeyup
);

// fromEnterPress_ :: Selector -> Source -> Stream Event
const fromEnterPress_ = R.compose(
	debounceAction,
	fromEnterPress
);

// fromEnterPressV :: Selector -> Source -> Stream String
const fromEnterPressV = R.compose(
	toValue,
	fromEnterPress
);

// fromEnterPressV_ :: Selector -> Source -> Stream String
const fromEnterPressV_ = R.compose(
	debounceAction,
	fromEnterPressV
);

module.exports = {
	fromEvent,

	fromClick,
	fromClick_,
	fromClickE,
	fromClickE_,

	fromChange,
	fromChange_,
	fromChangeV,
	fromChangeV_,

	fromKeydown,
	fromKeydown_,
	fromKeydownV,
	fromKeydownV_,

	fromKeyup,
	fromKeyup_,
	fromKeyupV,
	fromKeyupV_,

	fromEnterPress,
	fromEnterPress_,
	fromEnterPressV,
	fromEnterPressV_
};
