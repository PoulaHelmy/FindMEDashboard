import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Input } from '@@shared/models/input';
import { environment as env } from '../../../../../environments/environment';
@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html',
  styleUrls: ['./input-details.component.scss'],
})
export class InputDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'subCat', 'actions'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: Input[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // this.exampleDatabase
    //   .getAllInputs('id', 'asc', 2)
    //   .subscribe((res) => console.log(res.data));
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          // tslint:disable-next-line:no-non-null-assertion
          return this.exampleDatabase!.getAllInputs(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data['data'].length;
          console.log('data[data] : ', data['data']);
          console.log('data.total_count :', data['data'].length);
          return data['data'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        console.log('this.data : ', data);
        return (this.data = data);
      });
  }
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {}

  getAllInputs(order: string, sort: string, page: number): Observable<Input[]> {
    const requestUrl = `${
      env.apiRoot
    }/filter/categories?sort=${sort}&order=${order}&page=${page + 1}`;
    return this._httpClient.get<Input[]>(requestUrl);
  }
}
