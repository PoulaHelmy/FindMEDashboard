import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //   login(email: String, password: String): Observable<boolean> {
  //     var body = {};
  //     body['email'] = email;
  //     body['password'] = password;
  //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
  // return this.http.post(environment.LOGIN_URL,
  //                           body,
  //                           {headers: headers}
  //                          ).pipe(
  //                              map((response: any) => {
  //                                 this.isLogged.next(response);
  //                                 return response;
  //                              }
  //                           ));
  // }
  // isLoggedIn() {
  //         return this.http.get(environment.IS_LOGGEDIN_URL, {withCredentials: true}).pipe(
  //             map(
  //                 (response: any) => {
  //                     this.isLogged.next(response);
  //                     return response;
  //                 }
  //             ));
  //     }
} //end of class
