import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from '@@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { InputsRoutingModule } from './inputs-routing.module';
import { InputUpdateComponent } from './pages/input-update/input-update.component';
import { InputCreateComponent } from './pages/input-create/input-create.component';
import { InputDetailsComponent } from './pages/input-details/input-details.component';
import { InputListComponent } from './pages/input-list/input-list.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { InputsUpdateDynamcallyComponent } from './pages/inputs-update-dynamcally/inputs-update-dynamcally.component';

@NgModule({
  declarations: [
    InputListComponent,
    InputsComponent,
    InputUpdateComponent,
    InputCreateComponent,
    InputDetailsComponent,
    InputsUpdateDynamcallyComponent,
  ],
  imports: [
    CommonModule,
    InputsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    InputsRoutingModule,
    InputsComponent,
    InputUpdateComponent,
    InputCreateComponent,
    InputDetailsComponent,
    InputListComponent,
    InputsUpdateDynamcallyComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class InputsModule {}
