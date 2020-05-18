export class ErrorMessage {

    constructor (
        public forControl: string ,
        public forValidator: string ,
        public text: string
    ) { }
}
export const ShoppinglistFormErrorMessages = [
    new ErrorMessage( 'title' , 'required' , 'Ein Listentitel muss angegeben werden' ),
    new ErrorMessage( 'due_date' , 'required' , 'Ein Fälligkeitsdatum muss angegeben werden' ),
    new ErrorMessage( 'items' , 'required' , 'Es muss mindestens ein Artikel für die Einkaufsliste angelegt werden' )

];

