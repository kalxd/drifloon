import { curry } from "purify-ts/Function";

interface Dog {
	name: string;
}

const f = curry(<T, R extends Dog>(a: T, b: R): void => {
	console.log(a);
	console.log(b.name);
});

f(1, 2);

f("hello")(1)
