/** 方便取元素事件 */
const R = require("rambda");

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
	return source.DOM$.select(selector)
		.events(eventType)
		.tap(e => e.stopPropagation())
	;
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

// fromAccept :: Source -> Stream Event
const fromAccept = fromClick(".accept");

// fromAccept_ :: Source -> Stream Event
const fromAccept_ = R.compose(
	debounceAction,
	fromAccept
);

// fromAcceptE :: Source -> Stream Element
const fromAcceptE = R.compose(
	toElement,
	fromAccept
);

// fromAcceptE_ :: Source -> Stream Element
const fromAcceptE_ = R.compose(
	toElement,
	fromAccept_
);

// fromReject :: Source -> Stream Event
const fromReject = fromClick(".reject");

// fromReject_ :: Source -> Stream Event
const fromReject_ = R.compose(
	debounceAction,
	fromReject
);

// fromRejectE :: Source -> Stream Element
const fromRejectE = R.compose(
	toElement,
	fromReject
);

// fromRejectE_ :: Source -> Stream Element
const fromRejectE_ = R.compose(
	toElement,
	fromReject_
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

	fromEnterPress,
	fromEnterPress_,
	fromEnterPressV,
	fromEnterPressV_,

	fromAccept,
	fromAccept_,
	fromAcceptE,
	fromAcceptE_,

	fromReject,
	fromReject_,
	fromRejectE,
	fromRejectE_
};
