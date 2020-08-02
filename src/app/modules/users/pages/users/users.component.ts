import {
  Component,
  OnInit

} from '@angular/core';

import {ConfirmDialogService} from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Item} from '@@shared/models/item';
import {ApiService} from '@@core/http/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'active', 'email', 'created_at'];
  data: Item[] = [];
  resultsLength = 0;
  isLoadingResults = true;


  constructor(
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService,
    private apiserv: ApiService,
  ) {
  }

  ngOnInit() {
    this.apiserv.getAllUsers().subscribe((res) => {
      this.data = res['data'];
      this.isLoadingResults = false;
    });
  }

  activate(id: number) {
    this.apiserv.activateUser(id).subscribe((res) => {
      location.reload();
    });
  }
} //end of class
