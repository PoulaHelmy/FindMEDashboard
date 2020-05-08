import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Input } from '@@shared/models/input';
import { environment as env } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class InputsService {
  endPoint: string = 'inputs';
  constructor(private http: HttpClient) {}

  getItem(id: string): Observable<Input> {
    return this.http.get<Input>(`${env.apiRoot}/${this.endPoint}/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getAllItems(): Observable<Input[]> {
    return this.http.get<Input[]>(`${env.apiRoot}/${this.endPoint}`).pipe(
      map((data) => {
        return data;
      })
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

  getAllInputs(
    filter: string = '',
    order: string = 'id',
    sort: string = 'asc',
    page: number = 0,
    pageSize: number = 0
  ): Observable<Input[]> {
    const requestUrl = `${env.apiRoot}/filter/${this.endPoint}`;

    return this.http.get<Input[]>(requestUrl, {
      params: new HttpParams()
        .set('filter', filter)
        .set('order', order)
        .set('sort', sort)
        .set('page', page.toString())
        .set('pageSize', pageSize.toString()),
    });
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
  updateItem(id: number, value: string) {
    return this.http
      .patch(
        `${env.apiRoot}/${this.endPoint}/${id}`,
        { name: value },
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
} //end of class

// findInputs(
//   filter = '',
//   order = 'id',
//   sortOrder = 'asc',
//   pageNumber = 0,
//   pageSize = 10
// ): Observable<Input[]> {
//   return this.http
//     .get(`${env.apiRoot}/filter/inputs`, {
//       params: new HttpParams()
//         .set('filter', filter)
//         .set('order', order)
//         .set('sort', sortOrder)
//         .set('page', pageNumber.toString())
//         .set('pageSize', pageSize.toString()),
//     })
//     .pipe(
//       map((res) => {
//         return res['data'];
//       })
//     );
// }
