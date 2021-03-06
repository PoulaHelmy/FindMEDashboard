import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',

    'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  getAllSummery() {
    return this.http.get(`${env.apiRoot}/allsummery`, httpOptions).pipe(
      map((res) => {
        return res['data'];
      }),
      catchError((e) => throwError(e))
    );
  }
} //end of class
