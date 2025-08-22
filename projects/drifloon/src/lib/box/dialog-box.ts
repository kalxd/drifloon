import { Component, output } from "@angular/core";
import { UiBox } from "./box";

@Component({
	selector: "ui-dialog-box",
	imports: [UiBox],
	styleUrl: "./dialogbox.css",
	templateUrl: "./dialogbox.html"
})
export class UiDialogBox {
	cancel = output<void>();
	ok = output<void>();
	submit = output<boolean>();

	protected connectCancel(): void {
		this.cancel.emit();
		this.submit.emit(false);
	}

	protected connectOk(): void {
		this.ok.emit();
		this.submit.emit(true);
	}
}
