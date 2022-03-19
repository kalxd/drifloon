import * as m from "mithril";
import Router from "./Route";

const mountNode = document.getElementById("app");

if (mountNode !== null) {
	m.route(mountNode, "/", Router);
}
