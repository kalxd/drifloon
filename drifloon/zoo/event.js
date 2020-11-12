/** 事件绑定 */
const R = require("rambda");
const Most = require("most");

const {
	toElement,
	toValue,
	filterEnterCode,
	debounceAction
} = require("../internal");

// fromEvent :: String -> Maybe Element -> Stream Event
const fromEvent = R.curry((type, el) => {
	if (R.isNil(el)) {
		return Most.never();
	}
	else {
		return Most.fromEvent(type, el);
	}
});

// fromClick :: Maybe Element -> Stream Event
const fromClick = el => {
	const click$ = fromEvent("click", el);
	return click$.tap(e => e.stopPropagation());
};

// fromClick_ :: Maybe Element -> Stream Event
const fromClick_ = R.compose(
	debounceAction,
	fromClick
);

// fromClickE :: Maye Element -> Stream Element
const fromClickE = R.compose(
	toElement,
	fromClick
);

// fromClickE_ :: Maybe Element -> Stream Element
const fromClickE_ = R.compose(
	debounceAction,
	fromClickE
);

// fromChange :: Maybe Element -> Stream Event
const fromChange = fromEvent("change");

// fromChange_  :: Maybe Element -> Stream Event
const fromChange_ = R.compose(
	debounceAction,
	fromChange
);

// fromChangeV :: Maybe Element -> Stream String
const fromChangeV = R.compose(
	toValue,
	fromChange
);

// fromChangeV_ :: Maybe Element -> Stream String
const fromChangeV_ = R.compose(
	debounceAction,
	fromChangeV
);

// fromEnterPress_ :: Maybe Element -> Stream Event
const fromEnterPress_ = R.compose(
	debounceAction,
	fromEnterPress
);

// fromEnterPressV :: Maybe Element -> Stream String
const fromEnterPressV = R.compose(
	toValue,
	fromEnterPress
);

// fromEnterPressV_ :: Maybe Element -> Stream String
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

	fromEnterPress,
	fromEnterPress_,
	fromEnterPressV,
	fromEnterPressV_
};
