import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'app/@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { ItemsRoutingModule } from './items-routing.module';
import { TestDynamicFormComponent } from './pages/test-dynamic-form/test-dynamic-form.component';
import { Test2Component } from './pages/test2/test2.component';
import { InputsSubcatsComponent } from './pages/inputs-subcats/inputs-subcats.component';
import { ItemsCreateComponent } from './pages/items-create/items-create.component';
import { ItemsUpdateComponent } from './pages/items-update/items-update.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { ItemsOptionsComponent } from './pages/items-options/items-options.component';
import { ItemsImagesComponent } from './pages/items-images/items-images.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
  declarations: [
    TestDynamicFormComponent,
    Test2Component,
    InputsSubcatsComponent,
    ItemsCreateComponent,
    ItemsUpdateComponent,
    ItemsListComponent,
    ItemDetailsComponent,
    ItemsOptionsComponent,
    ItemsImagesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ItemsRoutingModule,
  ],
  exports: [InputsSubcatsComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },

    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ItemsModule {}
