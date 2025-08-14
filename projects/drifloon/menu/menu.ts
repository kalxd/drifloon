import { booleanAttribute, Component, input } from "@angular/core";

@Component({
	selector: "fui-menu",
	styleUrl: "./menu.css",
	templateUrl: "./menu.html"
})
export class FUIMenu {
	primary = input(false, { transform: booleanAttribute });
	secondary = input(false, { transform: booleanAttribute });
	right = input(false, { transform: booleanAttribute });

	protected theCssClass(): Record<string, boolean> {
		return {
			primary: this.primary(),
			secondary: this.secondary(),
			right: this.right()
		}
	}
}
