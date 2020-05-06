import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  doGet() {
    return this.http.get(`${env.apiRoot}/tags`, {
      params: { page: '30' },
      headers: { guest: 'True', Accept: 'application/json' },
    });
  }
} //end of class
