import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagerInput, UiFormField, UiPager } from 'drifloon';

@Component({
	selector: 'site-pager',
	imports: [
		UiFormField,
		FormsModule,
		UiPager
	],
	templateUrl: './pager.html',
	styleUrl: './pager.css'
})
export class SitePager {
	page = signal(1);
	size = signal(10);
	count = signal(100);

	protected changeHistory = signal<Array<number>>([]);

	protected thePager(): PagerInput {
		return {
			page: this.page(),
			count: this.count(),
			size: this.size()
		};
	}

	protected connectPageChange(page: number): void {
		this.changeHistory.update(xs => {
			xs.unshift(page);
			return xs;
		});

		this.page.set(page);
	}
}
