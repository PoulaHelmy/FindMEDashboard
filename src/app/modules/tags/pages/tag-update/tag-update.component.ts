import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tag-update',
  templateUrl: './tag-update.component.html',
  styleUrls: ['./tag-update.component.scss'],
})
export class TagUpdateComponent implements OnInit, OnDestroy {
  tagsForm: FormGroup;
  tagSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private apiserv: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.tagsForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {
    this.tagSubscription = this.actRoute.data.subscribe((res) => {
      this.tagsForm.get('inputName').patchValue(res['item']['data']['name']);
    });
  }

  get getinput() {
    return this.tagsForm.get('inputName');
  }
  onSubmit() {
    this.apiserv
      .updateItem(
        this.actRoute.snapshot.params['id'],
        { name: this.tagsForm.get('inputName').value },
        'tags'
      )
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Updated successfully', 'success');
        this.router.navigate(['tags']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }
  ngOnDestroy() {
    this.tagSubscription.unsubscribe();
  }
} //end of class
