import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TagsService } from '@@core/services/tags.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tag-controls',
  templateUrl: './tag-controls.component.html',
  styleUrls: ['./tag-controls.component.scss'],
})
export class TagControlsComponent implements OnInit {
  tagForm = new FormGroup({
    tagName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor(private tagService: TagsService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit() {
    this.tagService
      .addTag(this.tagForm.get('tagName').value)
      .subscribe((res) => {
        this.router.navigate(['tags']);
        console.log('res', res);
      });
  }
} //end of class
