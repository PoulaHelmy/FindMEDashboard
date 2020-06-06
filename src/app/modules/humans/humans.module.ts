import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from '@@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { HumansRoutingModule } from './humans-routing.module';
import { HumansMainComponent } from './pages/humans-main/humans-main.component';
import { AdminMainComponent } from './pages/humans-admin/admin-main/admin-main.component';
import { UserMainComponent } from './pages/humans-user/user-main/user-main.component';

@NgModule({
  declarations: [HumansMainComponent, AdminMainComponent, UserMainComponent],
  imports: [
    CommonModule,
    HumansRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [HumansMainComponent, AdminMainComponent, UserMainComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class HumansModule {}
