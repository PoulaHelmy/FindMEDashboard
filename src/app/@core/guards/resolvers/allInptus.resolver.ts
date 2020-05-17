import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ApiService } from '@@core/http/api.service';
import { CoreService } from '@@core/services/core-service.service';
import { FieldConfig } from '@@shared/models/field.interface';

@Injectable({ providedIn: 'root' })
export class AllInputsResolver implements Resolve<any> {
  constructor(
    private apiService: ApiService,
    private coreService: CoreService,
    private router: Router
  ) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let AllResults: FieldConfig[] = [];
    console.log('next :', next);
    console.log(
      'private router: Router :',
      this.router.getCurrentNavigation().extras
    );
    let subCatId = this.router.getCurrentNavigation().extras.state.id;
    let item_id = this.router.getCurrentNavigation().extras.state.item_id;
    return this.apiService.getAllInputsBySubcategory(subCatId).pipe(
      map((res) => {
        for (let i = 0; i < res['data'].length; i++) {
          let xx = this.coreService.mapControl(res['data'][i][0]);
          AllResults.push(xx);
        }
        return [{ data: AllResults, item_id: item_id }];
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
