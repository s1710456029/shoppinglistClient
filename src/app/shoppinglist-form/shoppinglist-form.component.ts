import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {ShoppingListService} from "../shared/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Item, Shoppinglist} from "../shared/shoppinglist";
import {ShoppinglistFormErrorMessages} from "./shoppinglist-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-shoppinglist-form',
  templateUrl: './shoppinglist-form.component.html',
  styles: []
})
export class ShoppinglistFormComponent implements OnInit {
    shoppinglistForm: FormGroup;
    list = ShoppinglistFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingList = false;
    items: FormArray;

    constructor(private fb: FormBuilder, private sl: ShoppingListService, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.isUpdatingList = true;
            this.sl.getSingle(id).subscribe(list => {
                this.list = list;
                this.initShoppinglist();
            });
        }
        this.initShoppinglist();
    }

    initShoppinglist() {
        this.buildItemsArray();
        this.shoppinglistForm = this.fb.group({
            id: this.list.id,
            title: [this.list.title, Validators.required],
            due_date: [this.list.due_date, Validators.required],
            items: this.items
        });

        this.shoppinglistForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }

    buildItemsArray() {
        if (this.list.items.length === 0) {
            this.list.items.push(new Item(0, '', 0, '', 0))
        }
        this.items = this.fb.array(
            this.list.items.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    title: this.fb.control(t.title),
                    amount: this.fb.control(t.amount),
                    unit: this.fb.control(t.unit),
                    price: this.fb.control(t.price)
                })
            )
        );
    }

    addItemControl() {
        this.items.push(this.fb.group({title: null, amount: null, unit: null, price: null}));
    }

    submitForm() {
        const list: Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglistForm.value);
        list.items = this.shoppinglistForm.value.items;
        if (this.isUpdatingList) {
            this.sl.update(list).subscribe(res => {
                this.router.navigate(['../../lists', list.id], {relativeTo: this.route});
            });
        }
        else {
            //was soll de scheiße
            console.log("wtf");
            list.seeker_id = this.authService.getCurrentUserId();
            this.sl.create(list).subscribe(res => {
                this.list = ShoppinglistFactory.empty();
                this.shoppinglistForm.reset(ShoppinglistFactory.empty());
                this.router.navigate(['../lists'], {relativeTo: this.route});
            });
        }
    }


    updateErrorMessages() {
        this.errors = {};
        for (const message of ShoppinglistFormErrorMessages) {
            const control = this.shoppinglistForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}

