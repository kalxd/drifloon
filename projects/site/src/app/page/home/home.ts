import { Component, signal } from '@angular/core';
import { UiBox, UiDivider } from 'drifloon';

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
	boxAlign = signal<"left" | "right">("left");
}
