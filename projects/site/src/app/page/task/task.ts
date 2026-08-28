import { Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Ar, UiLoadingDirective } from 'drifloon';
import * as R from "rxjs";

@Component({
	selector: 'site-task',
	imports: [UiLoadingDirective],
	templateUrl: './task.html',
	styleUrl: './task.css'
})
export class SiteTask {
	protected value = signal(1);
	protected value$: R.Observable<Ar.AsyncResult<number, string>>;

	constructor() {
		this.value$ = toObservable(this.value)
			.pipe(
				R.concatMap(x => R.of(Ar.mkAsyncFinish(x)).pipe(
					R.delay(1000),
					R.startWith(Ar.mkAsyncRefresh)
				)),
				Ar.flatMap(x => {
					if (x % 3 === 0) {
						return Ar.mkAsyncErr(`${x}被3整除了！`);
					}

					return Ar.mkAsyncFinish(x);
				}),
			);
	}

	protected connectRefresh(): void {
		this.value.update(x => x + 1);
	}
}
