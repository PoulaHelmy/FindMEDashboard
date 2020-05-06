import { Component, OnInit } from '@angular/core';
import { TagsService } from '@@core/services/tags.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tagDetails: any;

  constructor(
    private tagService: TagsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiSerivce: ApiService
  ) {
    // console.log(this.getAllTagDetails());
    // this.getTagDetails(this.activatedRoute.params.value.id);
    // this.apiSerivce.doGet().subscribe();
  }

  ngOnInit(): void {}

  canDeActivate(): boolean {
    return false;
  }

  // getTagDetails(id: number) {
  //   this.tagService.getTag(id).subscribe((tag) => {
  //     console.log('TAG : ', tag);
  //     this.tagDetails = tag;
  //   });
  // }
  // getAllTagDetails() {
  //   this.tagService.getAllTags().subscribe((tag) => {
  //     console.log('All - TAG : ', tag);
  //   });
  // }
} // end of Class
