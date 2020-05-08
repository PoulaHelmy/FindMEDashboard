import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { Category } from '@@shared/models/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subcat-create',
  templateUrl: './subcat-create.component.html',
  styleUrls: ['./subcat-create.component.scss'],
})
export class SubcatCreateComponent implements OnInit, OnDestroy {
  subCatsForm: FormGroup;
  subCategory: object;
  categories: Category[];
  catSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService
  ) {
    this.subCatsForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
      inputdes: ['', [Validators.required, Validators.minLength(3)]],
      inputkeywords: ['', [Validators.required, Validators.minLength(3)]],
      inputCategory: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.catSubscription = this.apiserv
      .getAllItems('categories')
      .subscribe((res) => {
        this.categories = res['data'];
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
  onSubmit() {
    this.subCategory = {
      name: this.subCatsForm.get('inputName').value,
      meta_des: this.subCatsForm.get('inputdes').value,
      meta_keywords: this.subCatsForm.get('inputkeywords').value,
      category_id: this.subCatsForm.get('inputCategory').value,
    };
    this.apiserv
      .addItem(this.subCategory, 'subcategories')
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Created successfully', 'success');
        this.router.navigate(['subcategories']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }
  ngOnDestroy(): void {
    this.catSubscription.unsubscribe();
  }
} //end of Classconsole.log('')
