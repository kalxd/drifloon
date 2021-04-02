const { testProp, fc } = require("ava-fast-check");
const R = require("rambda");
const { Data: { Struct } } = require("../../main");

const S = Struct(
	"id",
	["name"]
);

const P = Struct(
	"id",
	["age", "year"],
	["t", S],
	["value", "tt", S]
);

testProp(
	"create Struct",
	[fc.nat(), fc.string()],
	(t, id, name) => {
		const o = S.gen(id, name);

		const sort = R.sort(R.max);

		const a1 = sort([id, name]);
		const a2 = sort(S.values(o));
		return t.deepEqual(a1, a2);
	}
);

testProp(
	"Struct Lens",
	[
		fc.record({
			id: fc.nat(),
			name: fc.string()
		})
	],
	(t, o) => {
		const nextId = R.inc(o.id);
		const nextO = R.over(S.idLens, R.inc, o);

		return t.true(R.propEq("id", nextId, nextO));
	}
);

testProp(
	"Struct -> json",
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
	"json -> Struct",
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

testProp(
	"Struct复杂类型",
	[
		fc.record({
			id: fc.nat(),
			name: fc.option(fc.string()),
			items: fc.array(fc.record({
				key: fc.nat(),
				prod: fc.option(fc.string())
			}))
		})
	],
	(t, json) => {
		const ItemType = Struct(
			"key",
			["name", "prod"]
		);

		const T = Struct(
			"id",
			"name",
			["items", ItemType]
		);

		const output = T.fromJSON(json);

		const b1 = t.deepEqual(
			R.pick(["id", "name"], json),
			R.pick(["id", "name"], output)
		);

		const b2 = t.deepEqual(
			output.items,
			R.map(ItemType.fromJSON, json.items)
		);

		return b1 && b2;
	}
);
