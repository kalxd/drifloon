const R = require("rambda");
const S = require("./stream");
const { fmap, isJust } = require("./function");

// getValueOr :: JSON a => a -> String -> IO a
const getValueOr = R.curry((def, key) => GM_getValue(key, def));

// getValue :: JSON a => String -> IO (Maybe a)
const getValue = key => GM_getValue(key);

// setValue :: JSON a => String -> a -> IO ()
const setValue = R.curry((key, value) => GM_setValue(key, value));

// deleteValue :: String -> IO ()
const deleteValue = key => GM_deleteValue(key);

// listAllKey :: () -> IO [String]
const listAllKey = () => GM_listValues();

// listAllValue :: JSON a => () -> IO [a]
const listAllValue = R.compose(
	R.map(getValue),
	listAllKey
);

// clearAllValue :: () -> IO ()
const clearAllValue = R.compose(
	R.map(deleteValue),
	listAllKey
);

// getResourceText :: String -> IO (Maybe String)
const getResourceText = name => GM_getResourceText(name);

// getResourceUrl :: String -> IO (Maybe String)
const getResourceUrl = name => GM_getResourceURL(name);

// addStyle :: String -> IO Element
const addStyle = text => GM_addStyle(text);

// mkRequest :: (Option a -> Option b) -> Option a -> Stream c
const mkRequest = R.curry((f, option) => {
	return S.create(ob => {
		const ok = r => {
			ob.next(r);
			ob.complete();
		};

		const no = e => ob.error(e);

		const option_ = R.pipe(
			f,
			R.assoc("onload", ok),
			R.assoc("onerror", no)
		)(option);

		GM_xmlhttpRequest(option_);
	});
});

// takeResponse :: Stream Response -> Stream a
const takeResponse = input$ => input$.map(R.prop("response"));

// ajax_ :: Option -> Stream Response
const ajax_ = mkRequest(R.identity);

// ajax :: Option -> String
const ajax = R.compose(
	takeResponse,
	ajax_
);

// json_ :: Option -> Stream Response
const json_ = mkRequest(R.assoc("responseType", "json"));

// json :: JSON a => Option -> Stream a
const json = R.compose(
	takeResponse,
	json_
);

// setClipboard :: String -> String -> IO ()
const setClipboard = R.curry((data, type) => GM_setClipboard(data, type));

// setClipboardPlain :: String -> IO ()
const setClipboardPlain = R.flip(setClipboard)("text/plain");

// download :: Option -> Stream ()
const download = option => {
	const download$ = S.create(ob => {
		const ok = r => {
			ob.next(r);
			ob.complete();
		};
		const err = e => {
			ob.error(e);
		};

		const option_ = R.pipe(
			R.assoc("onload", ok),
			R.assoc("onerror", err)
		)(option);

		GM_download(option_);
	});

	const filter$ = download$
		.multicast()
		.recoverWith(e => {
			if (e.error === "Download canceled by the user") {
				return Most.of(null);
			}
			else {
				return Most.throwError(e);
			}
		})
	;

	// 用户点击取消，直接订阅掉该条流。
	filter$.filter(R.isNil).drain();

	return filter$.filter(isJust);
};

// downloadUrl :: String -> Url -> IO (() -> IO ())
const downloadUrl = R.curry((name, url) => GM_download(url, name));

// notify :: Option -> Stream Bool
const notify = option => {
	return S.create(ob => {
		GM_notification(option, b => {
			ob.next(b);
			ob.complete();
		});
	});
};

// notifyText :: String -> String -> IO ()
const notifyText = R.curry((title, text) => GM_notification(text, title));
/** end */

/** 在GM基础上，扩展出更强的功能 */
// injectCSS :: String -> IO (Maybe Element)
const injectCSS = R.compose(
	fmap(addStyle),
	getResourceText
);
/** end */

module.exports = {
	getValueOr,
	getValue,
	setValue,
	deleteValue,
	listAllKey,
	listAllValue,
	clearAllValue,

	addStyle,
	getResourceText,
	getResourceUrl,

	ajax,
	ajax_,
	json,
	json_,

	setClipboard,
	setClipboardPlain,
	download,
	downloadUrl,
	notify,
	notifyText,

	injectCSS
};
