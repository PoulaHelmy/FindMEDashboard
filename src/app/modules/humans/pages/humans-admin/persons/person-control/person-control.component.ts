import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-person-control',
  templateUrl: './person-control.component.html',
  styleUrls: ['./person-control.component.scss'],
})
export class PersonControlComponent implements OnInit {
  isLoadingResults = false;
  selectedGroupId;
  selectedPersonId;
  selectedPerson: any;
  personFaces = [];
  defImg = '../../../../assets/imgs/undraw_community_8nwl.svg';
  options = {
    title: 'Are Sure To Delete This Face',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private dialogService: ConfirmDialogService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedGroupId = this.actRoute.snapshot.paramMap.get('group');
    this.selectedPersonId = this.actRoute.snapshot.paramMap.get('person');
    this.faceApi
      .getPersonFaces(this.selectedGroupId, this.selectedPersonId)
      .subscribe((data) => {
        this.personFaces = data;
      });
    this.faceApi
      .getPerson(this.selectedGroupId, this.selectedPersonId)
      .subscribe((res) => {
        this.selectedPerson = res;
      });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }
  addPersonFaceByUrl() {
    this.router.navigateByUrl(
      `/humans/addfaceurl/${this.selectedPersonId}/group/${this.selectedGroupId}`
    );
  }
  addPersonFaceFromLocal() {
    this.router.navigateByUrl(
      `/humans/addface/${this.selectedPersonId}/group/${this.selectedGroupId}`
    );
  }

  deletePersonFace(persistedFaceId) {
    this.dialogService.open(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.isLoadingResults = true;
        this.faceApi
          .deletePersonFace(
            this.selectedGroupId,
            this.selectedPersonId,
            persistedFaceId
          )
          .subscribe(
            (data) => {
              this.popToast({
                type: 'success',
                title: 'Person Face Deleted Sussessfully',
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
}
