const { testProp, fc } = require("ava-fast-check");
const R = require("rambda");
const Most = require("most");

const { S } = require("../main");

// coc :: a -> b -> b
const coc = R.curry((_, b) => b)

testProp(
	"create stream",
	[fc.array(fc.integer())],
	(t, ns) => {
		return S.create(ob => {
			ns.forEach(n => ob.next(n));
			ob.complete();
		})
			.reduce(R.flip(R.append), [])
			.then(xs => t.deepEqual(ns, xs))
		;
	}
);

testProp(
	"create stream from callback",
	[fc.array(fc.integer())],
	(t, ns) => {
		return S.fromCallback(f => ns.forEach(f))
			.take(ns.length)
			.reduce(R.flip(R.append), [])
			.then(xs => t.deepEqual(ns, xs))
		;
	}
);

testProp(
	"throwError",
	[fc.string()],
	(t, s) => {
		return Most.of(s)
			.concatMap(S.throwError(Error))
			.drain()
			.catch(e => t.true(e.message === s))
		;
	}
);

testProp(
	"throwMsg",
	[fc.string()],
	(t, s) => {
		return Most.of(s)
			.concatMap(S.throwMsg)
			.drain()
			.catch(e => t.true(e.message === s))
		;
	}
);

testProp(
	"throwNil",
	[fc.option(fc.integer()), fc.string()],
	(t, ma, s) => {
		return Most.of(ma)
			.concatMap(S.throwNil(Error, s))
			.reduce(coc, null)
			.then(a => t.true(a === ma))
			.catch(e => t.true(e.message === s))
		;
	}
);

testProp(
	"throwNilMsg",
	[fc.option(fc.integer()), fc.string()],
	(t, ma, s) => {
		return Most.of(ma)
			.concatMap(S.throwNilMsg(s))
			.reduce(coc, null)
			.then(a => t.true(a === ma))
			.catch(e => t.true(e.message === s))
		;
	}
);

testProp(
	"splitBy",
	[fc.array(fc.integer({ min: 10 }))],
	(t, xs) => {
		const origin$ = Most.from(xs);
		const [left$, right$] = origin$.thru(S.splitBy(n => n > 9));

		const left = left$.reduce(R.add, 0);
		const right = right$.reduce(R.add, 0);

		return left.then(left => right.then(right => {
			return t.true(left === R.sum(xs) && 0 === right);
		}));
	}
);

testProp(
	"split",
	[fc.array(fc.boolean())],
	(t, xs) => {
		const origin$ = Most.from(xs);
		const [true$, false$] = origin$.thru(S.split);

		const left = true$.reduce(R.or, true);
		const right = false$.reduce(R.xor, false);

		return left.then(left => right.then(right => {
			return t.true(left === true && right === false);
		}));
	}
);
