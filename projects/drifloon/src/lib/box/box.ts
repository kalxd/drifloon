import { booleanAttribute, Component, computed, input, Signal } from '@angular/core';
import { CssStyleBuilder } from '../internal/cssstylebuilder';

type Align = "left" | "center" | "right";

@Component({
	selector: 'ui-box',
	imports: [],
	templateUrl: './box.html',
	styleUrl: './box.css'
})
export class UiBox {
	align = input<Align | null>(null);
	pad = input(false, { transform: booleanAttribute});

	protected theStyle: Signal<Partial<CSSStyleDeclaration>> = computed(() => {
		const builder = new CssStyleBuilder();
		builder.setOptional("justifyContent", this.align());

		return builder.build();
	});

	protected theKlass = computed(() => {
		return {
			pad: this.pad()
		};
	});
}
