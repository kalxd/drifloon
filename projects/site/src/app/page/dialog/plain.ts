import { Component } from "@angular/core";
import { UiBaseDialog, UiDialog } from "drifloon";

@Component({
	selector: "page-plain",
	templateUrl: "./plain.html",
	imports: [
		UiDialog
	]
})
export class PagePlain extends UiBaseDialog<void, void> {}
