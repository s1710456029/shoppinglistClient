import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shoppinglist, User, Comment} from "../shared/shoppinglist";
import {ShoppingListService} from "../shared/shopping-list.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ShoppinglistFactory} from '../shared/shoppinglist-factory';
import {AuthenticationService} from "../shared/authentication.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'bs-shopping-details',
  templateUrl: './shopping-details.component.html',
  styles: []
})
export class ShoppingDetailsComponent implements OnInit {

    commentForm = new FormGroup({text: new FormControl()});
    comment = new Comment(0,'', 0);

    volunteerForm = new FormGroup({final_sum: new FormControl()});

  list: Shoppinglist = ShoppinglistFactory.empty();
  user: User = new User(0, '', false, '', '', '', '');

  constructor(
      private sl: ShoppingListService,
      public authService: AuthenticationService,
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.sl.getSingle(params['id']).subscribe(s => this.list = s);
  }

  submitComment(){
      this.comment.text = this.commentForm.value.text;
      this.comment.user_id = this.getCurrentUserId();
      console.log(this.comment);

      this.list.comments.push(this.comment);
      console.log(this.list);

      this.sl.updateComments(this.list).subscribe(res =>{
          this.router.navigate(['../../lists', this.list.id], {
              relativeTo: this.route
          });
      });
  }

  //wird ausgeführt wenn User auf Liste Übernehmen und Speichern (final_sum) klickt
    // speichert den current User in die Volunteer id
  submitVolunteer(){
      this.list.volunteer_id = this.getCurrentUserId();

      if(this.volunteerForm.value.final_sum){
          this.list.final_sum = this.volunteerForm.value.final_sum;
      }

      console.log(this.list);

      this.sl.update(this.list).subscribe(res =>{
          this.router.navigate(['../../lists', this.list.id], {
              relativeTo: this.route
          });
      });

  }

  removeList(){
    if(confirm('Einkaufsliste wirklich löschen?')){
      this.sl.remove(this.list.id).subscribe(res=> this.router.navigate(['../'], { relativeTo: this.route}));
    }
  }

    isVolunteer():boolean{
        if(this.authService.isCurrentUserVolunteer() == "0"){
            return false;
        }
        else return true;
    }

    isCurrentUserCreatorOfList(id: number):boolean{
        if(id == this.getCurrentUserId()){
            return true;
        }
        else return false;
    }

    isCurrentUserVolunteerOfList(volunteer_id: number):boolean{
        if(volunteer_id == this.getCurrentUserId()){
            return true;
        }
        else return false;
    }

    getCurrentUserId(){
        return this.authService.getCurrentUserId();
    }
}
