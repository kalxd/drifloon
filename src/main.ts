import * as m from "mithril";

import { Button } from "./element/button";

const mountNode = document.getElementById("app");

if (mountNode !== null) {
	m.mount(mountNode, Button);
}
