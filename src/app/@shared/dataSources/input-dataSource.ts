import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Input } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InputsService } from '@@core/services/inputs.service';
import { catchError, finalize } from 'rxjs/operators';

export class InputsDataSource implements DataSource<Input> {
  private inputsSubject = new BehaviorSubject<Input[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private inputsService: InputsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Input[]> {
    console.log('Connecting data source');
    return this.inputsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.inputsSubject.complete();
    this.loadingSubject.complete();
  }

  loadInputs(
    filter: string,
    order: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    console.log('in loadInputs function in inputs datasousce file');
    this.loadingSubject.next(true);

    this.inputsService
      .findInputs(filter, order, sort, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((inputs: Input[]) => {
        this.inputsSubject.next(inputs);
      });
  }
} //end of class
