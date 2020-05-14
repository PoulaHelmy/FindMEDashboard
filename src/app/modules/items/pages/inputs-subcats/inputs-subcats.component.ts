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
  selector: 'app-inputs-subcats',
  templateUrl: './inputs-subcats.component.html',
  styleUrls: ['./inputs-subcats.component.scss'],
})
export class InputsSubcatsComponent implements OnInit, OnDestroy {
  inputsForm: FormGroup;
  inputItem: FormGroup;
  inputList;
  subCatsList;
  subscription1$: Subscription;
  subscription2$: Subscription;

  data: {};
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription1$ = this.activatedRoute.data.subscribe((res) => {
      this.subCatsList = res['allSubCats']['data'];
    });
    this.subscription2$ = this.apiserv
      .getAllItems('inputs')
      .subscribe((res) => {
        this.inputList = res['data'];
      });
  }

  ngOnInit(): void {
    this.inputsForm = this.fb.group({
      subcat: ['', [Validators.required]],
      subcatInputs: this.fb.array([]),
    });
  }
  /****************** Get Inputs************************/
  getinputs() {
    return this.inputsForm.get('subcatInputs') as FormArray;
  }
  /****************** add Input************************/
  addInput() {
    this.inputItem = this.fb.group({
      input_id: new FormControl('', [Validators.required]),
    });
    this.getinputs().push(this.inputItem);
  }
  /****************** remove  Input************************/
  removeInput(index: number) {
    this.getinputs().removeAt(index);
  }
  /****************** Get One Validator************************/
  getOneInput(index) {
    return this.getinputs().at(index);
  }
  /**************** Submit Function************************/

  onSubmit() {
    let inputs = [];
    for (let item of this.getinputs().value) {
      inputs.push(item['input_id']);
    }
    this.data = {
      subcat: this.inputsForm.get('subcat').value,
      inputs: inputs,
    };

    this.apiserv
      .inputsSubcats(this.data)
      .toPromise()
      .then((next) => {
        console.log('res : :  :', next);
        this.snackbarService.show(next['message'], 'success');
        this.router.navigate(['subcategories']);
      })
      .catch((err) => {
        this.snackbarService.show('Error', 'danger');
      });
  }
  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
} //end of Class
