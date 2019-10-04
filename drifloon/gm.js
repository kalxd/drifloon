const R = require("ramda");
const { Observable } = require("rxjs");

/** GM基本定义 */
const info = () => GM_info;

const getValueOr = R.curry((def, key) => GM_getValue(key, def));
const getValue = key => GM_getValue(key);

const setValue = R.curry((key, value) => GM_setValue(key, value));

const deleteValue = key => GM_deleteValue(key);

const listValues = () => GM_listValues();

const getResourceText = name => GM_getResourceText(name);

const getResourceUrl = name => GM_getResourceUrl(name);

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

exports.info = info;
exports.getValueOr = getValueOr;
exports.getValue = getValue;
exports.setValue = setValue;
exports.deleteValue = deleteValue;
exports.listValues = listValues;
exports.getResourceText = getResourceText;
exports.getResourceUrl = getResourceUrl;
exports.addStyle = addStyle;
exports.openInTabWith = openInTabWith;
exports.openInTab = openInTab;
exports.registerMenuCommand = registerMenuCommand;
exports.unregisterMenuCommand = unregisterMenuCommand;
exports.notificationWith = notificationWith;
exports.notification = notification;
exports.setClipboardWith = setClipboardWith;
exports.setClipboard = setClipboard;
exports.xmlhttpRequest = xmlhttpRequest;
exports.ajax = ajax;
exports.json = json;
exports.downloadWith = downloadWith;
exports.download = download;

exports.injectCSS = injectCSS;
