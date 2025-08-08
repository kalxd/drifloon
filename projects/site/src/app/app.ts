import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIButton, UIContainer } from "drifloon";

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		UIButton,
		UIContainer
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('site');
}
