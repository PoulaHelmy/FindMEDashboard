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
  constructor(private http: HttpClient) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getTag(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${env.apiRoot}/tags/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${env.apiRoot}/tags`).pipe(
      // map((data) => {
      //   return data;
      // })
      tap((tags) => console.log('fetched tags', tags)),
      catchError(this.handleError('getTags', []))
    );
  }
  deleteTag(id: number) {
    return this.http.delete(`${env.apiRoot}/tags/${id}`, httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }
  addTag(value: string) {
    return this.http
      .post(`${env.apiRoot}/tags`, { name: value }, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  // updateTag(data) {
  //   return this.http.post(`${env.apiRoot}/tags`, data).pipe(map(response => {
  //       return response;
  //     })
  //   );
  // }
} //end of class
