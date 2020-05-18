import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingDetailsComponent} from "./shopping-details/shopping-details.component";
import {ShoppinglistFormComponent} from "./shoppinglist-form/shoppinglist-form.component";
import {LoginComponent} from "./login/login.component";
import {ShoppingListFreeComponent} from "./shopping-list-free/shopping-list-free.component";
import {ShoppingListVolunteerComponent} from "./shopping-list-volunteer/shopping-list-volunteer.component";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'lists', component: ShoppingListComponent},
    //{path: 'freelists', component: ShoppingListFreeComponent},
    //{path: 'vlists:id', component: ShoppingListVolunteerComponent},
    {path: 'lists/:id', component: ShoppingDetailsComponent},
    //{path: 'user/:id', component: UserDetailsComponent},
    {path: 'admin', component: ShoppinglistFormComponent},
    {path: 'admin/:id', component: ShoppinglistFormComponent},
    {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
