const R = require("ramda");
const Most = require("most");
const Observable = require("zen-observable");

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

// addStyle :: String -> Stream String
const addStyle = text => Most.fromPromise(GM_addStyle(text));

// ajax_ :: (Option a -> Option b) -> Option a -> Stream c
const ajax_ = R.curry((f, option) => {
	const o = new Observable(ob => {
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

	return Most.from(o);
});

// ajax :: Option -> Stream a
const ajax = ajax_(R.identity);

// json :: JSON a => Option -> Stream a
const json = ajax_(R.assoc("responseType", "json"));

// setClipboard :: String -> String -> IO ()
const setClipboard = R.curry((data, type) => GM_setClipboard(data, type));

// setClipboardPlain :: String -> IO ()
const setClipboardPlain = R.flip(setClipboard)("text/plain");

// download :: Option -> IO ()
const download = option => GM_download(option);

// downloadUrl :: String -> Url -> IO ()
const downloadUrl = R.curry((name, url) => GM_download(url, name));

// notify :: Option -> IO ()
const notify = option => GM_notification(option);

// notifyText :: String -> String -> IO ()
const notifyText = R.curry((title, text) => GM_notification(text, title));

/** end */

/** 在GM基础上，扩展出更强的功能 */
// injectCSS :: String -> Stream String
const injectCSS = R.compose(
	addStyle,
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
	json,

	setClipboard,
	setClipboardPlain,
	download,
	downloadUrl,
	notify,
	notifyText,

	injectCSS
};
