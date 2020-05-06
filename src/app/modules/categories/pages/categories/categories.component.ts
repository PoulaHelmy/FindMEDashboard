import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

export interface Categories {
  id: number;
  name: string;
  meta_desc: string;
  meta_keywords: string;
}

const ELEMENT_DATA: Categories[] = [
  {id: 1, name: 'Poula', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
  {id: 2, name: 'Poula', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
  {id: 3, name: 'Poula', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
  {id: 4, name: 'Poula', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
  {id: 5, name: 'Poula', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
  {id: 6, name: 'Poula', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
  {id: 6, name: 'zzzzz', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
  {id: 6, name: 'xxxx', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
  {id: 6, name: 'ccc', meta_desc: 'sdasadasw', meta_keywords: 'dsd4w5545'},
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'meta_desc', 'meta_keywords'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  catForm: FormGroup;
  resultsLength: any;
  constructor( private fb: FormBuilder) {
    this.catForm = this.fb.group({
      catName: [ '', [Validators.required, Validators.minLength(3)] ],
      meta_des: ['', [Validators.required, Validators.minLength(3)]],
      meta_keywords: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
  }
  get getcatName(){return this.catForm.get('catName'); }
  get getdesc(){return this.catForm.get('meta_des'); }
  get getkeywords(){return this.catForm.get('meta_keywords'); }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit(){

    console.log(this.catForm.controls);
  }
}

