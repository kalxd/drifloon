/**
 * 拙劣模仿racket的struct。
 * 声明新struct，自动生成对应字段操作，
 * 一切都以lenses为基础。
 */
const R = require("rambda");

const struct = fields => {
	// 模拟模块。
	let m = {};

	// fieldCount :: Int
	const fieldCount = R.length(fields);

	// 构造函数
	m.gen = R.curryN(fieldCount, (...args) => {
		let o = {};
		for (let i = 0; i < fieldCount; ++i) {
			const fieldName = fields[i];
			o[fieldName] = args[i];
		}

		return o;
	});

	// 全部字段。
	m.values = R.props(fields);

	// 生成每个字段的lens。
	for (const field of fields) {
		m[`${field}Lens`] = R.lensProp(field);
	}

	return m;
};

module.exports = struct;
