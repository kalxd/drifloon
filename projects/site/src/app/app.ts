import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FUIButton } from "drifloon/button";
import { FUIContainer } from "drifloon/container";

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		FUIButton,
		FUIContainer
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly title = signal('site');
}
