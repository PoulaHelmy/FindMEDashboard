import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  options = {
    title: 'Are Sure To Delete This Item',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  constructor(
    private http: HttpClient,
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  doGet() {
    return this.http.get(`${env.apiRoot}/tags`, {
      params: { page: '30' },
      headers: { guest: 'True', Accept: 'application/json' },
    });
  }
  getItem(id: string, endPoint: string): Observable<any> {
    return this.http.get<any>(`${env.apiRoot}/${endPoint}/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getAllItems(endPoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${env.apiRoot}/${endPoint}`).pipe(
      map((data) => {
        return data;
      })
    );
  }
  deleteItem(id: number, endPoint: string) {
    return this.http
      .delete(`${env.apiRoot}/${endPoint}/${id}`, httpOptions)
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
    pageSize: number = 0,
    endPoint: string
  ): Observable<any[]> {
    const requestUrl = `${env.apiRoot}/filter/${endPoint}`;

    return this.http.get<any[]>(requestUrl, {
      params: new HttpParams()
        .set('filter', filter)
        .set('order', order)
        .set('sort', sort)
        .set('page', page.toString())
        .set('pageSize', pageSize.toString()),
    });
  }
  addItem(data: object, endPoint: string) {
    return this.http.post(`${env.apiRoot}/${endPoint}`, data, httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }
  updateItem(id: number, data: object, endPoint: string) {
    return this.http
      .patch(`${env.apiRoot}/${endPoint}/${id}`, data, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  deleteCheck(id: number, apiEndpoint: string) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteItem(id, apiEndpoint).subscribe(
          (res) => {
            this.snackbarService.show('Item Deleted Successfully', 'success');
            this.router.navigate([apiEndpoint]);
          },
          (err) => {
            this.snackbarService.show(err['statusText'], 'danger');
          }
        );
      }
    });
  }
  inputsSubcats(data: object) {
    return this.http
      .post(`${env.apiRoot}/subcategories/inputs`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getAllInputsBySubcategory(id: string) {
    return this.http
      .get(`${env.apiRoot}/subcatsinputs/${id}`, httpOptions)
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
  getItemSubcatsAllData(data: object) {
    return this.http
      .post(`${env.apiRoot}/subcatalldata`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllCatSubcats(id: string) {
    return this.http.get(`${env.apiRoot}/catsubcats/${id}`, httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }
} //end of class
