import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../../@core/http/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  itemDetails;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((res) => {
      // console.log(res);
      this.itemDetails = res['item'];
    });

  }

  goto(route: string, id: number) {
    this.router.navigate([`${route}/view/${id}`]);
  }
}
