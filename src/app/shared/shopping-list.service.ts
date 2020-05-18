import { Injectable } from '@angular/core';
import {Comment, Item, Shoppinglist, User} from "./shoppinglist";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
 //lists:Shoppinglist[];
 private api = 'http://shoppinglist20.s1710456029.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable <Array<Shoppinglist>>{
    return this.http.get(`${this.api}/lists`).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id : number): Observable <Shoppinglist>{
      //console.log("in getSingle", id);
      return this.http.get<Shoppinglist>(`${this.api}/list/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(list: Shoppinglist): Observable <any>{
      return this.http.post(`${this.api}/admin`, list).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(list: Shoppinglist): Observable <any>{
      return this.http.put(`${this.api}/admin/${list.id}`, list).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  updateComments(list: Shoppinglist):Observable<any>{
      return this.http.put(`${this.api}/list/${list.id}`, list).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id: number): Observable <any>{
      return this.http.delete(`${this.api}/list/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any>{
      return throwError(error);
  }

}
