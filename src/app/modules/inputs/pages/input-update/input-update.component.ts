import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-input-update',
  templateUrl: './input-update.component.html',
  styleUrls: ['./input-update.component.scss'],
})
export class InputUpdateComponent implements OnInit, OnDestroy {
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
  isInput: string;
  inputTyped: string;
  data: {};
  constructor(
    private fb: FormBuilder,
    private apiserv: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}
  /****************** Start ngOnInit************************/
  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.isInput = res['item']['data']['type'];
      if (
        res['item']['data']['inputType'] !== 'input' ||
        res['item']['data']['inputType'] !== 'date'
      ) {
        this.inputTyped = res['item']['data']['inputType'];
      }
      this.data = res['item']['data'];
    });
    this.inputsForm = this.fb.group({
      name: [this.data['name'], [Validators.required, Validators.minLength(3)]],
      label: [
        this.data['label'],
        [Validators.required, Validators.minLength(3)],
      ],
      inputType: [
        this.data['type'],
        [Validators.required, Validators.minLength(3)],
      ],
      inputOptionsInput: ['', []],
      inputOptions: this.fb.array([]),
      inputsValidators: this.fb.array([]),
      placeholder: [
        this.data['placeholder'],
        [Validators.required, Validators.minLength(3)],
      ],
    });
    for (let i = 0; i < this.data['AllValidators'].length; i++) {
      this.addInputsValidator();
      this.getValidators().at(i).patchValue(this.data['AllValidators'][i]);
    }
    if (
      this.data['type'] === 'select' ||
      this.data['type'] === 'checkbox' ||
      this.data['type'] === 'radiobutton'
    ) {
      for (let i = 0; i < this.data['AllOptions'].length; i++) {
        this.addItemToArrayedInputs();
        this.getArrayedOptions().at(i).patchValue(this.data['AllOptions'][i]);
      }
    }
    this.inputsForm.patchValue(this.data);
  }
  /******************End  ngOnInit************************/

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
    const id = this.data['id'];
    let oldName = this.data['name'];
    let newName = this.inputsForm.get('name').value;
    this.data = {
      type: this.inputsForm.get('inputType').value,
      label: this.inputsForm.get('label').value,
      inputsValidators: this.inputsForm.get('inputsValidators').value,
      inputOptions: this.inputsForm.get('inputOptions').value,
      inputOptionsInput: this.inputsForm.get('inputOptionsInput').value,
      placeholder: ['', [Validators.required, Validators.minLength(3)]],
    };
    if (oldName !== newName) {
      this.data['name'] = this.inputsForm.get('name').value;
    }
    let flag = this.inputsForm.get('inputType').value;
    if (flag == 'input') {
      this.data['inputOptions'] = '';
    }
    if (flag == 'checkbox' || flag == 'select' || flag == 'radiobutton') {
      this.data['inputOptionsInput'] = '';
    }
    this.apiserv
      .updateItem(id, this.data, 'inputs')
      .toPromise()
      .then((next) => {
        this.snackbarService.show('Item Updated successfully', 'success');
        this.router.navigate(['inputs']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      });
  }
  /****************** ngOnDestroy Function************************/

  ngOnDestroy() {}
} //end of class
