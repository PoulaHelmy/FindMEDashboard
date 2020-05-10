import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './@shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from 'app/@auth/auth.module';
import { TagsModule } from 'app/modules/tags/tags.module';
import { InputsModule } from 'app/modules/inputs/inputs.module';
import { CategoriesModule } from './modules/categories/categories.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    AdminModule,
    AuthModule,
    TagsModule,
    InputsModule,
    CategoriesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
