import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FaceApiService } from 'app/modules/humans/services/face-api.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-add-face-url',
  templateUrl: './add-face-url.component.html',
  styleUrls: ['./add-face-url.component.scss'],
})
export class AddFaceUrlComponent implements OnInit {
  isLoadingResults = false;
  faceForm: FormGroup;
  selectedGroupId;
  selectedPersonId;
  options = {
    title: 'Are Sure To Delete This Person',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  images = [];
  @ViewChild('mainImg') mainImg;

  personList = [];
  selectedPerson = null;
  personFaces = [];

  detectedFaces: any;
  identifiedPersons = [];
  imageUrl: string;
  multiplier: number;
  personGroups = [];
  selectedFace: any;
  imgFile;
  fbbb;
  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private dialogService: ConfirmDialogService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedGroupId = this.actRoute.snapshot.paramMap.get('group');
    this.selectedPersonId = this.actRoute.snapshot.paramMap.get('person');

    this.faceForm = this.fb.group({
      file: new FormControl('', [Validators.required]),
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }

  onSubmit() {
    this.faceApi
      .addPersonFaceByUrl(
        this.selectedGroupId,
        this.selectedPersonId,
        this.faceForm.get('file').value
      )
      .subscribe(
        (data) => {
          this.popToast({
            type: 'success',
            title: 'Person Face Added Sussessfully',
            showCloseButton: true,
          });
          this.isLoadingResults = false;
          this.router.navigateByUrl(
            `humans/person/${this.selectedPersonId}/group/${this.selectedGroupId}`
          );
        },
        (err) => {
          this.popToast({
            type: 'error',
            title: 'Some Thing Wrong Please Try Again',
            body: err['error']['message'],
            showCloseButton: true,
          });
          this.isLoadingResults = false;
        }
      );
  }
}
