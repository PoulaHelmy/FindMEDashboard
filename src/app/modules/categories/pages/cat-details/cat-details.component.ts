import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDetails } from '@@shared/models/category';
import { ApiService } from '@@core/http/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.scss'],
})
export class CatDetailsComponent implements OnInit, OnDestroy {
  itemDetails: CategoryDetails;

  constructor(
    private apiserv: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.itemDetails = res['item']['data'];
    });
  }

  deleteItem(id: number, value: string) {
    this.apiserv.deleteCheck(id, value);
  }

  ngOnDestroy() {}
} //end of class
