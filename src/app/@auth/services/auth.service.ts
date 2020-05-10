import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint: string = 'auth';
  options: any;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  login(email: string, password: string) {
    return this.http.post(
      `${env.apiRoot}/${this.endPoint}/login`,
      {
        email: email,
        password: password,
      },
      this.options
    );
  }
  register(data: object) {
    return this.http.post(
      `${env.apiRoot}/${this.endPoint}/signup`,
      data,
      this.options
    );
  }

  logout() {
    return this.http.get(`${env.apiRoot}/${this.endPoint}/logout`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }
  forgetPassword(email: string) {
    return this.http.post(
      `${env.apiRoot}/password/create`,
      { email: email },
      this.options
    );
  }
  resetPassword(data: object) {
    return this.http.post(`${env.apiRoot}/password/reset`, data, {
      headers: {
        Accept: 'application/json',
      },
    });
  }
} //end of class
