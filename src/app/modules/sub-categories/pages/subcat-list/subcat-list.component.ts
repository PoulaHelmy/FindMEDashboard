import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  merge,
  Observable,
  of as observableOf,
  fromEvent,
  Subscription,
} from 'rxjs';
import {
  catchError,
  map,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { SubCategory } from '@@shared/models/sub-category';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { ApiService } from '@@core/http/api.service';
@Component({
  selector: 'app-subcat-list',
  templateUrl: './subcat-list.component.html',
  styleUrls: ['./subcat-list.component.scss'],
})
export class SubcatListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'category_name',
    'created_at',
    'actions',
  ];
  inputsDatabase: Observable<SubCategory[]> | null;
  data: SubCategory[] = [];
  subscription: Subscription;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  options = {
    title: 'Are Sure To Delete This Item',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input') inputSearch: ElementRef;
  constructor(
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService,
    private apiserv: ApiService
  ) {}
  ngOnInit() {
    this.subscription = this.apiserv
      .getAllInputs('', 'id', 'asc', 0, 0, 'subcategories')
      .subscribe((res) => {
        this.resultsLength = res['meta']['total'];
        this.data = res['data'];
      });
  }
  deleteItem(id: number) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.apiserv.deleteItem(id, 'subcategories').subscribe(
          (res) => {
            this.snackbarService.show('Item Deleted Successfully', 'success');
            setTimeout(() => {
              this.isLoadingResults = false;
            }, 500);

            this.apiserv
              .getAllInputs(
                this.inputSearch.nativeElement.value,
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex,
                this.paginator.pageSize,
                'subcategories'
              )
              .subscribe((res) => {
                this.resultsLength = res['meta']['total'];
                this.data = res['data'];
              });
            this.isLoadingResults = true;
          },
          (err) => {
            this.snackbarService.show(err['statusText'], 'danger');
          }
        );
      }
    });
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.apiserv
            .getAllInputs(
              this.inputSearch.nativeElement.value,
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize,
              'subcategories'
            )
            .subscribe((res) => {
              this.data = res['data'];
              this.resultsLength = res['meta']['total'];
            });
        })
      )
      .subscribe();
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiserv.getAllInputs(
            this.inputSearch.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            'subcategories'
          );
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          return data['data'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  ngOnDestroy() {
    this.sort.sortChange.complete();
    this.subscription.unsubscribe();
  }
} //end of class
