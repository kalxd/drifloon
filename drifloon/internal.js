/** 内部模块，用于代码共享 */

// toElement :: Stream Event -> Stream Element
const toElement = s$ => s$.map(e => e.target);

// toValue :: Stream Event -> Stream String
const toValue = s$ => s$.map(e => e.target.value.trim());

// filterEnterCode :: Stream a -> Stream a
const filterEnterCode = s$ => s$.filter(R.propEq("code", "Enter"));

// debounceAction :: Stream a -> Stream a
const debounceAction = s$ => s$.debounce(300);

module.exports = {
	toElement,
	toValue,
	filterEnterCode,
	debounceAction
};
