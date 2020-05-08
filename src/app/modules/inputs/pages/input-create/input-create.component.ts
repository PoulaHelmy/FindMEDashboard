import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-input-create',
  templateUrl: './input-create.component.html',
  styleUrls: ['./input-create.component.scss'],
})
export class InputCreateComponent implements OnInit {
  inputsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService
  ) {
    this.inputsForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}
  get getinput() {
    return this.inputsForm.get('inputName');
  }

  onSubmit() {
    this.apiserv
      .addItem({ name: this.inputsForm.get('inputName').value }, 'inputs')
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Created successfully', 'success');
        this.router.navigate(['inputs']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }
  // onSubmit() {
  //   this.inputService
  //     .addItem(this.inputsForm.get('inputName').value)
  //     .toPromise()
  //     .then((next) => {
  //       this.snackbarService.show('Item Created successfully', 'success');
  //       this.router.navigate(['inputs']);
  //     })
  //     .catch((err) => {
  //       this.snackbarService.show(err['error']['errors']['name'], 'danger');
  //     });
  // }
} //end of Class
