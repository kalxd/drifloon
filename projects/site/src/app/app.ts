import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiContainer } from "drifloon";

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		UiContainer,
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('site');
}
