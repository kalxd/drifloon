const R = require("rambda");
const Most = require("most");
const DOM = require("@cycle/dom");

const {
	BASE_MODAL_STYLE,
	createDimmer,
	renderTitle,
	renderContent,
	renderFooter
} = require("./modal");
const { execModalAt } = require("../run");
const { fromAccept, fromReject } = require("../vnode/event");
const { fmap } = require("../function");

// show$ :: Maybe String -> String -> Stream ()
const show$ = R.curry((title, msg) => {
	const app = source => {
		const view = DOM.div("._.modal.small", { style: BASE_MODAL_STYLE }, [
			fmap(renderTitle, title),
			renderContent(msg),
			renderFooter([
				DOM.button("._.red.button.reject", "不好"),
				DOM.button("._.blue.button.accept", "好")
			])
		]);

		const DOM$ = Most.of(view);
		const accept$ = fromAccept(source);
		const reject$ = fromReject(source);

		return {
			DOM$,
			accept$,
			reject$
		};
	};

	const node = createDimmer();

	return execModalAt(node, app);
});

// show_$ :: String -> Stream ()
const show_$ = show$(null);

// show :: Maybe String -> String -> Promise ()
const show = R.curry((title, msg) => {
	return show$(title, msg).drain();
});

// show_ :: String -> Promise ()
const show_ = show(null);

module.exports = {
	show$,
	show_$,
	show,
	show_
};
