import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaceApiService } from '../../../../services/face-api.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  addGroupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private faceApi: FaceApiService
  ) {}

  ngOnInit(): void {
    this.addGroupForm = this.fb.group({
      personGroupId: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      userData: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    let newPersonGroup = {
      personGroupId: this.addGroupForm.get('personGroupId').value,
      name: this.addGroupForm.get('name').value,
      userData: this.addGroupForm.get('userData').value,
    };
    this.faceApi.createPersonGroup(newPersonGroup).subscribe(
      (data) => {
        this.snackbarService.show('Group Added Sussessfully', 'success');
        this.router.navigateByUrl('/humans/configuration');
      },
      (err) => {
        this.snackbarService.show(
          'Some Thing Wrong Please Try Again',
          'danger'
        );
      }
    );
  }
}
