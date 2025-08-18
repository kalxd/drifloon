import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'site-sidebar',
	imports: [
		RouterLink,
		RouterLinkActive
	],
	templateUrl: './sidebar.html',
	styleUrl: './sidebar.css'
})
export class SiteSidebar {}
