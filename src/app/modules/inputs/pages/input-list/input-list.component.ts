import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { InputsDataSource } from '@@shared/dataSources/input-dataSource';
import { InputsService } from '@@core/services/inputs.service';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@@shared/models/input';
import { MatSort } from '@angular/material/sort';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss'],
})
export class InputListComponent implements OnInit, AfterViewInit {
  input: Input;
  displayedColumns: string[] = ['id', 'name', 'sub_Category', 'actions'];
  dataSource: InputsDataSource;
  resultsLength: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') inputSearch: ElementRef;

  constructor(
    private inputService: InputsService,
    private route: ActivatedRoute
  ) {
    // this.inputService
    //   .findInputs(5, 'fdf', 'fd', 10, 100)
    //   .subscribe((res) => console.log('res : ', res));
  }

  ngOnInit(): void {
    this.input = this.route.snapshot.data['input'];
    this.dataSource = new InputsDataSource(this.inputService);
    this.dataSource.loadInputs('', 'id', 'asc', 0, 5);
  }
  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadInputsPage();
        })
      )
      .subscribe();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.paginator.page.pipe(tap(() => this.loadInputsPage())).subscribe();
  }
  deleteItem(id: number) {
    console.log('id', id);
  }
  updateItem(id: number) {
    console.log('id', id);
  }
  loadInputsPage() {
    this.dataSource.loadInputs(
      this.inputSearch.nativeElement.value,
      'id',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
} //end Of Class
