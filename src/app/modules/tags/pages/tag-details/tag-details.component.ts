import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tag } from '@@shared/models/tag';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.scss'],
})
export class TagDetailsComponent implements OnInit, OnDestroy {
  itemDetails: Tag = { id: null, name: '', created_at: '' };

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
    this.apiserv.deleteCheck(id, 'tags');
  }

  ngOnDestroy() {}
} //end of class
