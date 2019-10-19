const R = require("ramda");
const Rx = require("rxjs");
const Ro = require("rxjs/operators");

const mapToTarget = Ro.map(e => e.target);

const mapToValue = Rx.pipe(
	mapToTarget,
	Ro.map(el => el.value.trim())
);

const debounceAction = Ro.debounceTime(150);

// fromEvent :: String -> Maybe Element -> Stream Event
const fromEvent = R.curry((type, el) => {
	if (R.isNil(el)) {
		return Rx.NEVER;
	}

	return Rx.fromEvent(el, type);
});

// fromClick :: Maybe Element -> Stream Event
const fromClick = fromEvent("click");

// fromClick_ :: Maybe Element -> Stream Event
const fromClick_ = R.compose(
	debounceAction,
	fromClick
);

// fromClickE :: Maybe Element -> Stream Element
const fromClickE = R.compose(
	mapToTarget,
	fromClick
);

// fromClickE_ :: Maybe Element -> Stream Element
const fromClickE_ = R.compose(
	debounceAction,
	fromClickE
);

// fromChange :: Maybe Element -> Stream Event
const fromChange = fromEvent("change");

// fromChange_ :: Maybe Element -> Stream Event
const fromChange_ = R.compose(
	debounceAction,
	fromChange
);

// fromChangeV :: Maybe Element -> Stream String
const fromChangeV = R.compose(
	mapToValue,
	fromChange
);

// fromChangeV_ : Maybe Element -> Stream String
const fromChangeV_ = R.compose(
	debounceAction,
	fromChangeV
);

// fromHover :: Maybe Element -> Stream Event
const fromHover = fromEvent("mouseenter");

// fromHover_ :: Maybe Element -> Stream Event
const fromHover_ = R.compose(
	debounceAction,
	fromHover
);

// fromHoverE :: Maybe Element -> Stream Element
const fromHoverE = R.compose(
	mapToTarget,
	fromHover
);

// fromHoverE_ :: Maybe Element -> Stream Element
const fromHoverE_ = R.compose(
	debounceAction,
	fromHoverE
);

// fromBlur :: Maybe Element -> Stream Event
const fromBlur = fromEvent("mouseleave");

// fromBlur_ :: Maybe Element -> Stream Event
const fromBlur_ = R.compose(
	debounceAction,
	fromBlue
);

// fromBlurE :: Maybe Element -> Stream Element
const fromBlurE = R.compose(
	mapToTarget,
	fromBlur
);

// fromBlurE_ :: Maybe Element -> Stream Element
const fromBlurE_ = R.compose(
	debounceAction,
	fromBlurE
);

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
	fromEvent,

	fromClick,
	fromClick_,
	fromClickE,
	fromClickE_,

	fromChange,
	fromChange_,
	fromChangeV,
	fromChangeV_,

	fromHover,
	fromHover_,
	fromHoverE,
	fromHoverE_,

	fromHover,
	fromHover_,
	fromHoverE,
	fromHoverE_,

	createBlankDiv,
	createBlankDivWith
};
