import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TagsService } from '../services/tags.service';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class ItemResolver implements Resolve<any> {
  constructor(private tagService: TagsService) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const pageId = next.paramMap.get('id');
    return pageId
      ? this.tagService.getItem(pageId).pipe(
          catchError(() => {
            return of('No Data');
          })
        )
      : EMPTY;
  }
}
