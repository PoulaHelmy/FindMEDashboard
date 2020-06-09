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
  personList = [];
  selectedPerson = null;
  personFaces = [];
  options = {
    title: 'Are Sure To Delete This Person',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private snackbarService: SnackbarService,
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
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }
  addPersonFace() {
    this.router.navigateByUrl(
      `/humans/addface/${this.selectedPersonId}/group/${this.selectedGroupId}`
    );
    // let subCatId = this.router.getCurrentNavigation().extras.state.id;
    // let item_id = this.router.getCurrentNavigation().extras.state.item_id;
    // this.inputBox.show('Add Face', 'URL:').then((result) => {
    //   this.faceApi
    //     .addPersonFace(
    //       this.selectedGroupId,
    //       this.selectedPerson.personId,
    //       result
    //     )
    //     .subscribe((data) => {
    //       let newFace = {
    //         persistedFaceId: data.persistedFaceId,
    //         userData: result,
    //       };
    //       this.personFaces.push(newFace);
    //     });
    // });
  }

  deletePersonFace(persistedFaceId) {
    // this.faceApi
    //   .deletePersonFace(
    //     this.selectedGroupId,
    //     this.selectedPerson.personId,
    //     persistedFaceId
    //   )
    //   .subscribe(() => {
    //     _.remove(
    //       this.personFaces,
    //       (x) => x.persistedFaceId === persistedFaceId
    //     );
    //   });
  }
}
