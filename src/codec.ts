export * from "purify-ts/Codec";

import { Codec } from "purify-ts/Codec";
import * as FP from "purify-ts/Codec";

const takeUnderscorePrefix = (input: string): [string, string] => {
	let prefix = "";
	let i = 0;
	while (i < input.length) {
		const c = input[i];
		if (c === "_") {
			prefix += c;
			++i;
		}
		else {
			break;
		}
	}

	const rest = input.substring(i);
	return [prefix, rest];
};

// _a_ab => _aAb
// a_ab => aAb
type ToCamelCase<T extends string> = T extends `_${infer Rest}`
	? `_${ToCamelCase<Rest>}`
	: T extends `${infer First}_${infer Rest}`
	? `${First}${Capitalize<ToCamelCase<Rest>>}`
	: T;

const capitalize = (input: string): string => {
	if (input === "") {
		return input;
	}

	const f = input[0];
	const rest = input.substring(1);
	return f.toUpperCase() + rest;
};

const toCamelCase = <T extends string>(input: T): ToCamelCase<T> => {
	const [prefix, rest] = takeUnderscorePrefix(input);
	const [firstWord, ...restWord] = rest.split("_");
	const capitalWord = restWord.map(capitalize).join("");
	return `${prefix}${firstWord}${capitalWord}` as ToCamelCase<T>;
};

type SnakeCodecMap = Record<string, Codec<any>>;
type SnakeCodecMapOutput<T extends SnakeCodecMap> = {
	[K in keyof T as ToCamelCase<K & string>]: T[K]
};

const camelCaseCodec = <T extends SnakeCodecMap>(input: T): SnakeCodecMapOutput<T> => {
	let result = {} as SnakeCodecMapOutput<T>;

	for (const k in input) {
		type Key = keyof SnakeCodecMapOutput<T>;
		const camelCaseKey = toCamelCase(k) as Key;
		result[camelCaseKey] = input[k] as SnakeCodecMapOutput<T>[Key];
	}

	return result;
};

const a = camelCaseCodec({
	a_b: FP.string,
	your_name: FP.number
});

console.log(a);

// _aAb => _a_ab
// aAb => a_ab
type ToSnakeCase<T extends string> = T extends `_${infer Rest}`
	? `_${ToSnakeCase<Rest>}`
	: T extends `${infer FirstChar}${infer Rest}`
	? `${FirstChar extends Capitalize<FirstChar> ? "_" : ""}${Lowercase<FirstChar>}${ToSnakeCase<Rest>}`
	: T;
