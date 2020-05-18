import {Component, Input, OnInit} from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'a.bs-shopping-list-entry',
  templateUrl: './shopping-list-entry.component.html',
  styles: []
})
export class ShoppingListEntryComponent implements OnInit {
  @Input() list: Shoppinglist
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

    isVolunteer():boolean{
        if(this.authService.isCurrentUserVolunteer() == "0"){
            return false;
        }
        else return true;
    }




}
