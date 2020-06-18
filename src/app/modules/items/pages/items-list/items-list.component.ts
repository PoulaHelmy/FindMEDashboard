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
import { merge, Observable, of as observableOf, fromEvent } from 'rxjs';
import {
  catchError,
  map,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Item } from '@@shared/models/item';
import { ItemsService } from '@@core/services/items.service';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'user_id',
    'category',
    'subcat',
    'created_at',
    'actions',
  ];
  itemsDatabase: Observable<Item[]> | null;
  data: Item[] = [];

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
    private itemService: ItemsService,
    private apiserv: ApiService
  ) {}
  ngOnInit() {
    this.apiserv
      .getAllInputs('', 'id', 'asc', 0, 0, 'items')
      .subscribe((res) => {
        this.resultsLength = res['meta']['total'];
        this.data = res['data'];
      });
    this.itemService.getAllItemsAdmin().subscribe((res) => {
      this.data = res['data'];

      this.isLoadingResults = false;
    });
  }
  deleteItem(id: number) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.itemService.deleteItem(id, 'items').subscribe((res) => {
          this.snackbarService.show('Item Deleted Successfully', 'success');
          setTimeout(() => {
            this.isLoadingResults = false;
          }, 500);
        });
      }
    });
  }

  ngAfterViewInit() {
    //server-side search
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
              'items'
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
            'items'
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          return data['data'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  ngOnDestroy() {
    // this.sort.sortChange.complete();
  }
} //end of class
