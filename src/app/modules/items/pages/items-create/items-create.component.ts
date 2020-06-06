import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { Category } from '@@shared/models/category';
import { ItemsService } from '@@core/services/items.service';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { DatePipe } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'X-Algolia-Application-Id': 'plBIPOQ7X7HA',
    'X-Algolia-API-Key': 'ce287ed40c8a6f4d8579799492461dd7',
  }),
};
@Component({
  selector: 'app-items-create',
  templateUrl: './items-create.component.html',
  styleUrls: ['./items-create.component.scss'],
})
export class ItemsCreateComponent implements OnInit, OnDestroy {
  subscription1$: Subscription;
  subscription2$: Subscription;
  subscription4$: Subscription;
  subscription3$: Subscription;
  subscription5$: Subscription;
  images = [];
  itemsForm: FormGroup;
  categories: Category[] = [];
  subCategories: [] = [];
  data: {};
  isLoadingResults = true;
  isLoadingImages = false;
  options = {
    title: 'Are Sure To Submit This Part  ',
    message:
      'Because in case to Continue you will not be able to update them in this time',
    cancelText: 'Cancel And Review this Data',
    confirmText: 'Confirm And Continue',
  };
  date = new Date(2020, 1, 1);
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  filteredOptions;
  /****************** constructor Function************************/
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private dialogService: ConfirmDialogService,
    public datepipe: DatePipe,
    private router: Router,
    private apiserv: ApiService,
    private actRoute: ActivatedRoute,
    private itemService: ItemsService,
    private http: HttpClient
  ) {}

  /****************** ngOnInit Function************************/
  ngOnInit(): void {
    this.subscription1$ = this.actRoute.data.subscribe((res) => {
      this.categories = res['item']['data'];
    });
    this.itemsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      itemCategory: ['', [Validators.required]],
      itemsubCategory: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      is_found: ['', [Validators.required]],
      des: ['', [Validators.required, Validators.minLength(30)]],
      date: ['', [Validators.required]],
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
    });
    this.isLoadingResults = false;
    this.subscription2$ = this.itemsForm.controls.itemCategory.valueChanges.subscribe(
      (res) => {
        this.subscription3$ = this.apiserv
          .getAllCatSubcats(res)
          .subscribe((data) => {
            this.subCategories = data['data'];
          });
      }
    );
    this.subscription5$ = this.itemsForm.controls.location.valueChanges.subscribe(
      (res) => {
        if (res !== '' && res !== null && res !== ' ') {
          let data = { query: res, type: 'address' };
          this.http
            .post(
              'https://places-dsn.algolia.net/1/places/query',
              data,
              httpOptions
            )
            .subscribe((locations) => {
              this.filteredOptions = locations['hits'];
            });
        }
      }
    );
  } //end of ngOnInit

  /****************** File uploading Function************************/
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        this.isLoadingImages = true;

        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.itemsForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }

    this.isLoadingImages = false;
  }

  /****************** Submit Function************************/
  onSubmit() {
    // console.log('loaction : ', this.itemsForm.controls.location.value);
    let newDate = this.itemsForm.get('date').value;
    newDate = this.datepipe.transform(newDate, 'yyyy-MM-dd');

    this.data = {
      name: this.itemsForm.get('name').value,
      category_id: this.itemsForm.get('itemCategory').value,
      subcat_id: this.itemsForm.get('itemsubCategory').value,
      location: this.itemsForm.get('location').value,
      is_found: this.itemsForm.get('is_found').value,
      des: this.itemsForm.get('des').value,
      date: newDate,
      images: this.itemsForm.get('fileSource').value,
    };
    this.dialogService.open(this.options);
    this.subscription4$ = this.dialogService
      .confirmed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.isLoadingResults = true;
          this.itemService
            .addItem(this.data, 'items')
            .toPromise()
            .then((next) => {
              this.isLoadingResults = false;
              this.snackbarService.show('Item Created successfully', 'success');
              this.router.navigateByUrl('/items/options', {
                state: {
                  id: next['data']['subcat_id'],
                  item_id: next['data']['id'],
                },
              });
            })
            .catch((err) => {
              console.log('err :', err);
              this.isLoadingResults = false;
              this.snackbarService.show(
                err['error']['errors']['name'],
                'danger'
              );
            });
        }
      });
  } //end of submit

  /****************** DEstroy Function************************/
  ngOnDestroy(): void {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
    this.subscription5$.unsubscribe();
  } //end of destroy

  // https://places-dsn.algolia.net
  // $ curl -X POST 'https://places-dsn.algolia.net/1/places/query' --data '{"query": "Paris"}'
} //end of Class
// this.http
// .post('https://places-dsn.algolia.net/1/places/query', data, {
//   headers: {
//     'X-Algolia-Application-Id': 'VNP1XYFNSF',
//     'X-Algolia-API-Key: YourAPIKey': '43313045a7a3e98b65b0cb53cdc3cfcc',
//   },
// })
