import {
	Component,
	Directive,
	inject,
	input,
	inputBinding,
	OnInit,
	TemplateRef,
	ViewContainerRef
} from "@angular/core";
import * as R from "rxjs";
import { AsyncResult, caseOfAsyncResult } from "../lib/data/async-result";
import { UiErrorPage } from "../lib/ui/error-page/error-page";
import { UiSkeleton } from "../lib/ui/skeleton/skeleton";
import { fmtErrorMsg } from "../lib/data/error";

@Component({
	imports: [UiErrorPage],
	selector: "iu-loading-error-box",
	template: `
	<ui-error-page>
	{{ msg() }}
	</ui-error-page>`
})
class LoadingErrorBox {
	msg = input.required<string>();
}

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
					this.container.createComponent(LoadingErrorBox, {
						bindings: [
							inputBinding("msg", () => fmtErrorMsg(e))
						]
					});
				}
			});
		});
	}
}
