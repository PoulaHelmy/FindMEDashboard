import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@@shared/models/input';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html',
  styleUrls: ['./input-details.component.scss'],
})
export class InputDetailsComponent implements OnInit, OnDestroy {
  itemDetails: Input = { id: null, name: '', created_at: '' };

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
    this.apiserv.deleteCheck(id, 'inputs');
  }

  ngOnDestroy() {}
} //end of class
