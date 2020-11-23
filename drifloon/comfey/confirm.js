const R = require("rambda");
const Most = require("most");

const {
	createDimmer,
	renderModal,
	renderTitle,
	renderContent,
	footer
} = require("./modal");
const { execModalAt } = require("../run");
const { fromAccept, fromReject } = require("../vnode/event");
const { fmap } = require("../function");

// confirm$ :: Maybe String -> String -> Stream ()
const confirm$ = R.curry((title, msg) => {
	const app = source => {
		const view = renderModal([
			fmap(renderTitle, title),
			renderContent(msg),
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

// confirm_$ :: String -> Stream ()
const confirm_$ = confirm$(null);

// confirm :: Maybe String -> String -> Promise ()
const confirm = R.curry((title, msg) => {
	return confirm$(title, msg).drain();
});

// confirm_ :: String -> Promise ()
const confirm_ = confirm(null);

module.exports = {
	confirm$,
	confirm_$,
	confirm,
	confirm_
};
