import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-update',
  templateUrl: './input-update.component.html',
  styleUrls: ['./input-update.component.scss'],
})
export class InputUpdateComponent implements OnInit, OnDestroy {
  inputsForm: FormGroup;
  inputSubScription: Subscription;
  constructor(
    private fb: FormBuilder,
    private apiserv: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.inputsForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.inputsForm.get('inputName').patchValue(res['item']['data']['name']);
    });
  }
  ngAfterViewInit() {}
  get getinput() {
    return this.inputsForm.get('inputName');
  }
  onSubmit() {
    this.apiserv
      .updateItem(
        this.actRoute.snapshot.params['id'],
        { name: this.inputsForm.get('inputName').value },
        'inputs'
      )
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Updates successfully', 'success');
        this.router.navigate(['inputs']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }
  ngOnDestroy() {
    this.inputSubScription.unsubscribe();
  }
} //end of class
