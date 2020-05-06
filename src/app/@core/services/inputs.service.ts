import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { from, Observable, of } from 'rxjs';
import { Input } from '@@shared/models/input';
import { environment as env } from '../../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class InputsService {
  endPoint: string = 'inputs';
  constructor(private http: HttpClient) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getItem(id: string): Observable<Input> {
    return this.http.get<Input>(`${env.apiRoot}/${this.endPoint}/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getAllItems(): Observable<Input[]> {
    return this.http.get<Input[]>(`${env.apiRoot}/${this.endPoint}`).pipe(
      // map((data) => {
      //   return data;
      // })
      tap((tags) => console.log('fetched Inputs', tags)),
      catchError(this.handleError('getInputs', []))
    );
  }
  deleteItem(id: number) {
    return this.http
      .delete(`${env.apiRoot}/${this.endPoint}/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  addItem(value: string) {
    return this.http
      .post(`${env.apiRoot}/${this.endPoint}`, { name: value }, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  // updateItem(data) {
  //   return this.http.post(`${env.apiRoot}/${this.endPoint}`, data).pipe(map(response => {
  //       return response;
  //     })
  //   );
  // }

  findInputs(
    filter = '',
    order = 'id',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Input[]> {
    return this.http
      .get(`${env.apiRoot}/filter/categories`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('order', order)
          .set('sort', sortOrder)
          .set('page', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(
        map((res) => {
          console.log(res);
          return res['data'];
        })
      );
  }
} //end of class
