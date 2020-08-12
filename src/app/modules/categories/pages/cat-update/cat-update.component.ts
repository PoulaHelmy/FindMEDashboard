import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '@@core/http/api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cat-update',
  templateUrl: './cat-update.component.html',
  styleUrls: ['./cat-update.component.scss'],
})
export class CatUpdateComponent implements OnInit, OnDestroy {
  catsForm: FormGroup;
  category: object;
  catName = '';

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService,
    private actRoute: ActivatedRoute
  ) {
    this.catsForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
      inputdes: ['', [Validators.required, Validators.minLength(3)]],
      inputkeywords: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.catName = res['item']['data']['name'];
      this.catsForm.patchValue({
        inputName: res['item']['data']['name'],
        inputdes: res['item']['data']['meta_description'],
        inputkeywords: res['item']['data']['meta_keywords'],
      });
    });
  }

  get getinput() {
    return this.catsForm.get('inputName');
  }

  get getdes() {
    return this.catsForm.get('inputdes');
  }

  get getkeywords() {
    return this.catsForm.get('inputkeywords');
  }

  onSubmit() {
    this.category = {
      meta_des: this.catsForm.get('inputdes').value,
      meta_keywords: this.catsForm.get('inputkeywords').value,
    };
    if (this.catName !== this.catsForm.get('inputName').value) {
      this.category['name'] = this.catsForm.get('inputName').value;
    }
    this.apiserv
      .updateItem(
        this.actRoute.snapshot.params['id'],
        this.category,
        'categories'
      )
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Created successfully', 'success');
        this.router.navigate(['categories']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }

  ngOnDestroy() {
  }
} //end of class
