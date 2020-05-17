import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldConfig } from '@@shared/models/field.interface';
import { DynamicFormComponent } from '@@shared/pages/dynamicForms/dynamic-form/dynamic-form.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroupName,
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
  inputSubScription: Subscription;
  regConfig: FieldConfig[] = [];
  formChilds: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiserv: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      const btn = {
        type: 'button',
        label: 'Save Data',
      };
      for (let i = 0; i < res['item'].length; i++) {
        this.regConfig.push(res['item'][i]);
      }
      this.regConfig.push(btn);
      console.log('this.regConfig : ', this.regConfig);
    });
  }

  submit(value: any) {
    console.log('form Is :  ', this.formmmmm);

    console.log('dsd', value);
  }
}
