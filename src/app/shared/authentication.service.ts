import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode' ;
import {retry} from "rxjs/operators";

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        firstname: string,
        lastname: string,
        address: string,
        password: string,
        updated_at: Date
    }
}
@Injectable()
export class AuthenticationService {

    private api:string = 'http://shoppinglist20.s1710456029.student.kwmhgb.at/api/auth'; //'http://localhost:8080/api/auth';
    constructor(private http: HttpClient) {
    }

    login (email: string, password: string ) {
        return this.http.post( `${this.api}/login` , {'email': email, 'password': password});
    }

    public setCurrentUserId (){
        this.http.get<User>( ` ${this.api}/user`).pipe(retry(3)).subscribe(res =>{
                localStorage.setItem('userId', res.result.id.toString());
            }
        );
    }

    public getCurrentUserId (){
        return Number.parseInt(localStorage.getItem( 'userId' ));
    }

    public getCurrentUserName(){
        return localStorage.getItem('firstname') + " " + localStorage.getItem('lastname');
    }

    public isCurrentUserVolunteer(){
        return localStorage.getItem('isVolunteer');
    }

    public setLocalStorage(token: string) {
        const decodedToken = decode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('isVolunteer', decodedToken.user.volunteer);
        localStorage.setItem('firstname', decodedToken.user.firstname);
        localStorage.setItem('lastname', decodedToken.user.lastname);
    }

    logout(){
        this.http.post( ` ${this.api}/logout`, {});
        localStorage.removeItem( "token" );
        localStorage.removeItem( "userId" );
        localStorage.removeItem( "isVolunteer" );
        localStorage.removeItem( "firstname");
        localStorage.removeItem( "lastname");
        console.log( "logged out" );
    }

    public isLoggedIn () {
        if(localStorage.getItem ( "token" )){
            let token: string = localStorage.getItem ( "token" );
            //console.log(token);
            const decodedToken = decode( token );
            let expirationDate: Date = new Date ( 0 );
            expirationDate.setUTCSeconds(decodedToken.exp );
            if( expirationDate < new Date ()){
                console.log("token expired");
                localStorage.removeItem( "token" );
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
    isLoggedOut () {
        return !this. isLoggedIn ();
    }

}
