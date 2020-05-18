import {Item} from "./item";
export {Item} from "./item";
import {Comment} from "./comment";
export {Comment} from "./comment";
import {User} from "./user";
export {User} from "./user";


export class Shoppinglist {
    constructor(
        public id: number,
        public title: string,
        public due_date: Date,
        public items: Item[],
        public seeker_id: number,
        public seeker: User,
        public final_sum?: number,
        public volunteer_id?: number,
        public volunteer?: User,
        public comments?: Comment[]
    ){

    }
}
