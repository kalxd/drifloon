/** 加载状态 */

/**
 * data LoadState a = Loading | Finish a
 *
 * type LoadState a = { finish :: Bool
 *                    , ctx :: Maybe a
 *                    }
 */
const R = require("ramda");

// empty :: LoadState a
const empty = Object.freeze({
	finish: false,
	ctx: null
});

// isFinish :: LoadState a -> Bool
const isFinish = R.prop("finish");

// fmap :: (a -> b) -> LoadState a -> LoadState b
const fmap = R.curry((f, state) => {
	if (isFinish(state)) {
		const trans = {
			ctx: f
		};
		return R.evolve(trans, state);
	}
	else {
		return empty;
	}
});

// pure :: a -> LoadState a
const pure = a => ({
	finish: true,
	ctx: a
});

// ap :: LoadState (a -> b) -> LoadState a -> LoadState b
const ap = R.curry((f, state) => {
	if (isFinish(f)) {
		const g = f.ctx;
		return fmap(g, state);
	}
	else {
		return empty;
	}
});

// bind :: (a -> LoadState b) -> LoadState a -> LoadState b
const bind = R.curry((f, state) => {
	if (isFinish(state)) {
		return f(state.ctx);
	}
	else {
		return empty;
	}
});

module.exports = {
	empty,
	fmap,
	pure,
	ap,
	bind
};
