import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { authRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ResetPasswordComponent],
  imports: [CommonModule, authRoutingModule],
  exports: [SignupComponent, LoginComponent, ResetPasswordComponent],
})
export class AuthModule {}
