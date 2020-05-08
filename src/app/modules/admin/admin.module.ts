import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '@@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminComponent } from './pages/admin.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class AdminModule {}
