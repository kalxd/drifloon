/** 不涉及跨域问题，可以使用该模块 */
const R = require("ramda");
const Most = require("most");

/**
 * type Body = {|r}
 * type Query = {|r}
 */

// toQueryString :: Query -> String
const toQueryString = R.compose(
	R.join("&"),
	R.map(R.join("=")),
	R.toPairs
);

// compactQuery :: Url -> Maybe Query -> Url
const compactQuery = R.curry((url, query) => {
	if (R.isNil(query) || R.isEmpty(query)) {
		return url;
	}
	else {
		return `${url}?${toQueryString(query)}`;
	}
});

// send :: Url -> FetchOption -> Stream a
const send = R.curry((url, option) => {
	const r = fetch(url, option);
	return Most.fromPromise(r);
});

// send_ :: Url -> Stream a
const send_ = url => {
	const r = fetch(url);
	return Most.fromPromise(r);
};

// json :: Url -> FetchOption -> Stream JSON
const json = R.curry((url, option) => {
	const r = fetch(url, option).then(r => r.json());
	return Most.fromPromise(r);
});

// json_ :: Url -> Stream JSON
const json_ = url => {
	const r = fetch(url).then(r => r.json());
	return Most.fromPromise(r);
};

module.exports = {
	compactQuery,

	send,
	send_,
	json,
	json_
};
