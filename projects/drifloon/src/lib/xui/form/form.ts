import { Component, computed, input, output, Signal, signal } from '@angular/core';
import * as R from "rxjs";
import * as Ar from "../../data/async-result";
import { UiSkeleton } from '../../ui/skeleton/skeleton';

export interface XUiFormState {
	title?: string;
	isLoading?: boolean;
	submitText?: string;
}

@Component({
	selector: 'xui-form',
	imports: [UiSkeleton],
	templateUrl: './form.html',
	styleUrl: './form.css',
})
export class XUiForm {
	state = input.required<XUiFormState>({});

	protected isLoading = computed(() => this.state().isLoading === true);

	submit = output<void>();
}

export abstract class XUiBaseForm {
	private readonly isLoading = signal(false);
	protected submitText: string | undefined;
	protected title: string | undefined;

	protected readonly state: Signal<XUiFormState> = computed(() => ({
		isLoading: this.isLoading(),
		submitText: this.submitText,
		title: this.title
	}));

	protected readonly formState = signal<XUiFormState>({
		isLoading: false
	});

	abstract submit(): R.Observable<Ar.AsyncResult<unknown, unknown>>;
	protected submitOk(): void {}

	connectSubmit(): void {
		this.isLoading.set(true);

		this.submit()
			.pipe(
				Ar.tapFinish(_ => this.submitOk())
			)
			.subscribe(Ar.subscriptionAll);
	}
}
