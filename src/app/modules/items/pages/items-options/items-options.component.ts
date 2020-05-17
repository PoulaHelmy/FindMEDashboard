import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { ItemsService } from '@@core/services/items.service';
import { DynamicFormComponent } from '@@shared/pages/dynamicForms/dynamic-form/dynamic-form.component';
import { Subscription } from 'rxjs';
import { FieldConfig } from '@@shared/models/field.interface';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../../environments/environment';
@Component({
  selector: 'app-items-options',
  templateUrl: './items-options.component.html',
  styleUrls: ['./items-options.component.scss'],
})
export class ItemsOptionsComponent implements OnInit {
  @ViewChild(DynamicFormComponent) formmmmm: DynamicFormComponent;
  itemsOptions: FormGroup;
  isLoadingResults = false;
  isRateLimitReached = false;
  inputSubScription: Subscription;
  regConfig: FieldConfig[] = [];
  item_id = 0;
  data: {};
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService,
    private actRoute: ActivatedRoute,
    private itemService: ItemsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      console.log('res : ', res);
      this.item_id = res['item'][0]['item_id'];
      const btn = {
        type: 'button',
        label: 'Save Data',
      };
      for (let i = 0; i < res['item'][0]['data'].length; i++) {
        this.regConfig.push(res['item'][0]['data'][i]);
      }
      this.regConfig.push(btn);
      console.log('this.regConfig : ', this.regConfig);
    });
    // this.item_id = this.router.getCurrentNavigation().extras.state.item_id;
    console.log('item_id', this.item_id);
  }

  /****************** Submit Function************************/
  submit(value: any) {
    this.data = {
      item_id: this.item_id,
    };
    for (let i = 0; i < Object.entries(value).length; i++) {
      if (
        Object.entries(value)[i][0] === undefined ||
        Object.entries(value)[i][0] == 'undefined'
      ) {
        break;
      }
      this.data[Object.entries(value)[i][0]] = Object.entries(value)[i][1];
    }
    console.log('All DAta :', this.data);
    this.isLoadingResults = true;
    this.http
      .post(`${env.apiRoot}/auth/items/values`, this.data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .subscribe((res) => {
        console.log('DDDD :', res);
      });
  }
}
