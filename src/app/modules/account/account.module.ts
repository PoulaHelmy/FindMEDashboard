import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'app/@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { AccountUpdateComponent } from './pages/account-update/account-update.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountUpdateComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AccountDetailsComponent,
    AccountUpdateComponent,
    ChangePasswordComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class AccountModule {}
