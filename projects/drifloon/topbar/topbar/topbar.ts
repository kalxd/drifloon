import { Component } from "@angular/core";

@Component({
	selector: "ui-topbar",
	styleUrl: "./topbar.css",
	template: `<div class="ui topbar"><ng-content /></div>`
})
export class UiTopBar {}
