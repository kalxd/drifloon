/** 加载状态 */

/**
 * data LoadState a = Loading | Finish a
 *
 * type LoadState a = { finish :: Bool
 *                    , ctx :: Maybe a
 *                    }
 */
const R = require("rambda");

// finishLens :: Lens (LoadState a) Bool
const finishLens = R.lensProp("finish");

// ctxLens :: Lens (LoadState a) a
const ctxLens = R.lensProp("ctx");

// isFinish :: LoadState a -> Bool
const isFinish = R.view(finishLens);

// empty :: LoadState a
const empty = Object.freeze({
	finish: false,
	ctx: null
});

// fmap :: (a -> b) -> LoadState a -> LoadState b
const fmap = R.curry((f, state) => {
	if (isFinish(state)) {
		return R.over(ctxLens, f, state);
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

// or :: a -> LoadState a -> a
const or = R.curry((def, state) => {
	if (isFinish(state)) {
		return state.ctx;
	}
	else {
		return def;
	}
});

module.exports = {
	empty,
	fmap,
	pure,
	ap,
	bind,
	or
};
