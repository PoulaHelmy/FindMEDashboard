import { Component, OnInit } from '@angular/core';
import { InputsService } from '@@core/services/inputs.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
  constructor(private inputService: InputsService) {
  }

  ngOnInit(): void {}
} //end of class
