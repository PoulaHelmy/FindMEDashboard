import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}
  getAllItems(endPoint: string) {
    return this.http.get(`${env.apiRoot}/auth/${endPoint}`, httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }
  addItem(data: object, endPoint: string) {
    return this.http
      .post(`${env.apiRoot}/auth/${endPoint}`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getItem(id: string, endPoint: string) {
    return this.http
      .get(`${env.apiRoot}/auth/${endPoint}/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getItemQuestions(id: string) {
    return this.http
      .get(`${env.apiRoot}/auth/items/questions/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateItem(id: string, data: object, endPoint: string) {
    return this.http
      .put(`${env.apiRoot}/auth/${endPoint}/${id}`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateItemOptions(id: number, data: object) {
    return this.http
      .put(`${env.apiRoot}/auth/items/values/${id}`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getItemOptionsValues(id: string) {
    return this.http
      .get(`${env.apiRoot}/auth/items/upoptions/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  deleteItem(id: number, endPoint: string) {
    return this.http
      .delete(`${env.apiRoot}/auth/${endPoint}/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
} //end of class
