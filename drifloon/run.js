const R = require("ramda");
const Most = require("most");

const { run, setup } = require("@cycle/most-run");
const { makeDOMDriver } = require("@cycle/dom");

const { fmap } = require("./function");

/**
 * type App = Source -> { DOM: Stream View | r}
 */

// takeFirst :: Stream a -> Maybe (Stream a)
const takeFirst = stream$ => stream$.take(1);


// mkDriver :: Element -> Driver
const mkDriver = node => ({
	DOM: makeDOMDriver(node)
});

// runAt :: Element -> App -> IO ();
const runAt = R.curry((node, app) => {
	const driver = mkDriver(node);

	return run(app, driver);
});

// runModalAt :: Element -> App -> IO ((() -> IO ()), Sinks);
const runModalAt = R.curry((node, app) => {
	const driver = mkDriver(node);

	const {sources, sinks, run} = setup(app, driver);

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

// execModalAt :: Element -> App -> IO (Stream a)
const execModalAt = R.curry((node, app) => {
	const [dispose, sinks] = runModalAt(node, app);

	fmap(reject$ => reject$.observe(dispose))(sinks.reject$);

	return sinks.accept$.tap(dispose);
});

module.exports = {
	runAt,
	runModalAt,
	execModalAt
};
