import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'app/@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { ItemsRoutingModule } from './items-routing.module';
import { TestDynamicFormComponent } from './pages/test-dynamic-form/test-dynamic-form.component';
import { InputsSubcatsComponent } from './pages/inputs-subcats/inputs-subcats.component';
import { ItemsCreateComponent } from './pages/items-create/items-create.component';
import { ItemsUpdateComponent } from './pages/items-update/items-update.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { ItemsOptionsComponent } from './pages/items-options/items-options.component';
import { DatePipe } from '@angular/common';
import { UpdateOptionsComponent } from './pages/update-options/update-options.component';
import { ItemsQuestionsComponent } from './pages/items-questions/items-questions.component';
import { UpadteQuestionsComponent } from './pages/upadte-questions/upadte-questions.component';

@NgModule({
  declarations: [
    TestDynamicFormComponent,
    InputsSubcatsComponent,
    ItemsCreateComponent,
    ItemsUpdateComponent,
    ItemsListComponent,
    ItemDetailsComponent,
    ItemsOptionsComponent,
    UpdateOptionsComponent,
    ItemsQuestionsComponent,
    UpadteQuestionsComponent,
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
    DatePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class ItemsModule {}
