export * from "purify-ts/Codec";

import { Codec, GetType } from "purify-ts/Codec";
import * as FP from "purify-ts/Codec";

type CodecInterface = Record<string, Codec<any>>;

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

// _aAb => _a_ab
// aAb => a_ab
type ToSnakeCase<T extends string> = T extends `_${infer Rest}`
	? `_${ToSnakeCase<Rest>}`
	: T extends `${infer FirstChar}${infer Rest}`
	? `${FirstChar extends Capitalize<FirstChar> ? "_" : ""}${Lowercase<FirstChar>}${ToSnakeCase<Rest>}`
	: T;

const splitCamelCase = (input: string): Array<string> => {
	const reg = /[A-Z]/;
	const x = input[0];
	if (reg.test(x)) {
		const xs = input.substring(1);
		const index = xs.search(reg);
		if (index === -1) {
			return [x + input];
		}

		const curWord = x + xs.substring(0, index);
		const restWord = xs.substring(index);
		return [curWord, ...splitCamelCase(restWord)];
	}
	else {
		const index = input.search(reg);
		if (index === -1) {
			return [input];
		}
		const curWord = input.substring(0, index);
		const restWord = input.substring(index);
		return [curWord, ...splitCamelCase(restWord)];
	}
};

const toSnakeCase = <T extends string>(input: T): ToSnakeCase<T> => {
	const [prefix, rest] = takeUnderscorePrefix(input);
	const word = splitCamelCase(rest).map(x => x.toLowerCase()).join("_");
	return prefix + word as ToSnakeCase<T>;
};

console.log(toSnakeCase("__CamsYYouXixi"));

type ToCamelCaseCodec<T extends CodecInterface> = {
	[K in keyof T as ToCamelCase<K & string>]: T[K]
};

/*
export const camelCaseCodec = <T extends CodecInterface>(prop: T): ToCamelCase<T> => {
	const innserSnakeCodec = {} as ToCamelCaseCodec<T>;
	for (const k in prop) {
		const snakeKey = 0;
	}


	const innerCodec = Codec.custom<ToCamelCaseCodec<T>>({
		decode: input => {},
		encode: self => {}
		});

		};
*/
