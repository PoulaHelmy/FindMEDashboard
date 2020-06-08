import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainNavComponent } from './layouts/main-nav/main-nav.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ConfirmDialogComponent } from '@@shared/pages/dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { SnackbarComponent } from './pages/snackbar/snackbar.component';
import { TopBarComponent } from './layouts/top-bar/top-bar.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { InputComponent } from './pages/dynamicForms/input.component';
import { ButtonComponent } from './pages/dynamicForms/button.component';
import { DateComponent } from './pages/dynamicForms/date.component';

import { SelectComponent } from './pages/dynamicForms/select.component';

import { RadiobuttonComponent } from './pages/dynamicForms/radiobutton.component';

import { CheckboxComponent } from './pages/dynamicForms/checkbox.component';
import { DynamicFieldDirective } from './directives/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './pages/dynamicForms/dynamic-form/dynamic-form.component';
import { ImgDefualtPipe } from './pipes/img-defualt.pipe';
import { ToasterModule, ToasterService } from 'angular2-toaster';
@NgModule({
  declarations: [
    FooterComponent,
    MainNavComponent,
    NotFoundComponent,
    FilterPipePipe,
    ConfirmDialogComponent,
    SnackbarComponent,
    TopBarComponent,
    SideBarComponent,
    InputComponent,
    ButtonComponent,
    DateComponent,
    SelectComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    ImgDefualtPipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToasterModule.forChild(),
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
    ConfirmDialogComponent,
    SnackbarComponent,
    TopBarComponent,
    SideBarComponent,
    InputComponent,
    ButtonComponent,
    DateComponent,
    SelectComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    ImgDefualtPipe,
  ],
  providers: [ConfirmDialogService],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
  ],
})
export class SharedModule {}
