import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaceApiService } from '../../../../services/face-api.service';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
})
export class AddListComponent implements OnInit {
  addListForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.addListForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userData: ['', [Validators.required, Validators.minLength(3)]],
      faceListId: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }

  onSubmit() {
    let newPersonGroup = {
      name: this.addListForm.get('name').value,
      userData: this.addListForm.get('userData').value,
      faceListId: this.addListForm.get('faceListId').value,
    };
    this.faceApi
      .createFaceList(
        newPersonGroup['faceListId'],
        newPersonGroup['name'],
        newPersonGroup['userData']
      )
      .subscribe(
        (data) => {
          this.popToast({
            type: 'success',
            title: 'List Added Sussessfully...',
            showCloseButton: true,
          });
          this.router.navigateByUrl('/humans/lists');
        },
        (err) => {
          this.popToast({
            type: 'error',
            title: 'Some Thing Wrong Please Try Again',
            body: err['error']['message'],
            showCloseButton: true,
          });
        }
      );
  }
}
