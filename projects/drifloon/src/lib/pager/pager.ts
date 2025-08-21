import { Component, input, output } from '@angular/core';

export interface PagerInput {
	page: number;
	size: number;
	count: number;
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
}
