import { Component, computed, input, output, Signal } from '@angular/core';

export interface PagerInput {
	page: number;
	size: number;
	count: number;
}

interface PagerResult {
	page: number;
	prevPage: number;
	nextPage: number;
	totalPage: number;
}

@Component({
	selector: 'ui-pager',
	imports: [],
	templateUrl: './pager.html',
	styleUrl: './pager.css'
})
export class UiPager {
	pager = input.required<PagerInput>();

	pageChange = output<number>();

	protected pagerResult: Signal<PagerResult> = computed(() => {
		const pager = this.pager();
		const totalPage = Math.ceil(pager.count / pager.size);
		const prevPage = Math.max(1, pager.page - 1);
		const nextPage = Math.min(totalPage, pager.page + 1);

		return {
			page: pager.page,
			prevPage,
			nextPage,
			totalPage,
		};
	});

	protected connectToPage(page: number): void {
		this.pageChange.emit(page);
	}
}
