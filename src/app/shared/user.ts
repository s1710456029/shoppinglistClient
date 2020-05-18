export class User {
    constructor(
        public id: number,
        public email: string,
        public volunteer: boolean,
        public firstname: string,
        public lastname: string,
        public address: string,
        public password: string
    ){

    }
}
