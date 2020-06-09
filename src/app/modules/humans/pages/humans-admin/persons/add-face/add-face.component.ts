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
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-face',
  templateUrl: './add-face.component.html',
  styleUrls: ['./add-face.component.scss'],
})
export class AddFaceComponent implements OnInit {
  isLoadingResults = false;
  addFaceForm: FormGroup;
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
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedGroupId = this.actRoute.snapshot.paramMap.get('group');
    this.selectedPersonId = this.actRoute.snapshot.paramMap.get('person');
    this.addFaceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userData: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }

  onSubmit() {
    // let newPersonData = {};
    // this.faceApi.createPerson(this.selectedGroupId, newPersonData).subscribe(
    //   (data) => {
    //     this.snackbarService.show('Person Added Sussessfully', 'success');
    //     this.router.navigateByUrl(`/humans/group/${this.selectedGroupId}`);
    //   },
    //   (err) => {
    //     this.snackbarService.show(
    //       'Some Thing Wrong Please Try Again',
    //       'danger'
    //     );
    //   }
    // );
  }
}
