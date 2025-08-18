import { Routes } from '@angular/router';
import { SiteHome } from "./page/home/home";
import { SiteForm } from "./page/form/form";

export const routes: Routes = [
	{
		path: "",
		component: SiteHome
	},

	{
		path: "form",
		component: SiteForm
	}
];
