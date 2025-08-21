import { Routes } from '@angular/router';
import { SiteHome } from "./page/home/home";
import { SiteForm } from "./page/form/form";
import { SitePager } from "./page/pager/pager";
import { SiteSkeleton } from "./page/skeleton/skeleton";
import { SiteTask } from "./page/task/task";

export const routes: Routes = [
	{
		path: "",
		component: SiteHome
	},

	{
		path: "form",
		component: SiteForm
	},

	{
		path: "pager",
		component: SitePager
	},

	{
		path: "skeleton",
		component: SiteSkeleton
	},

	{
		path: "task",
		component: SiteTask
	}
];
