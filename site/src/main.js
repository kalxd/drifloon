"use strict";
exports.__esModule = true;
var m = require("mithril");
var drifloon_1 = require("drifloon/");
var app = {
    view: function () {
        return m(drifloon_1.Columns, [
            m(drifloon_1.Column, { size: drifloon_1.ColumSize.Three }, [
                m(drifloon_1.Menu, [
                    m(drifloon_1.MenuLabel, "菜单"),
                    m(drifloon_1.MenuList, [
                        m(drifloon_1.MenuItem, "item 1"),
                        m(drifloon_1.MenuItem, "item 2")
                    ])
                ])
            ]),
            m(drifloon_1.Column, { isNarrow: false }),
        ]);
    }
};
var mountNode = document.getElementById("app");
if (mountNode !== null) {
    m.mount(mountNode, app);
}
