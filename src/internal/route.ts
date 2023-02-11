// 路由相关

import { Just, Maybe, Nothing } from "purify-ts";

// TS的垃圾枚举
interface LitPath {
	_tag: "LitPath";
	path: string;
}

interface ParamPath {
	_tag: "ParamPath";
	name: string;
}

type PathSegment = LitPath | ParamPath;

const litPath = (path: string): PathSegment => ({
	_tag: "LitPath",
	path
});

const paramPath = (name: string): PathSegment => ({
	_tag: "ParamPath",
	name
});

export interface PathSegments {
	segments: Array<PathSegment>
}

const tryParseParam = (s: string): Maybe<string> => {
	if (s.startsWith(":")) {
		return Just(s.slice(1));
	}
	else {
		return Nothing;
	}
};

export const pathIntoSegments = (path: string): PathSegments => {
	const ss: Array<PathSegment> = path.split("/")
		.map(s => tryParseParam(s)
			 .caseOf({
				 Just: paramPath,
				 Nothing: () => litPath(s)
			 })
		);

	return { segments: ss };
};
