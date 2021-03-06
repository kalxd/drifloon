const R = require("rambda");

const { run, setup } = require("@cycle/most-run");
const { makeDOMDriver } = require("@cycle/dom");

const { fmap } = require("./function");
const { blankAtBodyEnd } = require("./zoo/builder");

// takeFirst :: Stream a -> Stream a
const takeFirst = stream$ => stream$.take(1);

// mkDriver :: Element -> Driver
const mkDriver = node => ({
	DOM$: makeDOMDriver(node)
});

// runAt :: Element -> Application -> IO ();
const runAt = R.curry((node, app) => {
	const driver = mkDriver(node);

	return run(app, driver);
});

// runAtEnd :: Application -> IO ();
const runAtEnd = app => {
	const mountNode = blankAtBodyEnd();
	return runAt(mountNode, app);
};

// runModalAt :: Element -> Application -> IO (() -> IO (), Sinks);
const runModalAt = R.curry((node, app) => {
	const driver = mkDriver(node);
	const { sinks, run } = setup(app, driver);
	const down = run();

	const dispose = R.compose(
		down,
		() => node.remove()
	);

	return R.pipe(
		R.evolve({
			accept$: takeFirst,
			reject$: takeFirst
		}),
		sinks => ([dispose, sinks])
	)(sinks);
});

// execModalAt :: Element -> Application -> IO (Stream a)
const execModalAt = R.curry((node, app) => {
	const [dispose, sinks] = runModalAt(node, app);

	fmap(reject$ => reject$.observe(dispose))(sinks.reject$);

	return sinks.accept$.tap(dispose);
});

module.exports = {
	runAt,
	runAtEnd,
	runModalAt,
	execModalAt
};
