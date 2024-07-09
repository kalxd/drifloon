import { Either, Left, Right } from "purify-ts";

// TS的垃圾枚举
interface LitPath {
	_tag: "LitPath";
	path: string;
}

interface ParamPath {
	_tag: "ParamPath";
	name: string;
}

interface VariadicPath {
	_tag: "VariadicPath";
	name: string;
}

type PathSegment = LitPath | ParamPath | VariadicPath;

const parseParamPath = (input: string): Either<string, PathSegment> => {
	const [prefix, ...xs] = input.split("");
	if (prefix !== ":") {
		return Left(`${input}没有:开头`);
	}

	const [a, b, c] = xs.reverse();
	if (`${a}${b}${c}` === "...") {
		return Left(`${input}不能解释为VairadicPath`);
	}
	return Right({
		_tag: "ParamPath",
		name: xs.join("")
	});
};

const parseVariadicPath = (input: string): Either<string, PathSegment> => {
	const [prefix, ...xs] = input.split("");
	if (prefix !== ":") {
		return Left(`${input}没有:开头`);
	}
	const [a, b, c, ...ys] = xs.reverse();
	if (`${a}${b}${c}` !== "...") {
		return Left(`${input}没有...结尾`);
	}

	return Right({
		_tag: "VariadicPath",
		name: ys.reverse().join("")
	});
};

const parsePath = (input: string): PathSegment => {
	return parseVariadicPath(input)
		.altLazy(() => parseParamPath(input))
		.orDefaultLazy(() => ({ _tag: "LitPath", path: input }));
};

export interface PathSegments {
	segments: Array<PathSegment>
}

const splitPath = (path: string): Array<string> => {
	return path.split("/")
		.map(s => s.trim())
		.filter(s => s.length !== 0);
};

export const pathIntoSegments = (path: string): PathSegments => {
	const ss: Array<PathSegment> = splitPath(path)
		.map(parsePath);

	return { segments: ss };
};

export const isMatchUrl = (pathsegments: PathSegments, path: string): boolean => {
	const paths = splitPath(path);

	if (paths.length > pathsegments.segments.length) {
		return false;
	}

	for (let i = 0; i < pathsegments.segments.length; ++i) {
		const segment = pathsegments.segments[i]!;
		if (segment._tag === "LitPath") {
			if (paths[i] === null || paths[i] !== segment.path) {
				return false;
			}
		}
		else if (segment._tag === "ParamPath") {
			if (paths[i] === null) {
				return false;
			}
		}
		else {
			if (paths[i] !== null) {
				return true;
			}
		}
	}

	return true;
};
