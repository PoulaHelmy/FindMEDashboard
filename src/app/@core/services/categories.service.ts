import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  endPoint: string = 'categories';
  constructor() {}
} //end of class
