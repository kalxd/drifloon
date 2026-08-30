import { Component, computed, input, output, signal, viewChild } from '@angular/core';
import { UiDialog } from '../../dialog/dialog';
import { UiDialogBox } from '../../box/dialog-box';
import { UiBaseForm, UiBaseFormAction } from "../../ui/base-form/base-form";
import * as R from "rxjs";
import * as Ar from "../../data/async-result";
import { FieldTree } from '@angular/forms/signals';

interface XUiFormDialogState {
	title?: string;
	isLoading?: boolean;
	okText?: string;
	cancelText?: string;
}

@Component({
	imports: [
		UiDialog,
		UiDialogBox,
		UiBaseForm,
		UiBaseFormAction
	],
	selector: 'xui-form-dialog',
	styleUrl: './form-dialog.css',
	templateUrl: './form-dialog.html',
})
export class XUiFormDialog {
	readonly state = input<XUiFormDialogState>({});
	readonly submit = output<void>();

	protected readonly isLoading = computed(() => this.state().isLoading === true);
	protected readonly title = computed(() => this.state().title ?? "请填写");
	protected readonly okText = computed(() => this.state().okText ?? "好");
	protected readonly cancelText = computed(() => this.state().cancelText ?? "不好");

	private readonly dialogRef = viewChild.required(UiDialog);

	show(): void {
		this.dialogRef().show();
	}

	close(): void {
		this.dialogRef().close();
	}
}

@Component({
	template: ""
})
export abstract class XUiBaseFormDialog<T, R> {
	protected title: string | undefined;
	protected okText: string | undefined;
	protected cancelText: string | undefined;
	private readonly isLoading = signal<boolean>(false);
	protected readonly state = computed<XUiFormDialogState>(() => ({
		title: this.title,
		isLoading: this.isLoading(),
		okText: this.okText,
		cancelText: this.cancelText
	}));

	protected readonly abstract fd: FieldTree<unknown>;
	private readonly ok$ = new R.Subject<R>();
	private readonly dialogRef = viewChild.required(XUiFormDialog);

	protected init(_: T): void {
		this.fd().reset();
	}

	abstract submit(): R.Observable<Ar.AsyncResult<R, unknown>>;

	connectSubmit(): void {
		if (this.fd().invalid()) {
			return ;
		}

		this.submit()
			.pipe(
				R.startWith(Ar.mkAsyncRefresh),
				R.tap(x => Ar.caseOfAsyncResult(x, {
					refresh: () => this.isLoading.set(true),
					finish: x => {
						this.isLoading.set(false);
						this.ok$.next(x);
						this.dialogRef().close();
					},
					err: _ => this.isLoading.set(false)
				}))
			)
			.subscribe(Ar.subscriptionAll);
	}

	show(input: T): R.Observable<R> {
		this.init(input);

		this.dialogRef().show();

		return R.of(1).pipe(
			R.switchMap(_ => this.ok$),
			R.take(1)
		);
	}
}
