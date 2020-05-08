import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from '@@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { SubcatCreateComponent } from './pages/subcat-create/subcat-create.component';
import { SubcatUpdateComponent } from './pages/subcat-update/subcat-update.component';
import { SubcatListComponent } from './pages/subcat-list/subcat-list.component';
import { SubcatDetailsComponent } from './pages/subcat-details/subcat-details.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';

@NgModule({
  declarations: [
    SubCategoriesComponent,
    SubcatCreateComponent,
    SubcatUpdateComponent,
    SubcatListComponent,
    SubcatDetailsComponent,
  ],
  imports: [
    CommonModule,
    SubCategoriesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    SubCategoriesComponent,
    SubcatCreateComponent,
    SubcatUpdateComponent,
    SubcatListComponent,
    SubcatDetailsComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class SubCategoriesModule {}
