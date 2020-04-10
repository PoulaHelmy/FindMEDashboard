import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainNavComponent } from './layouts/main-nav/main-nav.component';

@NgModule({
  declarations: [FooterComponent, MainNavComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FooterComponent,
    MaterialModule,
    MainNavComponent,
  ],
})
export class SharedModule {}
