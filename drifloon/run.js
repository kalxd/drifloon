const R = require("ramda");
const Ro = require("rxjs/operators");

const { makeDOMDriver } = require("@cycle/dom");
const { withState } = require("@cycle/state");
const { run, setup } = require("@cycle/rxjs-run");

const mkDriver = node => ({
	DOM: makeDOMDriver(node)
});

const runAt = R.curry((node, app) => {
	const driver = mkDriver(node);

	return run(withState(app), driver);
});

const buildModal = R.curry((node, app) => {
	const driver = mkDriver(node);
	const { run, sinks } = setup(withState(app), driver);

	const dispose = run();
	return [dispose, sinks];
});

const runModal = R.curry((node, app) => {
	const [dispose, sinks] = buildModal(node, app);

	const gc = R.compose(
		() => node.remove(),
		dispose
	);

	sinks.reject$.pipe(
		Ro.first()
	).subscribe(gc);

	return sinks.accept$.pipe(
		Ro.take(1),
		Ro.tap(gc)
	);
});

const execModal = R.curry((node, app) => {
	const modalApp = source => {
		const accept$ = source.DOM.select(".accept").events("click");
		const reject$ = source.DOM.select(".reject").events("click");

		return app(source, accept$, reject$);
	};

	return runModal(node, modalApp);
});

exports.runAt = runAt;
exports.runModal = runModal;
exports.execModal = execModal;
