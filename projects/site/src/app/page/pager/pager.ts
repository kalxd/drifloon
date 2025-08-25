import { Component, computed, inject, Injectable, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagerInput, UiFormField, UiPager } from 'drifloon';

@Injectable({
	providedIn: "root"
})
class PagerState {
	page = signal(12);
	size = signal(1);
	count = signal(10);

	pager = computed<PagerInput>(() => {
		return {
			page: this.page(),
			count: this.count(),
			size: this.size()
		};
	});
}

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
	pagerState = inject(PagerState);

	protected changeHistory = signal<Array<number>>([]);

	protected connectPageChange(page: number): void {
		this.changeHistory.update(xs => {
			xs.unshift(page);
			return xs;
		});

		this.pagerState.page.set(page);
	}
}
