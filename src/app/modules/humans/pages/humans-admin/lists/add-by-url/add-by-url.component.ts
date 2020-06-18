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
  selector: 'app-add-by-url',
  templateUrl: './add-by-url.component.html',
  styleUrls: ['./add-by-url.component.scss'],
})
export class AddByUrlComponent implements OnInit {
  isLoadingResults = false;
  faceForm: FormGroup;
  selectedlistId;

  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedlistId = this.actRoute.snapshot.paramMap.get('id');
    this.faceForm = this.fb.group({
      file: new FormControl('', [Validators.required]),
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }

  onSubmit() {
    this.faceApi
      .addFace(this.selectedlistId, this.faceForm.get('file').value)
      .subscribe(
        (data) => {
          this.popToast({
            type: 'success',
            title: 'Person Face Added Sussessfully',
            showCloseButton: true,
          });
          this.isLoadingResults = false;
          this.router.navigateByUrl(`humans/list/${this.selectedlistId}`);
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
