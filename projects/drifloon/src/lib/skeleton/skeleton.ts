import { Component, input } from '@angular/core';

type Suit = "page" | "dialog";

@Component({
	selector: 'ui-skeleton',
	imports: [],
	templateUrl: './skeleton.html',
	styleUrl: './skeleton.css'
})
export class UiSkeleton {
	suit = input<Suit>("page");

	theClass(): Record<string, boolean> {
		return {
			page: this.suit() === "page",
			dialog: this.suit() === "dialog"
		};
	}
}
