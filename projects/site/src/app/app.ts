import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiContainer, UiTopbar, UiItem } from "drifloon";
import { SiteSidebar } from "./sidebar/sidebar";

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		UiContainer,
		UiTopbar,
		UiItem,
		SiteSidebar
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('site');
}
