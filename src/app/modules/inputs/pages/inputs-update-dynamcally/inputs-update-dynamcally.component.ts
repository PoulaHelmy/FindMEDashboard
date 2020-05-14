import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldConfig } from '@@shared/models/field.interface';
import { DynamicFormComponent } from '@@shared/pages/dynamicForms/dynamic-form/dynamic-form.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CoreService } from '@@core/services/core-service.service';

@Component({
  selector: 'app-inputs-update-dynamcally',
  templateUrl: './inputs-update-dynamcally.component.html',
  styleUrls: ['./inputs-update-dynamcally.component.scss'],
})
export class InputsUpdateDynamcallyComponent implements OnInit {
  @ViewChild(DynamicFormComponent) formmmmm: DynamicFormComponent;
  rerere = 'required';
  inputSubScription: Subscription;
  regConfig: FieldConfig[] = [];
  inputsArr = [
    { id: 49, name: 'colors' },
    { id: 84, name: 'firstName' },
  ];
  wqwq: FieldConfig;
  constructor(
    private fb: FormBuilder,
    private apiserv: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    // this.apiserv.getItem('62', 'subcategories').subscribe((res) => {
    //   this.inputsArr = res['data']['inputs'];
    //   console.log('res :', this.inputsArr);
    //   // this.regConfig=res['data']['inputs'];
    // });
    this.apiserv.getItem('85', 'inputs').subscribe((res) => {
      let xx = this.coreService.mapControl(res['data']);
      setTimeout(() => {
        this.regConfig = this.cccc;
        this.regConfig.push(xx);
      }, 3000);
    });
  }

  cccc = [
    {
      type: 'input',
      label: 'Username',
      inputType: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          message: 'Name Required',
        },
        {
          name: 'pattern',
          options: '^[a-zA-Z]+$',
          message: 'Accept only text',
        },
        {
          name: 'minlength',
          options: '6',
          message: 'min length 6 characters',
        },
      ],
    },
    {
      type: 'input',
      label: 'Email Address',
      inputType: 'email',
      name: 'email',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Email Required',
        },
        {
          name: 'pattern',
          validator: Validators.pattern(
            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
          ),
          message: 'Invalid email',
        },
      ],
    },
    {
      type: 'input',
      label: 'Password',
      inputType: 'password',
      name: 'password',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Password Required',
        },
      ],
    },
    {
      type: 'radiobutton',
      label: 'Gender',
      name: 'gender',
      options: ['Male', 'Female'],
      value: 'Male',
    },
    {
      type: 'date',
      label: 'DOB',
      name: 'dob',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Date of Birth Required',
        },
      ],
    },
    {
      type: 'select',
      label: 'Country',
      name: 'country',
      value: 'UK',
      options: ['India', 'UAE', 'UK', 'US'],
    },
    {
      type: 'checkbox',
      label: 'Accept Terms',
      name: 'term',
      value: true,
    },
    {
      type: 'button',
      label: 'Save',
    },
  ];

  getData(data: object) {
    for (let item in data) {
      console.log(item);
    }
  }
  submit(value: any) {
    console.log('dsd', value);
  }
}
