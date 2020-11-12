/** 内部模块，用于代码共享 */
const R = require("rambda");

// toElement :: Stream Event -> Stream Element
const toElement = s$ => s$.map(e => e.target);

// toValue :: Stream Event -> Stream String
const toValue = s$ => s$.map(e => e.target.value.trim());

// toInt :: Stream Element -> IO Int
const toInt = stream$ => stream$
	.map(el => el.dataset.index)
	.map(R.compose(
		R.defaultTo(0),
		Number
	))
;

// filterEnterCode :: Stream a -> Stream a
const filterEnterCode = s$ => s$.filter(R.propEq("code", "Enter"));

// debounceAction :: Stream a -> Stream a
const debounceAction = s$ => s$.debounce(300);

module.exports = {
	toElement,
	toValue,
	toInt,
	filterEnterCode,
	debounceAction
};
