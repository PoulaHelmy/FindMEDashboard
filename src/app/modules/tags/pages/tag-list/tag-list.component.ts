import { Component, OnInit } from '@angular/core';
import { TagsService } from '@@core/services/tags.service';
import { Tag } from '../../../../@shared/models/tag';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  allTags$: Observable<any>;

  displayedColumns: string[] = ['id', 'name', 'status'];
  datasource: Tag[] = [];
  isLoadingResults = true;

  constructor(private tagService: TagsService, private router: Router) {} //end of constructor

  ngOnInit(): void {
    // this.tagService.getAllTags().subscribe((ress) => {
    //   this.allTags$ = ress['data'];
    // });
    this.tagService.getAllTags().subscribe(
      (res: any) => {
        this.datasource = res;
        console.log(this.datasource);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log('error :   ', err);
        this.isLoadingResults = false;
      }
    );
  } //end of nginit
  showItem(id) {
    console.log('ID : ', id);
  } //end of show
  deleteItem(id: number) {
    this.tagService.deleteTag(id).subscribe((res) => {
      this.router.navigate(['tags']);
      console.log(res);
    });
  } //end of delete
  updateItem(id: number) {
    console.log('ID : ', id);
  } //end of update
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '') {
      return this.datasource;
    }
    console.log('Key : ', filterValue);
    // this.datasource.pop() = filterValue.trim().toLowerCase();
    //  this.datasource.filter((tag) => {
    //   tag.name.includes(filterValue);
    //   console.log()
    // });
    this.datasource = this.datasource['data'].filter((tag) => {
      return tag.name.includes(filterValue);
    });
    console.log('results', this.datasource);
  }
} //end of class
