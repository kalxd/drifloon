const { testProp, fc } = require("ava-fast-check");
const R = require("rambda");
const { struct } = require("../main");

const T = struct(
	"id",
	["name"]
);

const P = struct(
	"id",
	["age", "year"],
	["t", T],
	["value", "tt", T]
);

testProp(
	"create struct",
	[fc.nat(), fc.string()],
	(t, id, name) => {
		const o = T.gen(id, name);

		const sort = R.sort(R.max);

		const a1 = sort([id, name]);
		const a2 = sort(T.values(o));
		return t.deepEqual(a1, a2);
	}
);

testProp(
	"struct Lens",
	[
		fc.record({
			id: fc.nat(),
			name: fc.string()
		})
	],
	(t, o) => {
		const nextId = R.inc(o.id);
		const nextO = R.over(T.idLens, R.inc, o);

		return t.true(R.propEq("id", nextId, nextO));
	}
);

testProp(
	"struct -> json",
	[
		fc.nat(),
		fc.nat(),
		fc.record({
			id: fc.nat(),
			name: fc.string()
		})
	],
	(t, id, age, value) => {
		const p = P.gen(id, age, value, value);
		const json = P.toJSON(p);

		const v = R.where({
			id: R.is(Number),
			year: R.is(Number),
			t: R.where({
				id: R.is(Number),
				name: R.is(String)
			}),
			tt: R.where({
				id: R.is(Number),
				name: R.is(String)
			})
		});

		return t.true(v(json));
	}
);

testProp(
	"json -> struct",
	[
		fc.record({
			key: fc.nat(),
			year: fc.nat(),
			id: fc.nat(),
			tt: fc.record({
				id: fc.nat(),
				name: fc.string(),
			}),
			value: fc.string(),
			t: fc.record({
				id: fc.nat(),
				name: fc.string()
			})
		})
	],
	(t, json) => {
		const p = P.fromJSON(json);

		const v = R.where({
			id: R.is(Number),
			age: R.is(Number),
			value: R.where({
				id: R.is(Number),
				name: R.is(String)
			}),
			t: R.where({
				id: R.is(Number),
				name: R.is(String)
			})
		});

		return t.true(v(p));
	}
);
