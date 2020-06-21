const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");

const { S } = require("../main");

testProp(
	"create stream",
	[fc.array(fc.integer())],
	ns => {
		return S.create(ob => {
			ns.forEach(n => ob.next(n));
			ob.complete();
		})
			.reduce(R.flip(R.append), [])
			.then(R.equals(ns))
		;
	}
);

testProp(
	"create stream from callback",
	[fc.array(fc.integer())],
	ns => {
		return S.fromCallback(f => ns.forEach(f))
			.take(ns.length)
			.reduce(R.flip(R.append), [])
			.then(R.equals(ns))
		;
	}
);
