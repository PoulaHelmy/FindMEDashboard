import {Component, ViewChild, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {FieldConfig} from '@@shared/models/field.interface';
import {DynamicFormComponent} from '@@shared/pages/dynamicForms/dynamic-form/dynamic-form.component';
import {CoreService} from '@@core/services/core-service.service';

@Component({
  selector: 'app-test-dynamic-form',
  templateUrl: './test-dynamic-form.component.html',
  styleUrls: ['./test-dynamic-form.component.scss'],
})
export class TestDynamicFormComponent implements OnInit {
  @ViewChild(DynamicFormComponent) formmmmm: DynamicFormComponent;
  rerere = 'required';

  constructor(private coreService: CoreService) {
  }

  ngOnInit(): void {
    this.getData(this.data);
  }

  regConfig: FieldConfig[] = [
    {
      type: 'input',
      label: 'Username',
      inputType: 'text',
      name: 'firstName',
      value: 'poula',
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
      value: 'poula@gmail.com',
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
      value: 'poulapoulapoula',
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
      value: 'India',
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
  data = [
    {
      type: 'input',
      name: 'brand',
      label: 'Brand',
      inputType: 'text',
      validations: [
        {
          name: 'required',
          message: 'Brand Required',
        },
        {
          name: 'minlength',
          message: 'Min Length is 3',
        },
      ],
    },
    {
      type: 'input',
      name: 'name',
      label: 'Name',
      inputType: 'text',
      validations: [
        {
          name: 'required',
          message: 'Name Required',
        },
        {
          name: 'minlength',
          message: 'Min Length is 6',
        },
      ],
    },
  ];

  getData(data: object) {
    for (let item in data) {
      // console.log(item);
    }
  }

  submit(value: any) {
    // console.log('dsd', this.formmmmm.value);
  }
} //end of class
