import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Input } from '@@shared/models/input';
import { SubCategory } from '@@shared/models/sub-category';
import { InputsService } from '@@core/services/inputs.service';

@Component({
  selector: 'app-input-create',
  templateUrl: './input-create.component.html',
  styleUrls: ['./input-create.component.scss'],
})
export class InputCreateComponent implements OnInit {
  inputsForm: FormGroup;
  subcats: SubCategory[] = [
    { id: 1, name: 'cats' },
    { id: 2, name: 'foods' },
    { id: 3, name: 'birds' },
    { id: 4, name: 'humans' },
    { id: 5, name: 'cat1' },
    { id: 6, name: 'sports' },
    { id: 7, name: 'cars' },
    { id: 8, name: 'dogs' },
  ];
  constructor(private fb: FormBuilder, private inputService: InputsService) {
    this.inputsForm = this.fb.group({
      inputName: ['', [Validators.required, Validators.minLength(3)]],
      sub_category: ['', [Validators.required]],
    });
    this.inputService.getAllItems().subscribe((res) => console.log(res));
  }

  ngOnInit(): void {}
  get getinput() {
    return this.inputsForm.get('inputName');
  }
  get getsubcategory() {
    return this.inputsForm.get('sub_category');
  }
  onSubmit() {
    console.log(this.inputsForm.controls);
  }
} //end of Class
