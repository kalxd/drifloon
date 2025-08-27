import { Component, computed, input, output } from '@angular/core';

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
	selectPages: Array<number>;
}

const range = (start: number, end: number): Array<number> => {
	let xs = [];
	for (let i = start; i <= end; ++i) {
		xs.push(i);
	}

	return xs;
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
	pageOnlyChange = output<number>();

	protected pagerResult = computed<PagerResult>(() => {
		const pager = this.pager();
		const totalPage = Math.max(pager.page, Math.ceil(pager.count / pager.size));

		const prevPage = Math.max(1, pager.page - 1);
		const nextPage = Math.min(totalPage, pager.page + 1);

		const prevCuror = Math.max(1, pager.page - 4);
		const prevRange = range(prevCuror, pager.page - 1);

		const nextCuror = Math.min(totalPage, pager.page + 4);
		const nextRange = range(pager.page, nextCuror);

		return {
			page: pager.page,
			prevPage,
			nextPage,
			totalPage,
			selectPages: prevRange.concat(nextRange)
		};
	});

	protected connectToPage(page: number): void {
		this.pageChange.emit(page);

		if (this.pager().page !== page) {
			this.pageOnlyChange.emit(page);
		}
	}

	protected connectSelectChange(event: Event): void {
		const el = (event.target as HTMLSelectElement);
		const value = parseInt(el.value);
		this.connectToPage(value);
	}
}
