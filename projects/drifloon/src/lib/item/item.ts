import { Component, HostBinding, input } from '@angular/core';
import { CssStyleBuilder } from '../internal';

type Align = "left" | "right" | "center";

@Component({
	selector: 'ui-item',
	imports: [],
	templateUrl: './item.html',
	styleUrl: './item.css',
})
export class UiItem {
	grow = input<number | null>(null);
	textAlign = input<Align | null>(null);

	@HostBinding("style")
	get style(): Partial<CSSStyleDeclaration> {
		let cssBuilder = new CssStyleBuilder();
		cssBuilder.setOptional("flexGrow", this.grow()?.toString());
		cssBuilder.setOptional("textAlign", this.textAlign());

		return cssBuilder.build();
	}

	protected theStyle(): Record<string, any> {
		return {
			"flex-grow": this.grow()
		};
	}
}
