import { Component, computed, input, output, Signal, signal } from '@angular/core';
import * as R from "rxjs";
import * as Ar from "../../data/async-result";
import { UiBaseForm, UiBaseFormAction} from "../../ui/base-form/base-form";
import { FieldTree } from '@angular/forms/signals';

export interface XUiFormState {
	title?: string;
	isLoading?: boolean;
	submitText?: string;
}

@Component({
	selector: 'xui-form',
	imports: [UiBaseForm, UiBaseFormAction],
	templateUrl: './form.html',
	styleUrl: './form.css',
})
export class XUiForm {
	state = input.required<XUiFormState>({});
	protected title = computed(() => this.state().title ?? "请填写");
	protected submitText = computed(() => this.state().submitText ?? "提交");
	protected isLoading = computed(() => this.state().isLoading === true);

	submit = output<void>();
}

export abstract class XUiBaseForm<T, R> {
	private readonly isLoading = signal(false);
	protected submitText: string | undefined;
	protected title: string | undefined;

	protected readonly state: Signal<XUiFormState> = computed(() => ({
		isLoading: this.isLoading(),
		submitText: this.submitText,
		title: this.title
	}));

	protected abstract fd: FieldTree<T>;

	protected abstract submit(): R.Observable<Ar.AsyncResult<R, unknown>>;
	protected submitOk(_: R): void {}

	connectSubmit(): void {
		if (this.fd().invalid()) {
			return ;
		}

		this.submit()
			.pipe(
				R.startWith(Ar.mkAsyncRefresh),
				R.tap(x => Ar.caseOfAsyncResult(x, {
					refresh: () => this.isLoading.set(true),
					err: _ => this.isLoading.set(false),
					finish: x => {
						this.isLoading.set(false);
						this.submitOk(x);
					}
				}))
			)
			.subscribe(Ar.subscriptionAll);
	}
}
