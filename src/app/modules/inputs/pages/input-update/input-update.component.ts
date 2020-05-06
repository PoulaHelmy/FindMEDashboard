import { Component, OnInit } from '@angular/core';
import { InputsService } from '@@core/services/inputs.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Input } from '@@shared/models/input';

@Component({
  selector: 'app-input-update',
  templateUrl: './input-update.component.html',
  styleUrls: ['./input-update.component.scss'],
})
export class InputUpdateComponent implements OnInit {
  displayedColumns = ['id', 'name', 'actions'];
  data = new UserDataSource(this.inputsService);
  constructor(private inputsService: InputsService) {}

  ngOnInit(): void {}
}
export class UserDataSource extends DataSource<any> {
  constructor(private inpser: InputsService) {
    super();
  }

  connect(): Observable<Input[]> {
    return this.inpser.getAllItems();
  }
  disconnect() {}
}
