import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { from, Observable, of } from 'rxjs';
import { Tag } from '@@shared/models/tag';
import { environment as env } from '../../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class TagsService {
  endPoint: string = 'tags';

  constructor(private http: HttpClient) {}
  getItem(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${env.apiRoot}/${this.endPoint}/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getAllItems(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${env.apiRoot}/${this.endPoint}`).pipe(
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
  ): Observable<Tag[]> {
    const requestUrl = `${env.apiRoot}/filter/${this.endPoint}`;

    return this.http.get<Tag[]>(requestUrl, {
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
