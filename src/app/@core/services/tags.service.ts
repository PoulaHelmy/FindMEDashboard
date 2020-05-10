import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  endPoint: string = 'tags';

  constructor() {}
} //end of class
