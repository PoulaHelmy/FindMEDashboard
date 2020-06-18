import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceApiService } from 'app/modules/humans/services/face-api.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import {
  ToasterModule,
  ToasterService,
  ToasterConfig,
  Toast,
} from 'angular2-toaster';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-lists-control',
  templateUrl: './lists-control.component.html',
  styleUrls: ['./lists-control.component.scss'],
})
export class ListsControlComponent implements OnInit {
  allLists = [];
  isLoadingResults = true;
  options = {
    title: 'Are Sure To Delete This List',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private dialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.faceApi.getAllLists().subscribe((data) => {
      this.allLists = data;
      this.isLoadingResults = false;
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }

  deleteList(facelistID) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.faceApi.deleteFaceList(facelistID).subscribe(
          (data) => {
            this.popToast({
              type: 'success',
              title: 'List Deleted Sussessfully',
              showCloseButton: true,
            });
            location.reload();
          },
          (err) => {
            this.popToast({
              type: 'error',
              title: 'Some Thing Wrong Please Try Again',
              showCloseButton: true,
            });
          }
        );
      }
    });
  }
}
