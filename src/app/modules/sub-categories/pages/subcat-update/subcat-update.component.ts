import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { Category } from '@@shared/models/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subcat-update',
  templateUrl: './subcat-update.component.html',
  styleUrls: ['./subcat-update.component.scss'],
})
export class SubcatUpdateComponent implements OnInit, OnDestroy {
  subCatsForm: FormGroup;
  subCategory: object;
  categories: Category[];
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subCatsForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
      inputdes: ['', [Validators.required, Validators.minLength(3)]],
      inputkeywords: ['', [Validators.required, Validators.minLength(3)]],
      inputCategory: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiserv.getAllItems('categories').subscribe((res) => {
      this.categories = res['data'];
    });
    this.activatedRoute.data.subscribe((res) => {
      this.subCatsForm.patchValue({
        inputName: res['item']['data']['name'],
        inputdes: res['item']['data']['meta_des'],
        inputkeywords: res['item']['data']['meta_keywords'],
        inputCategory: res['item']['data']['category_id'],
      });
    });
  }
  get getinput() {
    return this.subCatsForm.get('inputName');
  }
  get getdes() {
    return this.subCatsForm.get('inputdes');
  }
  get getkeywords() {
    return this.subCatsForm.get('inputkeywords');
  }
  get getcat() {
    return this.subCatsForm.get('inputCategory');
  }
  compareFn(t1: number, t2: number): boolean {
    return t1 == t2 ? true : false;
  }
  onSubmit() {
    this.subCategory = {
      name: this.subCatsForm.get('inputName').value,
      meta_des: this.subCatsForm.get('inputdes').value,
      meta_keywords: this.subCatsForm.get('inputkeywords').value,
      category_id: this.subCatsForm.get('inputCategory').value,
    };
    this.apiserv
      .updateItem(
        this.activatedRoute.snapshot.params['id'],
        this.subCategory,
        'subcategories'
      )
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Updated successfully', 'success');
        this.router.navigate(['subcategories']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }
  ngOnDestroy(): void {}
} //end of Classconsole.log('')
