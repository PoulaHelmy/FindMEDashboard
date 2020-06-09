import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map, take, delay } from 'rxjs/operators';
import { ApiService } from '@@core/http/api.service';
import { ItemsService } from '@@core/services/items.service';
import { CoreService } from '@@core/services/core-service.service';
import { FieldConfig } from '@@shared/models/field.interface';
@Injectable({ providedIn: 'root' })
export class AddFaceResolver implements Resolve<any> {
  constructor(
    private apiService: ApiService,
    private coreService: CoreService,
    private itemService: ItemsService,
    private router: Router
  ) {}

  resolve(next: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let selectedGroupId = this.router.getCurrentNavigation().extras.state
      .selectedGroupId;
    let selectedPersonId = this.router.getCurrentNavigation().extras.state
      .selectedPersonId;
    return { group: selectedGroupId, person: selectedPersonId };
  }
}
