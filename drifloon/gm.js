const R = require("ramda");
const Most = require("most");
const Observable = require("zen-observable");

/** GM基本定义 */
// info :: () -> Record
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

// getResourceText :: String -> IO (Maybe String)
const getResourceText = name => GM_getResourceText(name);

// getResourceUrl :: String -> IO (Maybe String)
const getResourceUrl = name => GM_getResourceURL(name);

// addStyle :: String -> Stream String
const addStyle = text => Most.fromPromise(GM_addStyle(text));


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

// ajax :: Option -> Stream a
const ajax = ajax_(R.identity);

// json :: JSON a => Option -> Stream a
const json = ajax_(R.assoc("responseType", "json"));

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
	getResourceText,
	getResourceUrl,

	ajax,
	json,

	injectCSS
};
