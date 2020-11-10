const { testProp, fc } = require("ava-fast-check");
const R = require("rambda");
const { struct } = require("../main");

const T = struct([
	"id",
	"name"
]);

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
