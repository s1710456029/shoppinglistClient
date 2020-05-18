import {Shoppinglist, User} from "./shoppinglist";

export class ShoppinglistFactory {

    static empty(): Shoppinglist{
        return new Shoppinglist(
            null,
            '',
            new Date(),
            [],
            0,
            new User(
                0,
                '',
                false,
                '',
                '',
                '',
                ''),
            0,
            null,
            null,
            null
        );
    }

    static fromObject(rawList: any): Shoppinglist {
        return new Shoppinglist(
            rawList.id,
            rawList.title,
            rawList.due_date,
            rawList.items,
            rawList.seeker_id,
            //rawList.seeker,
            rawList.final_sum,
            rawList.volunteer_id,
            //rawList.volunteer,
            rawList.comments
        );
    }
}
