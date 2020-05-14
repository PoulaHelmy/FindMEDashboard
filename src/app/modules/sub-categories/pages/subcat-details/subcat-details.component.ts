import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { SubCategory } from '@@shared/models/sub-category';
@Component({
  selector: 'app-subcat-details',
  templateUrl: './subcat-details.component.html',
  styleUrls: ['./subcat-details.component.scss'],
})
export class SubcatDetailsComponent implements OnInit, OnDestroy {
  itemDetails: SubCategory = {
    id: null,
    name: '',
    category: null,
    meta_des: '',
    meta_keywords: '',
    created_at: '',
    category_name: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiserv: ApiService
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
