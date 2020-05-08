import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@@shared/models/category';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.scss'],
})
export class CatDetailsComponent implements OnInit, OnDestroy {
  itemDetails: Category = {
    id: null,
    name: '',
    meta_des: '',
    meta_keywords: '',
    created_at: '',
  };

  constructor(
    private apiserv: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.itemDetails = res['item']['data'];
    });
  }

  deleteItem(id: number) {
    this.apiserv.deleteCheck(id, 'categories');
  }

  ngOnDestroy() {}
} //end of class
