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

// _send :: Url -> Option -> Stream a
const send = R.curry((url, option) => {
	const r = fetch(url, option);
	return Most.fromPromise(r);
});

// json :: JSON a => Url -> Option -> Stream a
const json = R.curry((url, option) => {
	const r = fetch(url, option).then(r => r.json());
	return Most.fromPromise(r);
});

// mkGet :: JSON a => String -> Url -> Query -> Stream a
const mkGet = R.curry((method, url, query) => {
	const option = {
		method,
		headers: {
			"Content-Type": "application/json"
		}
	};

	const url_ = (url => {
		if (R.isEmpty(query)) {
			return url;
		}
		else {
			return `${url}?${toQueryString(query)}`;
		}
	})(url);

	return json(url_, option);
});

// mkPost :: JSON a => String -> Url -> Body -> Stream a
const mkPost = R.curry((method, url, body) => {
	const option = {
		method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	};

	return json(url, option);
});

// get :: JSON a => Url -> Query -> Stream a
const get = mkGet("GET");

// get_ :: JSON a => Url -> Stream a
const get_ = R.flip(get)({});

// post :: JSON a => Url -> Body -> Stream a
const post = mkPost("POST");

// post_ :: JSON a => Url -> Stream a
const post_ = R.flip(post)({});

// put :: JSON a => Url -> Body -> Stream a
const put = mkPost("PUT");

// put_ :: JSON a => Url -> Stream a
const put_ = R.flip(put)({});

// patch :: JSON a => Url -> Body -> Stream a
const patch = mkPost("PATCH");

// patch_ :: JSON a => Url -> Stream a
const patch_ = R.flip(patch)({});

// del :: JSON a => Url -> Query -> Stream a
const del = mkGet("DELETE");

// del_ :: JSON a => Url -> Stream a
const del_ = R.flip(DELETE)({});

module.exports = {
	send,
	json,

	GET,
	GET_,
	post,
	post_,
	put,
	put_,
	patch,
	patch_,
	del,
	del_
};
