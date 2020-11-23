/**
 * Comfey模块的js实现。
 * 需要依赖comfey项目。
 */
const Modal = require("./modal");
const Alert = require("./alert");
const Confirm = require("./confirm");

const { injectCSS } = require("../gm")

// inject :: () -> IO (Maybe Element)
const inject = () => injectCSS("comfey");

module.exports = {
	inject,
	...Modal,
	...Alert,
	...Confirm
};
