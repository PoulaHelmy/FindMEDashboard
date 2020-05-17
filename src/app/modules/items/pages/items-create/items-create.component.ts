import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  NgForm,
} from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { Category } from '@@shared/models/category';
import { ItemsService } from '@@core/services/items.service';

@Component({
  selector: 'app-items-create',
  templateUrl: './items-create.component.html',
  styleUrls: ['./items-create.component.scss'],
})
export class ItemsCreateComponent implements OnInit {
  images = [];
  itemsForm: FormGroup;
  categories: Category[] = [];
  subCategories: [] = [];
  data: {};
  isLoadingResults = false;
  isRateLimitReached = false;
  isLoadingImages = false;
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService,
    private actRoute: ActivatedRoute,
    private itemService: ItemsService
  ) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.categories = res['item']['data'];
    });
    this.itemsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      itemCategory: ['', [Validators.required]],
      itemsubCategory: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(10)]],
      is_found: ['', [Validators.required]],
      des: ['', [Validators.required, Validators.minLength(30)]],
      date: ['', [Validators.required]],
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
    });
    this.itemsForm.controls.itemCategory.valueChanges.subscribe((res) => {
      this.apiserv.getAllCatSubcats(res).subscribe((data) => {
        this.subCategories = data['data'];
      });
    });
  }

  onFileChange(event) {
    this.isLoadingImages = true;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
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
    console.log('dsd :', this.itemsForm.value);
    this.isLoadingResults = true;
    this.data = {
      name: this.itemsForm.get('name').value,
      category_id: this.itemsForm.get('itemCategory').value,
      subcat_id: this.itemsForm.get('itemsubCategory').value,
      location: this.itemsForm.get('location').value,
      is_found: 1,
      des: this.itemsForm.get('des').value,
      date: '2020-05-15 07:25:19',
      images: this.itemsForm.get('fileSource').value,
    };
    this.itemService
      .addItem(this.data, 'items')
      .toPromise()
      .then((next) => {
        console.log('next : ', next);
        this.isLoadingResults = false;
        this.snackbarService.show('Item Created successfully', 'success');
        this.router.navigateByUrl('/items/options', {
          state: { id: next['data']['subcat_id'], item_id: next['data']['id'] },
        });
      })
      .catch((err) => {
        console.log('err :', err);
        this.isRateLimitReached = true;
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  } //end of submit
} //end of Class
