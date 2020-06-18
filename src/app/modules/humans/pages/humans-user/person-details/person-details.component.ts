import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FaceApiService } from 'app/modules/humans/services/face-api.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { ItemsService } from '@@core/services/items.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  isLoadingResults = false;
  personId;
  itemDetails;

  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private itemServ: ItemsService
  ) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.itemDetails = res['item'][0]['data'];
      this.personId = res['item'][0]['personId'];
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }
  makeRequest(id) {
    this.router.navigateByUrl(`requests/create/${id}`);
  }
} //end of Class
