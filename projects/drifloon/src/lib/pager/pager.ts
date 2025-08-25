import { Component, computed, input, output } from '@angular/core';

export interface UiPagerInput {
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
	pager = input.required<UiPagerInput>();
	pageChange = output<number>();

	protected pagerResult = computed<PagerResult>(() => {
		const pager = this.pager();
		const count = Math.max(1, pager.count);

		const totalPage = Math.ceil(count / pager.size);
		const curPage = Math.max(1, Math.min(totalPage, pager.page));

		const prevPage = Math.max(1, curPage - 1);
		const nextPage = Math.min(totalPage, curPage + 1);

		const prevCuror = Math.max(1, curPage - 4);
		const prevRange = range(prevCuror, curPage - 1);

		const nextCuror = Math.min(totalPage, curPage + 4);
		const nextRange = range(pager.page + 1, nextCuror);

		return {
			page: curPage,
			prevPage,
			nextPage,
			totalPage,
			selectPages: prevRange.concat([curPage]).concat(nextRange)
		};
	});

	protected connectToPage(page: number): void {
		this.pageChange.emit(page);
	}

	protected connectSelectChange(event: Event): void {
		const el = (event.target as HTMLSelectElement);
		const value = parseInt(el.value);
		this.connectToPage(value);
	}
}
