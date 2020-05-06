import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainNavComponent } from './layouts/main-nav/main-nav.component';
import { Nav1Component } from './nav1/nav1.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    MainNavComponent,
    Nav1Component,
    NotFoundComponent,
    FilterPipePipe,
  ],
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
    NotFoundComponent,
    FilterPipePipe,
  ],
})
export class SharedModule {}
