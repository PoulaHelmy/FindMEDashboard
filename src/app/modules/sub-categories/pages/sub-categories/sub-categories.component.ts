import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface SubCategories {
  id: number;
  name: string;
  category: string;
  meta_desc: string;
  meta_keywords: string;
}
interface Categories {
  value: number;
  viewValue: string;
}
const ELEMENT_DATA: SubCategories[] = [
  {
    id: 1,
    name: 'Poula',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
  {
    id: 2,
    name: 'Poula',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
  {
    id: 3,
    name: 'Poula',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
  {
    id: 4,
    name: 'Poula',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
  {
    id: 5,
    name: 'Poula',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
  {
    id: 6,
    name: 'Poula',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
  {
    id: 6,
    name: 'zzzzz',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
  {
    id: 6,
    name: 'xxxx',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
  {
    id: 6,
    name: 'ccc',
    category: 'dsd4dsds  ',
    meta_desc: 'sdasadasw',
    meta_keywords: 'dsd4w5545',
  },
];
@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'meta_desc',
    'meta_keywords',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  subCatForm: FormGroup;
  resultsLength: any;
  selectedValue: string;
  cats: Categories[] = [
    { value: 1, viewValue: 'cats' },
    { value: 2, viewValue: 'foods' },
    { value: 3, viewValue: 'birds' },
    { value: 4, viewValue: 'humans' },
    { value: 5, viewValue: 'cat1' },
    { value: 6, viewValue: 'sports' },
    { value: 7, viewValue: 'cars' },
    { value: 8, viewValue: 'dogs' },
  ];
  constructor(private fb: FormBuilder) {
    this.subCatForm = this.fb.group({
      subCatName: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      meta_des: ['', [Validators.required, Validators.minLength(3)]],
      meta_keywords: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}
  get getSubCatName() {
    return this.subCatForm.get('subCatName');
  }
  get getdesc() {
    return this.subCatForm.get('meta_des');
  }
  get getkeywords() {
    return this.subCatForm.get('meta_keywords');
  }
  get getcategory() {
    return this.subCatForm.get('category');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
    console.log(this.subCatForm.controls);
  }

  canDeActivate(): boolean {
    return false;
  }
} //end of class
