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

@NgModule({
  declarations: [
    TestDynamicFormComponent,
    Test2Component,
    InputsSubcatsComponent,
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
  ],
})
export class ItemsModule {}
