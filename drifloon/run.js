const R = require("ramda");

const { makeDOMDriver } = require("@cycle/dom");
const { withState } = require("@cycle/state");
const { run } = require("@cycle/most-run");

const mkDriver = node => ({
	DOM: makeDOMDriver(node)
});

// runAt :: Element -> Component -> IO ()
const runAt = R.curry((node, app) => {
	const driver = mkDriver(node);

	return run(withState(app), driver);
});

exports.runAt = runAt;
