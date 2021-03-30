const R = require("rambda");

const Enum = (primary, ...args) => {
	// 模块对象。
	const m = {};

	const allFields = [primary, ...args];
	const isPrimary = `is${primary}`;
	const getPrimary = `get${primary}`;

	// 批量生成常用方法。
	allFields.forEach(field => {
		// 构造函数。
		m[field] = x => Object.freeze({ [field]: x});
		// 辨别函数。
		const isName = `is${field}`;
		m[isName] = R.has(field);
		// 取值函数。
		const getName = `get${field}`;
		m[getName] = R.prop(field);
	});

	// functor
	m.fmap = R.curry((f, data) => {
		if (m[isPrimary](data)) {
			return R.pipe(
				m[getPrimary],
				f,
				m[primary]
			)(data);
		}
		else {
			return data
		}
	});

	m.fmapTo = R.curry((x, data) => m.fmap(R.always(x), data));

	// applicative
	m.ap = R.curry((f, data) => {
		const v = m[isPrimary];

		if (!v(f)) {
			return f;
		}
		else if (!v(data)) {
			return data;
		}
		else {
			const k = m[getPrimary];
			const g = k(f);
			const x = k(data);
			return m[primary](g(x));
		}
	});

	// monad
	m.bind = R.curry((f, ma) => {
		const v = m[isPrimary];
		if (v(ma)) {
			const a = m[getPrimary](ma);
			return f(a);
		}
		else {
			return a;
		}
	});

	return m;
};

const Load = Enum("Finish", "Loading");

module.exports = {
	Enum,
	Load
};
