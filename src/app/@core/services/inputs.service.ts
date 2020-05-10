import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputsService {
  endPoint: string = 'inputs';
  constructor() {}
}
