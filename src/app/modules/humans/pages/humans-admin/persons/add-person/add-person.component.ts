import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaceApiService } from '../../../../services/face-api.service';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
})
export class AddPersonComponent implements OnInit {
  addPersonForm: FormGroup;
  selectedGroupId;
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private faceApi: FaceApiService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedGroupId = this.actRoute.snapshot.paramMap.get('group');
    this.addPersonForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userData: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    let newPersonData = {
      name: this.addPersonForm.get('name').value,
      userData: this.addPersonForm.get('userData').value,
    };

    this.faceApi.createPerson(this.selectedGroupId, newPersonData).subscribe(
      (data) => {
        this.snackbarService.show('Person Added Sussessfully', 'success');
        this.router.navigateByUrl(`/humans/group/${this.selectedGroupId}`);
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
