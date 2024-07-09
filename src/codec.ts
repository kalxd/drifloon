export * from "purify-ts/Codec";

import { Either } from "purify-ts";
import { Codec, GetType, string as stringc } from "purify-ts/Codec";

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

	const f = input[0]!;
	const rest = input.substring(1);
	return f.toUpperCase() + rest;
};

const toCamelCase = <T extends string>(input: T): ToCamelCase<T> => {
	const [prefix, rest] = takeUnderscorePrefix(input);
	const [firstWord, ...restWord] = rest.split("_");
	const capitalWord = restWord.map(capitalize).join("");
	return `${prefix}${firstWord}${capitalWord}` as ToCamelCase<T>;
};

type ToCamelCaseProp<T> = {
	[K in keyof T as ToCamelCase<T & string>]: T[K];
};

const toCamelCaseProp = <T>(prop: T): ToCamelCaseProp<T> => {
	type Key = keyof ToCamelCaseProp<T>;
	let result = {} as ToCamelCaseProp<T>;
	for (const k in prop) {
		const key = toCamelCase(k) as Key;
		result[key] = prop[k] as any;
	}
	return result;
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
	const x = input[0]!;
	if (reg.test(x)) {
		const xs = input.substring(1);
		const index = xs.search(reg);
		if (index === -1) {
			return [input];
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

type ToSnakeCaseProp<T> = {
	[K in keyof T as ToSnakeCase<K & string>]: T[K];
};

const toSnakeCaseProp = <T>(prop: T): ToSnakeCaseProp<T> => {
	type Key = keyof ToSnakeCaseProp<T>;
	let result = {} as ToSnakeCaseProp<T>;
	for (const k in prop) {
		const key = toSnakeCase(k) as Key;
		result[key] = prop[k] as any;
	}

	return result;
};

type ToCamelCaseCodec<T extends CodecInterface> = {
	[K in keyof T as ToCamelCase<K & string>]: GetType<T[K]>
};

export const camelCaseCodec = <T extends CodecInterface>(prop: T): Codec<ToCamelCaseCodec<T>> => {
	const snakeCodec = Codec.interface(toSnakeCaseProp(prop));

	return Codec.custom<ToCamelCaseCodec<T>>({
		decode: input => {
			return snakeCodec.decode(input)
				.map(obj => toCamelCaseProp(obj) as any);
		},
		encode: toSnakeCaseProp
	});
};

type ToSnakeCaseCodec<T extends CodecInterface> = {
	[K in keyof T as ToSnakeCase<K & string>]: GetType<T[K]>;
};

export const snakeCaseCode = <T extends CodecInterface>(prop: T): Codec<ToSnakeCaseCodec<T>> => {
	const camelCodec = Codec.interface(toCamelCaseProp(prop));

	return Codec.custom<ToSnakeCaseCodec<T>>({
		decode: input => {
			return camelCodec.decode(input)
				.map(obj => toSnakeCaseProp(obj) as any);
		},
		encode: toCamelCaseProp
	});
};

export const urlc = Codec.custom({
	decode: input => {
		return stringc.decode(input)
			.map(url => {
				if (url.startsWith("http")) {
					return url;
				}
				else {
					return `http://${url}`;
				}
			})
			.chain(url => {
				return Either.encase(() => new URL(url))
					.mapLeft(_ => `${url}不是有合法的URL`);
			});
	},
	encode: input => input.toString()
});
