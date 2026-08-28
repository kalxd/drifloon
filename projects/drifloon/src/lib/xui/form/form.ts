import { Component, computed, input, signal, WritableSignal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import * as R from "rxjs";
import { fmtErrorMsg } from '../../data/error';

export interface XUiFormState {
	isLoading: boolean;
}

@Component({
	selector: 'xui-form',
	imports: [],
	templateUrl: './form.html',
	styleUrl: './form.css',
})
export class XUiForm {
	title = input<string>("请填写");
	state = input<XUiFormState | undefined>();

	isLoading = computed(() => {
		return this.state?.()?.isLoading === true;
	});
}

export abstract class XUiBaseForm<T extends {}> {
	protected abstract formModel: WritableSignal<T>;
	protected abstract formData: FieldTree<T>
	protected state = signal<XUiFormState>({
		isLoading: false
	});

	private markAllDirty(): void {
		for (const key of Object.keys(this.formModel())) {
			(this.formData as any)[key]().markAsDirty();
		}
	}

	protected abstract submit(): R.Observable<void>;

	protected connectSubmit(): void {
		this.markAllDirty();

		if (this.formData().invalid()) {
			return ;
		}

		this.state.update(s => ({ ...s, isLoading: true }));
		this.submit()
			.pipe(
				R.finalize(() => {
					this.state.update(s => ({ ...s, isLoading: false }));
				}),
				R.catchError((e: unknown) => {
					const msg = fmtErrorMsg(e);
					alert(msg);
					return R.of();
				})
			)
			.subscribe();
	}
}
