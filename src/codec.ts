export * from "purify-ts/Codec";

// _a_ab => _aAb
// a_ab => aAb
type ToCamelCase<T> = T extends `_${infer Rest}`
	? `_${ToCamelCase<Rest>}`
	: T extends `${infer First}_${infer Rest}`
	? `${First}${Capitalize<ToCamelCase<Rest>>}` : T;

// _aAb => _a_ab
// aAb => a_ab
type ToSnakeCase<T> = T extends `_${infer Rest}`
	? `_${ToSnakeCase<Rest>}`
	: T extends `${infer FirstChar}${infer Rest}`
	? `${FirstChar extends Capitalize<FirstChar> ? "_" : ""}${Lowercase<FirstChar>}${ToSnakeCase<Rest>}`
	: T;

/*
const takeUnderscoreWhile = <T extends string>(key: T): [T, T] => {
	const prefix = "";
};

const toCamelCaseString = <T extends string>(key: T): ToCamelCase<T> => {
};

const toCamelCase = <T, K extends keyof T & string>(input: T): ToCamelCase<T> => {
	let result = {} as ToCamelCase<T>;

	for (const k in input) {
	}

	return result;
};
*/
