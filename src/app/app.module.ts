import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule} from "@angular/forms";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEntryComponent } from './shopping-list-entry/shopping-list-entry.component';
import { ShoppingDetailsComponent } from './shopping-details/shopping-details.component';
import {ShoppingListService} from './shared/shopping-list.service';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ShoppinglistFormComponent } from './shoppinglist-form/shoppinglist-form.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from './shared/jwt-interceptor.service';
import { ShoppingListFreeComponent } from './shopping-list-free/shopping-list-free.component';
import { ShoppingListVolunteerComponent } from './shopping-list-volunteer/shopping-list-volunteer.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEntryComponent,
    ShoppingDetailsComponent,
    HomeComponent,
    ShoppinglistFormComponent,
    LoginComponent,
    ShoppingListFreeComponent,
    ShoppingListVolunteerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ShoppingListService,
      AuthenticationService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptorService,
        multi: true
      }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
