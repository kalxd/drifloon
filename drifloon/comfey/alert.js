const R = require("rambda");
const Most = require("most");
const DOM = require("@cycle/dom");

const {
	createDimmer,
	renderModal,
	renderTitle,
	renderContent,
	renderFooter
} = require("./modal");
const { execModalAt } = require("../run");
const { fromAccept, fromReject } = require("../vnode/event");
const { fmap } = require("../function");

// alert$ :: Maybe String -> String -> Stream ()
const alert$ = R.curry((title, msg) => {
	const app = source => {
		const view = renderModal([
			fmap(renderTitle, title),
			renderContent(msg),
			renderFooter([
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

// alert_$ :: String -> Stream ()
const alert_$ = alert$(null);

// alert :: Maybe String -> String -> Promise ()
const alert = R.curry((title, msg) => {
	return alert$(title, msg).drain();
});

// alert_ :: String -> Promise ()
const alert_ = alert(null);

module.exports = {
	alert$,
	alert_$,
	alert,
	alert_
};
