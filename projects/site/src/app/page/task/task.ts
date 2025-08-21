import { Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActionResult, UiTaskDirective } from 'drifloon';
import * as R from "rxjs";

@Component({
	selector: 'site-task',
	imports: [UiTaskDirective],
	templateUrl: './task.html',
	styleUrl: './task.css'
})
export class SiteTask {
	protected value = signal(1);

	protected value$: R.Observable<ActionResult<Array<number>>>;

	constructor() {
		this.value$ = toObservable(this.value)
			.pipe(
				ActionResult.switchMap(i => R.of([i]).pipe(R.delay(1000))),
			);
	}

	protected connectRefresh(): void {
		this.value.update(x => x + 1);
	}
}
