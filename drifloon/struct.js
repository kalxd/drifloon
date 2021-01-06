/**
 * 拙劣模仿racket的struct。
 * 声明新struct，自动生成对应字段操作，
 * 一切都以lenses为基础。
 */
const R = require("rambda");

/**
 * unzip :: [(a, b)] -> ([a], [b])
 */
const unzip = xs => {
	let as = [];
	let bs = [];

	for (const x of xs) {
		as.push(x[0]);
		bs.push(x[1]);
	}

	return [as, bs];
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
 * 对于`struct("id", ["id", "id"])`，那么field可能对应`id`或`["id", "id"]`。
 * 最后一定是转化成`("id", ("id", tr))`。
 */
const tr = field => {
	if (R.is(String, field)) {
		// field = "field"
		return [field, [field, JsonIdentity]];
	}

	const n = field.length;

	if (n === 1) {
		// field = ["x"]
		const [x] = field;
		return [x, [x, JsonIdentity]];
	}
	else if (n === 2) {
		// field = ["x", ?]
		const [x, y] = field;

		if (R.is(String, y)) {
			// field = ["x", "y"]
			return [x, [y, JsonIdentity]];
		}
		else {
			// field = ["x", ["y", Type]]
			return field;
		}
	}
	else {
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
 *   ["type", ["other-type", MyType]]
 * );
 * ```
 */
const struct = (...args) => {
	// 模拟模块。
	let M = {};

	const [objKeys, jsonProps] = R.pipe(
		R.map(tr),
		unzip
	)(args);
	const jsonKeys = R.map(R.head, jsonProps);

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
		R.map(([[key, Type], x]) => {
			const value = Type.toJSON(x);
			return [key, value];
		}),
		R.zip(jsonProps),
		R.props(objKeys)
	);

	// 转化成JSON。
	M.fromJSON = R.compose(
		R.fromPairs,
		R.map(([[key, Type], x]) => {
			const value = Type.fromJSON(x);
			return [key, value];
		}),
		R.zip(jsonProps),
		R.props(jsonKeys)
	);

	// 生成每个字段的lens。
	for (const field of args) {
		M[`${field}Lens`] = R.lensProp(field);
	}

	return M;
};

module.exports = struct;
