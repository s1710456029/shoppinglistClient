import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Item, Shoppinglist, User, Comment} from "../shared/shoppinglist";
import {ShoppingListService} from "../shared/shopping-list.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {

  lists: Shoppinglist[];

  showAll = true;
  showVolunteers = false;
  showFree = false;

  constructor(private sl: ShoppingListService, private authService: AuthenticationService){}


  ngOnInit(): void {
    this.sl.getAll().subscribe(res => this.lists = res);
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

    isCurrentUserCreatorOfList(id: number):boolean{
        if(id == this.getUserId()){
            return true;
        }
        else return false;
    }

    isCurrentUserVolunteerOfList(id: number):boolean{
        if(id == this.getUserId()){
            return true;
        }
        else return false;
    }

  getUserId(){
      return this.authService.getCurrentUserId();
  }

  getLink():string{
      return "vlists" + this.getUserId();
  }


}
