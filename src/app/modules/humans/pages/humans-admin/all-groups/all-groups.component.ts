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

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss'],
})
export class AllGroupsComponent implements OnInit {
  allGroups = [];
  isLoadingResults = false;
  public config: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: false,
    timeout: 0,
  });
  toast: Toast = {
    type: 'error',
    title: 'close button',
    showCloseButton: true,
  };
  options = {
    title: 'Are Sure To Delete This Group',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private snackbarService: SnackbarService,
    private toasterService: ToasterService,
    private dialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.faceApi.getPersonGroups().subscribe((data) => {
      this.allGroups = data;
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }
  trainPersonGroup(personGroupId) {
    console.log('Hey from trainPersonGroup', personGroupId);
    this.isLoadingResults = true;
    this.popToast({
      type: 'success',
      title: 'Training Initiating...',
      showCloseButton: true,
    });
    this.faceApi.trainPersonGroup(personGroupId).subscribe(() => {
      this.isLoadingResults = false;
      this.popToast({
        type: 'success',
        title: 'Training Initiated',
        showCloseButton: true,
      });
    });
  }
  deletePersonGroup(personGroupId) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.faceApi.deletePersonGroup(personGroupId).subscribe(
          (data) => {
            this.popToast({
              type: 'success',
              title: 'Group Deleted Sussessfully',
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
  getGroupTrainingStatus(personGroupId) {
    console.log('Hey from getGroupTrainingStatus', personGroupId);
    this.isLoadingResults = true;
    this.faceApi
      .getPersonGroupTrainingStatus(personGroupId)
      .subscribe((result) => {
        switch (result.status) {
          case 'succeeded':
            this.popToast({
              type: 'success',
              title: 'Training Succeeded',
              showCloseButton: true,
            });
            break;
          case 'running':
            this.popToast({
              type: 'info',
              title: 'Training still in progress...',
              body: 'Check back later',
              showCloseButton: true,
            });
            break;
          case 'failed':
            this.popToast({
              type: 'error',
              title: 'Error during Training',
              body: result.message,
              showCloseButton: true,
            });
            break;
          default:
            break;
        }
        this.isLoadingResults = false;
      });
  }
}
