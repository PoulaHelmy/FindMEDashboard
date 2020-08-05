import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, EMPTY, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from '@@core/http/api.service';

@Injectable({providedIn: 'root'})
export class UserDetailsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {
  }

  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const pageId = next.paramMap.get('id');
    return pageId
      ? this.apiService.adminGetUserDetails(pageId).pipe(
        map((res) => {
          return res['data'];
        }),
        catchError(() => {
          return of('No Data');
        })
      )
      : EMPTY;
  }
}
