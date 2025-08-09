import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIButton } from "drifloon/button";
import { UIContainer } from "drifloon/container";

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
