import { Component, signal } from '@angular/core';
import { UiBox, UiDivider } from 'drifloon';
import * as R from "rxjs";

@Component({
	selector: 'site-home',
	imports: [
		UiDivider,
		UiBox
	],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class SiteHome {
	protected readonly boxAlign = signal<"left" | "right">("left");
	protected readonly counter = signal<number>(1);
	protected readonly click$ = new R.Subject<void>();

	constructor() {
		this.click$.pipe(
			R.map(_ => this.counter()),
			R.concatMap(n => {
				if (n % 3 === 0) {
					return R.throwError(() => new Error("failed"));
				}
				return R.of(n);
			})
		).subscribe({
			next: console.log,
			error: console.error
		});
	}

	connectTest(): void {
		this.counter.update(n => n + 1);
		this.click$.next();
	}
}
