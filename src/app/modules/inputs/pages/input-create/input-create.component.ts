import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-input-create',
  templateUrl: './input-create.component.html',
  styleUrls: ['./input-create.component.scss'],
})
export class InputCreateComponent implements OnInit {
  inputsForm: FormGroup;
  validatorItem: FormGroup;
  inputsTypedOptions: FormGroup;
  validatorsTypes = [
    {
      dataView: 'Pattern',
      dataStored: 'pattern',
    },
    {
      dataView: 'Max Length',
      dataStored: 'maxlength',
    },
    {
      dataView: 'Min Length',
      dataStored: 'minlength',
    },
    {
      dataView: 'Required',
      dataStored: 'required',
    },
    {
      dataView: 'Min Value Accepted',
      dataStored: 'min',
    },
    {
      dataView: 'Max Value Accepted',
      dataStored: 'max',
    },
  ];
  inputsTypes = [
    {
      dataView: 'Input',
      dataStored: 'input',
    },
    {
      dataView: 'Radio Button',
      dataStored: 'radiobutton',
    },
    {
      dataView: 'Date',
      dataStored: 'date',
    },
    {
      dataView: 'Select',
      dataStored: 'select',
    },
    {
      dataView: 'Check Box',
      dataStored: 'checkbox',
    },
  ];
  htmlInputTypes = [
    {
      dataView: 'Text',
      dataStored: 'text',
    },
    {
      dataView: 'Email',
      dataStored: 'email',
    },
    {
      dataView: 'Number',
      dataStored: 'number',
    },
    {
      dataView: 'Telphone',
      dataStored: 'tel',
    },
    {
      dataView: 'URL',
      dataStored: 'url',
    },
  ];
  isInput;
  data: {};
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService
  ) {}

  ngOnInit(): void {
    this.inputsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      label: ['', [Validators.required, Validators.minLength(3)]],
      inputType: ['', [Validators.required, Validators.minLength(3)]],
      placeholder: ['', [Validators.required, Validators.minLength(3)]],
      inputOptionsInput: ['', []],
      inputOptions: this.fb.array([]),
      inputsValidators: this.fb.array([]),
    });
  }
  /****************** Get Validators************************/
  getValidators() {
    return this.inputsForm.get('inputsValidators') as FormArray;
  }
  /****************** add Validator************************/
  addInputsValidator() {
    this.validatorItem = this.fb.group({
      validatorName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      validatorMessage: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      validatorOptions: new FormControl('', [Validators.required]),
    });
    this.getValidators().push(this.validatorItem);
  }
  /****************** remove  Validator************************/
  removeInputsValidator(index: number) {
    this.getValidators().removeAt(index);
  }
  /****************** Get One Validator************************/
  getOneValidator(index) {
    return this.getValidators().at(index);
  }
  /****************** Get typed inputs options************************/
  getArrayedOptions() {
    return this.inputsForm.get('inputOptions') as FormArray;
  }
  /****************** add Option to Array************************/
  addItemToArrayedInputs() {
    this.inputsTypedOptions = this.fb.group({
      optionName: new FormControl('', [Validators.required]),
    });
    this.getArrayedOptions().push(this.inputsTypedOptions);
  }
  /****************** remove  Option from Array************************/
  removeOptionFromArrayedInPuts(index: number) {
    this.getArrayedOptions().removeAt(index);
  }
  /****************** Get One Option************************/
  getOneOption(index) {
    return this.getArrayedOptions().at(index);
  }
  /****************** Submit Function************************/

  onSubmit() {
    this.data = {
      name: this.inputsForm.get('name').value,
      type: this.inputsForm.get('inputType').value,
      label: this.inputsForm.get('label').value,
      placeholder: this.inputsForm.get('placeholder').value,
      inputsValidators: this.inputsForm.get('inputsValidators').value,
      inputOptions: this.inputsForm.get('inputOptions').value,
      inputOptionsInput: this.inputsForm.get('inputOptionsInput').value,
    };
    let flag = this.inputsForm.get('inputType').value;
    if (flag == 'input') {
      this.data['inputOptions'] = '';
    }
    if (flag == 'checkbox' || flag == 'select' || flag == 'radiobutton') {
      this.data['inputOptionsInput'] = '';
    }
    this.apiserv
      .addItem(this.data, 'inputs')
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Created successfully', 'success');
        this.router.navigate(['inputs']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }
  // onSubmit() {
  //   this.inputService
  //     .addItem(this.inputsForm.get('inputName').value)
  //     .toPromise()
  //     .then((next) => {
  //       this.snackbarService.show('Item Created successfully', 'success');
  //       this.router.navigate(['inputs']);
  //     })
  //     .catch((err) => {
  //       this.snackbarService.show(err['error']['errors']['name'], 'danger');
  //     });
  // }
} //end of Class
