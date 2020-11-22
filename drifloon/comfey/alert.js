const R = require("rambda");
const Most = require("most");
const DOM = require("@cycle/dom");

const { createDimmer, BASE_MODAL_STYLE } = require("./modal");
const { execModalAt } = require("../run");
const { fromAccept, fromReject } = require("../vnode/event");

// drawTitle :: String -> View
const drawTitle = title => DOM.div(".title", title);

// drawContent :: String -> View
const drawContent = msg => DOM.div(".content", msg);

// footer :: Vie
const footer = DOM.div(".footer", [
	DOM.button("._.red.button.reject", "不好"),
	DOM.button("._.blue.button.accept", "好")
]);

// show :: String -> String -> Stream ()
const show = R.curry((title, msg) => {
	const app = source => {
		const view = DOM.div("._.modal.small", { style: BASE_MODAL_STYLE }, [
			drawTitle(title),
			drawContent(msg),
			footer
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

module.exports = {
	show
};
