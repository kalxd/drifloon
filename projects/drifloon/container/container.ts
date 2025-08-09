import { Component } from '@angular/core';

@Component({
	selector: 'fui-container',
	imports: [],
	template: `<div class="ui container"><ng-content /></div>`,
	styleUrl: './container.css'
})
export class FUIContainer {}
