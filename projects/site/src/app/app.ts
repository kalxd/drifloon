import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from "drifloon";

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		Button
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('site');
}
