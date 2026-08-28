import { Directive, inject, input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import * as R from "rxjs";
import { AsyncResult, caseOfAsyncResult } from "../lib/data/async-result";
import { UiSkeleton } from "../public-api";

@Directive({
	selector: "[uiLoading]"
})
export class UiLoadingDirective implements OnInit {
	private readonly templateRef = inject(TemplateRef);
	private readonly container = inject(ViewContainerRef);

	uiLoadingFrom = input.required<R.Observable<AsyncResult<unknown, unknown>>>();

	ngOnInit() {
		this.uiLoadingFrom().subscribe(value => {
			this.container.clear();

			caseOfAsyncResult(value, {
				refresh: () => {
					this.container.createComponent(UiSkeleton);
				},
				finish: x => {
					this.container.createEmbeddedView(this.templateRef, {
						$implicit: x
					});
				},
				err: e => {
					this.container.createComponent(UiSkeleton);
				}
			});
		});
	}
}
