import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { ItemsService } from '@@core/services/items.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';
@Component({
  selector: 'app-items-images',
  templateUrl: './items-images.component.html',
  styleUrls: ['./items-images.component.scss'],
})
export class ItemsImagesComponent implements OnInit {
  images = [];
  itemsImages: FormGroup;
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  get f() {
    return this.myForm.controls;
  }
  ngOnInit() {}
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target);
          this.images.push(event.target.result);
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {
    this.http
      .post(
        `${env.apiRoot}/auth/items/images`,
        { images: this.myForm.get('fileSource').value, item_id: 25 },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      )
      .subscribe((res) => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
  }

  // onSubmit() {
  //   console.log('dsd :', this.itemsImages.value);
  // this.data = {
  //   name: this.itemsImages.get('name').value,

  // };
  // this.itemService
  //   .addItem(this.data, 'items')
  //   .toPromise()
  //   .then((next) => {
  //     console.log('next : ', next);
  //     this.snackbarService.show('Item Created successfully', 'success');
  //     this.router.navigate(['inputs']);
  //   })
  //   .catch((err) => {
  //     console.log('err :', err);
  //     this.snackbarService.show(err['error']['errors']['name'], 'danger');
  //   });
  //} //end of submit
}
