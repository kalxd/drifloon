const { testProp, fc } = require("ava-fast-check");
const R = require("ramda");
const Most = require("most");

const { S } = require("../main");

// coc :: a -> b -> b
const coc = R.curry((a, b) => b)

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

testProp(
	"throwError",
	[fc.string()],
	s => {
		return Most.of(s)
			.concatMap(S.throwError(Error))
			.drain()
			.catch(e => e.message === s)
		;
	}
);

testProp(
	"throwMsg",
	[fc.string()],
	s => {
		return Most.of(s)
			.concatMap(S.throwMsg)
			.drain()
			.catch(e => e.message === s)
		;
	}
);

testProp(
	"throwNil",
	[fc.option(fc.integer()), fc.string()],
	(ma, s) => {
		return Most.of(ma)
			.concatMap(S.throwNil(Error, s))
			.reduce(coc, null)
			.then(a => a === ma)
			.catch(e => e.message === s)
		;
	}
);

testProp(
	"throwNilMsg",
	[fc.option(fc.integer()), fc.string()],
	(ma, s) => {
		return Most.of(ma)
			.concatMap(S.throwNilMsg(s))
			.reduce(coc, null)
			.then(a => a === ma)
			.catch(e => e.message === s)
		;
	}
);
