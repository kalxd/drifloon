const R = require("ramda");

const { run } = require("@cycle/most-run");
const { makeDOMDriver } = require("@cycle/dom");

/**
 * type App = Source -> { DOM: Stream View | r}
 */

// mkDriver :: Element -> Driver
const mkDriver = node => ({
	DOM: makeDOMDriver(node)
});

// runAt :: Element -> App -> IO ();
const runAt = R.curry((node, app) => {
	const driver = mkDriver(node);

	return run(app, driver);
});

module.exports = {
	runAt
};
