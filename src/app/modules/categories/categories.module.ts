import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'app/@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CatCreateComponent } from './pages/cat-create/cat-create.component';
import { CatUpdateComponent } from './pages/cat-update/cat-update.component';
import { CatListComponent } from './pages/cat-list/cat-list.component';
import { CatDetailsComponent } from './pages/cat-details/cat-details.component';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
  declarations: [
    CatCreateComponent,
    CatUpdateComponent,
    CatListComponent,
    CatDetailsComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CatCreateComponent,
    CatUpdateComponent,
    CatListComponent,
    CatDetailsComponent,
    CategoriesComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class CategoriesModule {}
