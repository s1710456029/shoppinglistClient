import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../shared/authentication.service";
import {ShoppingListService} from "../shared/shopping-list.service";
import {User} from "../shared/user";
import {Observable} from "rxjs";

@Component({
  selector: 'bs-home',
  template: `
    <div class="ui container">
        <h1>Home</h1>
        <p>Willkommen <b *ngIf="isLoggedIn()">{{getUserName()}}</b> bei KWM gegen CORONA</p>
        <a *ngIf="isLoggedIn()" routerLink="../lists" class="ui red button">Einkaufslisten ansehen<i class="right arrow icon"></i></a>
        <a *ngIf="!isLoggedIn()" routerLink="../login" class="ui red button">Login<i class="right arrow icon"></i></a>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
      return this.authService.isLoggedIn();
  }

  getUserName():string{
      return this.authService.getCurrentUserName();
  }

  isVolunteer():boolean{
    if(this.authService.isCurrentUserVolunteer() == "0"){
      return false;
    }
    else return true;
  }

  getUserId(){
    return this.authService.getCurrentUserId();
  }

}
