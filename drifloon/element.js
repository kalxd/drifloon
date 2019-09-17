const R = require("ramda");
const Rx = require("rxjs");
const Ro = require("rxjs/operators");

const mapToTarget = Ro.map(e => e.target);

const mapToValue = Rx.pipe(
	mapToTarget,
	Ro.map(el => el.value.trim())
);

const debounceAction = Ro.debounceTime(150);

// fromEvent :: String -> Element -> Stream Event
const fromEvent = R.curry((type, el) => {
	if (R.isNil(el)) {
		return Rx.NEVER;
	}

	return Rx.fromEvent(el, type);
});

// fromClick :: Maybe Element -> Stream Event
const fromClick = fromEvent("click");

// fromClick_ :: Maybe Element -> Stream Event
const fromClick_ = el => fromClick(el).pipe(debounceAction);

// fromClickE :: Maybe Element -> Stream Element
const fromClickE = el => fromClick(el).pipe(mapToTarget);

// fromClickE_ :: Maybe Element -> Stream Element
const fromClickE_ = el => fromClickE(el).pipe(debounceAction);

// fromChange :: Maybe Element -> Stream Event
const fromChange = fromEvent("change");

// fromChange_ :: Maybe Element -> Stream Event
const fromChange_ = el => fromChange(el).pipe(debounceAction);

// fromChangeV :: Maybe Element -> Stream String
const fromChangeV = el => fromChange(el).pipe(maptToValue);

// fromChangeV_ : Maybe Element -> Stream String
const fromChangeV_ = el => fromChangeV(el).pipe(debounceAction);

// fromHover :: Maybe Element -> Stream Event
const fromHover = fromEvent("mouseenter");

// fromHover_ :: Maybe Element -> Stream Event
const fromHover_ = el => fromHover(el).pipe(debounceAction);

// fromHoverE :: Maybe Element -> Stream Element
const fromHoverE = el => fromHover(el).pipe(mapToTarget);

// fromHoverE_ :: Maybe Element -> Stream Element
const fromHoverE_ = el => fromHoverE(el).pipe(debounceAction);

// fromBlur :: Maybe Element -> Stream Event
const fromBlur = fromEvent("mouseleave");

// fromBlur_ :: Maybe Element -> Stream Event
const fromBlur_ = el => fromBlur(el).pipe(debounceAction);

// fromBlurE :: Maybe Element -> Stream Element
const fromBlurE = el => fromBlur(el).pipe(mapToTarget);

// fromBlurE_ :: Maybe Element -> Stream Element
const fromBlurE_ = el => fromBlurE(el).pipe(debounceAction);

// createEmptyNode :: () -> IO Element
const createEmptyNode = () => {
	const node = document.createElement("div");
	document.body.appendChild(node);
	return node;
};

// createEmptyNodeWith :: String -> IO Element
const createEmptyNodeWith = classname => {
	const node = createEmptyNode();
	node.classList = classname;
	return node;
};

exports.fromEvent = fromEvent;
exports.fromClick = fromClick;
exports.fromClick_ = fromClick_;
exports.fromClickE = fromClickE;
exports.fromClickE_ = fromClickE_;
exports.fromChange = fromChange;
exports.fromChange_ = fromChange_;
exports.fromChangeV = fromChangeV;
exports.fromChangeV_ = fromChangeV_;
exports.fromHover = fromHover;
exports.fromHover_ = fromHover_;
exports.fromHoverE = fromHoverE;
exports.fromHoverE_ = fromHoverE_;
exports.fromBlur = fromBlur;
exports.fromBlur_ = fromBlur_;
exports.fromBlurE = fromBlurE;
exports.fromBlurE_ = fromBlurE_;

exports.createEmptyNode = createEmptyNode;
exports.createEmptyNodeWith = createEmptyNodeWith;
