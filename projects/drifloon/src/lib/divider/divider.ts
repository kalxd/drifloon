import { booleanAttribute, Component, input } from '@angular/core';

@Component({
	selector: 'ui-divider',
	imports: [],
	templateUrl: './divider.html',
	styleUrl: './divider.css'
})
export class UiDivider {
	transparent = input(false, { transform: booleanAttribute });
	pad = input(false, { transform: booleanAttribute });

	theClass(): Record<string, boolean> {
		return {
			transparent: this.transparent(),
			pad: this.pad()
		};
	}
}
