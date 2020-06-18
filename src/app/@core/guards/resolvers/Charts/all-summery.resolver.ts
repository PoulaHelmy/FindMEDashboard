import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ChartsService } from '@@core/services/charts.service';
@Injectable({ providedIn: 'root' })
export class AllSummeryResolver implements Resolve<any> {
  constructor(private chartServ: ChartsService) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    return this.chartServ.getAllSummery().pipe(
      map((res) => {
        return res;
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
