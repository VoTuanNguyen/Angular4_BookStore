import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ManageComponent } from "./components/manage/manage.component";
import { BooklistComponent } from "./components/booklist/booklist.component";
import { BookComponent } from "./components/book/book.component";
import { AddbookComponent } from "./components/addbook/addbook.component";
import { CartComponent } from "./components/cart/cart.component";
import { AboutComponent } from "./components/about/about.component";

import { BooksComponent } from "./components/books/books.component";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
	{
		path: '',
		pathMatch: "full",
		redirectTo: "home"
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "register",
		component: RegisterComponent
	},
	{
		path: "home",
		component: HomeComponent,
		children: [
			{
				path: '',
				component: BooklistComponent,
			},
			{
				path: 'book/:id',
				component: BookComponent
			},
			{
				path: 'cart',
				component: CartComponent
			},
			{
				path: 'about',
				component: AboutComponent
			}

		]
	},
	{
		path: "manage",
		component: ManageComponent,
		children: [
			{
				path: '',
				component: BooksComponent
			},
			{
				path: 'book/add',
				component: AddbookComponent
			},
			{
				path: 'book/add/:bookId',
				component: AddbookComponent
			}
		]
	}

]

export const routing = RouterModule.forRoot(routes);