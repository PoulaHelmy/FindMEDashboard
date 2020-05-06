import { Component, OnInit } from '@angular/core';
import { Tag } from '@@shared/models/tag';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsService } from '@@core/services/tags.service';
@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.scss'],
})
export class TagDetailsComponent implements OnInit {
  tagDetails: Tag = { id: null, name: '' };
  isLoadingResults = true;
  constructor(
    private tagService: TagsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getTagDetails(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getTagDetails(id: string) {
    this.tagService.getTag(id).subscribe((data: any) => {
      this.tagDetails = data.data;
      console.log(this.tagDetails);
      this.isLoadingResults = false;
    });
  }
  deleteItem(id: number) {
    console.log(id);
  }
  updateItem(id: number) {
    console.log(id);
  }
} //end of Class
