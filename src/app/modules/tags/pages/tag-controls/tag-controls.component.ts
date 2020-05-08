import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-tag-controls',
  templateUrl: './tag-controls.component.html',
  styleUrls: ['./tag-controls.component.scss'],
})
export class TagControlsComponent implements OnInit {
  tagsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService
  ) {
    this.tagsForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}
  get getinput() {
    return this.tagsForm.get('inputName');
  }

  onSubmit() {
    this.apiserv
      .addItem({ name: this.tagsForm.get('inputName').value }, 'tags')
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Created successfully', 'success');
        this.router.navigate(['tags']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }
} //end of class
