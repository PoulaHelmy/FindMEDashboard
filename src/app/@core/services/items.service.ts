import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router } from '@angular/router';
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
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}
  addItem(data: object, endPoint: string) {
    return this.http
      .post(`${env.apiRoot}/auth/${endPoint}`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
} //end of class
