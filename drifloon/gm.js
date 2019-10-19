const R = require("ramda");
const { Observable } = require("rxjs");

/** GM基本定义 */
const info = () => GM_info;

// getValueOr :: ToJSON a => a -> String -> IO a
const getValueOr = R.curry((def, key) => GM_getValue(key, def));

// getValue :: ToJSON a => String -> IO (Maybe a)
const getValue = key => GM_getValue(key);

// setValue :: ToJSON a => String -> a -> IO ()
const setValue = R.curry((key, value) => GM_setValue(key, value));

// deleteValue :: String -> IO ()
const deleteValue = key => GM_deleteValue(key);

// listValue :: () -> IO [a]
const listValue = () => GM_listValues();

const getResourceText = name => GM_getResourceText(name);

const getResourceUrl = name => GM_getResourceUrl(name);

// addStyle :: String -> IO ()
const addStyle = text => GM_addStyle(text);

const openInTabWith = R.curry((option, url) => GM_openInTab(url, option));
const openInTab = url => GM_openInTab(url);

const registerMenuCommand = R.curry((caption, f) => GM_registerMenuCommand(caption, f));

const unregisterMenuCommand = caption => GM_registerMenuCommand(caption);

const notificationWith = option => GM_notification(option);
const notification = R.curry((title, text) => GM_notification(text, title));

const setClipboardWith = R.curry((type, data) => GM_setClipboard(data, type));
const setClipboard = data => GM_setClipboard(data);

const xmlhttpRequest = option => GM_xmlhttpRequest(option);

// ajax_ :: (Option a -> Option b) -> Option a -> Stream c
const ajax_ = R.curry((f, option) => {
	return new Observable(ob => {
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

const ajax = ajax_(R.identity);

const json = ajax_(R.assoc("responseType", "json"));

const downloadWith = option => GM_download(option);
const download = R.curry((name, url) => GM_download(url, name));

/** end */

/** 在GM基础上，扩展出更强的功能 */
const injectCSS = R.compose(
	addStyle,
	getResourceText
);
/** end */

module.exports = {
	info,
	getValueOr,
	getValue,
	setValue,
	deleteValue,
	listValue,
	addStyle,
	ajax,
	json,

	injectCSS
};
