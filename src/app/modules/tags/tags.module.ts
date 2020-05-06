import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'app/@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';
import { TagsRoutingModule } from './tags-routing.module';
import { TagListComponent } from 'app/modules/tags/pages/tag-list/tag-list.component';
import { TagDetailsComponent } from 'app/modules/tags/pages/tag-details/tag-details.component';
import { TagControlsComponent } from 'app/modules/tags/pages/tag-controls/tag-controls.component';
import { TagsComponent } from 'app/modules/tags/pages/tags/tags.component';
import { TagUpdateComponent } from './pages/tag-update/tag-update.component';
@NgModule({
  declarations: [
    TagListComponent,
    TagDetailsComponent,
    TagControlsComponent,
    TagsComponent,
    TagUpdateComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TagsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    TagListComponent,
    TagDetailsComponent,
    TagControlsComponent,
    TagsComponent,
    TagUpdateComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class TagsModule {}
