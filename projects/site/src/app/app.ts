import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiContainer, UiTopbar, UiItem } from "drifloon";
import { SiteForm } from "./form/form";

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		UiContainer,
		UiTopbar,
		UiItem,
		SiteForm
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('site');
}
