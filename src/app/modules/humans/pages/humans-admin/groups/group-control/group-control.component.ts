import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceApiService } from 'app/modules/humans/services/face-api.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';

@Component({
  selector: 'app-group-control',
  templateUrl: './group-control.component.html',
  styleUrls: ['./group-control.component.scss'],
})
export class GroupControlComponent implements OnInit {
  isLoadingResults = true;
  selectedGroupId;
  personList = [];
  options = {
    title: 'Are Sure To Delete This Person',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  constructor(
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private dialogService: ConfirmDialogService,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.selectedGroupId = this.actRoute.snapshot.paramMap.get('id');
    this.faceApi.getPersonsByGroup(this.selectedGroupId).subscribe((data) => {
      this.personList = data;
      this.isLoadingResults = false;
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }
  deletePerson(personId) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.isLoadingResults = true;
        this.faceApi.deletePerson(this.selectedGroupId, personId).subscribe(
          (data) => {
            this.popToast({
              type: 'success',
              title: 'Person Deleted Sussessfully',
              showCloseButton: true,
            });
            this.isLoadingResults = false;
            location.reload();
          },
          (err) => {
            this.popToast({
              type: 'error',
              title: 'Some Thing Wrong Please Try Again',
              showCloseButton: true,
            });
            this.isLoadingResults = false;
          }
        );
      }
    });
  }
} //end of Class
