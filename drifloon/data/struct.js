/**
 * 拙劣模仿racket的struct。
 * 声明新struct，自动生成对应字段操作，
 * 一切都以lenses为基础。
 */
const R = require("rambda");
const { fmap } = require("../function");

/**
 * unzip :: [(a, b, c)] -> ([a], [b], [c])
 */
const unzip = xs => {
	let as = [];
	let bs = [];
	let cs = [];

	for (const x of xs) {
		as.push(x[0]);
		bs.push(x[1]);
		cs.push(x[2]);
	}

	return [as, bs, cs];
};

/**
 * JSON空白转换。
 */
const JsonIdentity = {
	toJSON: R.identity,
	fromJSON: R.identity
};

/**
 * 将struct一个field完全展开。
 * field要么是`String`，要么是`Array`，其他类型不考虑。
 * 对于`struct("id", ["id", Type])`，那么field可能对应`id`或`["id", Type]`。
 * 最后一定是转化成`("id", "id", tr)`。
 */
const tr = field => {
	if (R.is(String, field)) {
		// field = "field"
		return [field, field, JsonIdentity];
	}

	const n = field.length;

	if (n === 1) {
		// field = ["x"]
		const [x] = field;
		return [x, x, JsonIdentity];
	}
	else if (n === 2) {
		// field = ["x", ?]
		const [x, y] = field;

		if (R.is(String, y)) {
			// field = ["x", "y"]
			return [x, y, JsonIdentity];
		}
		else {
			// field = ["x", Type]
			return [x, x, y];
		}
	}
	else {
		// field = ["x", "y", Type]
		return field;
	}
};

/**
 * 定义一个类型。
 *
 * ```
 * const MyType = struct(
 *   // String
 *   "id",
 *   ["name", "other-name"]
 * );
 * ```
 * 自然也支持嵌套。
 * ```
 * const MyUser = struct(
 *   // String
 *   "id",
 *   ["type", "other-type"],
 *   ["type", MyType],
 *   ["type", "other-type", MyType]
 * );
 * ```
 */
const struct = (...args) => {
	// 模拟模块。
	let M = {};

	const [objKeys, jsonKeys, trs] = R.pipe(
		R.map(tr),
		unzip
	)(args);

	// 构造函数
	M.gen = R.curryN(args.length, (...args) => R.pipe(
		R.zip(objKeys),
		R.fromPairs
	)(args));

	// 全部字段。
	M.values = R.props(objKeys);

	// 转化成JSON。
	M.toJSON = R.compose(
		R.fromPairs,
		R.zip(jsonKeys),
		R.map(([Type, x]) => {
			const f = R.cond([
				[R.isNil, R.identity],
				[R.is(Array), R.map(fmap(Type.toJSON))],
				[R.T, Type.toJSON]
			]);
			return f(x);
		}),
		R.zip(trs),
		R.props(objKeys)
	);

	// 转化成JSON。
	M.fromJSON = R.compose(
		R.fromPairs,
		R.zip(objKeys),
		R.map(([Type, x]) => {
			const f = R.cond([
				[R.isNil, R.identity],
				[R.is(Array), R.map(fmap(Type.fromJSON))],
				[R.T, Type.fromJSON]
			]);
			return f(x);
		}),
		R.zip(trs),
		R.props(jsonKeys)
	);

	// 生成每个字段的lens。
	for (const field of args) {
		M[`${field}Lens`] = R.lensProp(field);
	}

	return M;
};

module.exports = struct;
