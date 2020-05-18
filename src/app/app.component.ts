import { Component } from '@angular/core';
import {Shoppinglist, User} from "./shared/shoppinglist";
import {AuthenticationService} from "./shared/authentication.service";
import {ShoppingListService} from "./shared/shopping-list.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private authService: AuthenticationService, private sl:ShoppingListService){  }

  list: Shoppinglist;
  user: User;

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    }
    else return "Login";
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
