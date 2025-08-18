import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'site-form',
	imports: [ReactiveFormsModule],
	templateUrl: './form.html',
	styleUrl: './form.css'
})
export class SiteForm {
	private fb = inject(FormBuilder);

	protected fd = this.fb.group({
		username: ["", Validators.required],
		password: [""]
	});
}
