import { Component, HostBinding, input } from '@angular/core';
import { CssStyleBuilder } from '../ty';

@Component({
	selector: 'ui-item',
	imports: [],
	templateUrl: './item.html',
	styleUrl: './item.css',
})
export class UiItem {
	grow = input<number | null>(null);

	@HostBinding("style")
	get style(): Partial<CSSStyleDeclaration> {
		let cssBuilder = new CssStyleBuilder();
		cssBuilder.setJust("flexGrow", this.grow()?.toString());

		return cssBuilder.build();
	}

	protected theStyle(): Record<string, any> {
		return {
			"flex-grow": this.grow()
		};
	}
}
