import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '@@core/http/api.service';
import { ItemsService } from '@@core/services/items.service';
import { CoreService } from '@@core/services/core-service.service';
import { FieldConfig } from '@@shared/models/field.interface';
@Injectable({ providedIn: 'root' })
export class ItemUpdateOtpionsResolver implements Resolve<any> {
  constructor(
    private apiService: ApiService,
    private coreService: CoreService,
    private itemService: ItemsService,
    private router: Router
  ) {}

  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    let AllResults: FieldConfig[] = [];
    let subCatId = this.router.getCurrentNavigation().extras.state.id;
    let item_id = this.router.getCurrentNavigation().extras.state.item_id;
    let item_data;
    this.itemService
      .getItemOptionsValues(item_id)
      .toPromise()
      .then((res) => {
        item_data = res['data'];
      });
    return this.apiService.getAllInputsBySubcategory(subCatId).pipe(
      map((res) => {
        for (let i = 0; i < res['data'].length; i++) {
          let xx = this.coreService.mapControl(res['data'][i][0]);
          for (let j = 0; j < item_data.length; j++) {
            if (xx['name'] === item_data[j]['name']) {
              xx['value'] = item_data[j]['value'];
            }
          }
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
