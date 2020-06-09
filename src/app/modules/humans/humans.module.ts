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
import { HomeComponent } from './components/home/home.component';
import { FaceTesterComponent } from './components/face-tester/face-tester.component';
import { FaceGroupingComponent } from './components/face-grouping/face-grouping.component';
import { FindSimilarComponent } from './components/find-similar/find-similar.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { Configuration2Component } from './components/configuration/configuration.component';
import { ConfigurationComponent } from './pages/humans-admin/configuration/configuration.component';
import { AddGroupComponent } from './pages/humans-admin/groups/add-group/add-group.component';
import { AllGroupsComponent } from './pages/humans-admin/groups/all-groups/all-groups.component';
import { GroupControlComponent } from './pages/humans-admin/groups/group-control/group-control.component';
import { PersonControlComponent } from './pages/humans-admin/persons/person-control/person-control.component';
import { AddPersonComponent } from './pages/humans-admin/persons/add-person/add-person.component';
import { AddFaceComponent } from './pages/humans-admin/persons/add-face/add-face.component';
@NgModule({
  declarations: [
    HumansMainComponent,
    AdminMainComponent,
    UserMainComponent,
    HomeComponent,
    FaceTesterComponent,
    FaceGroupingComponent,
    FindSimilarComponent,
    InputBoxComponent,
    Configuration2Component,
    ConfigurationComponent,
    AddGroupComponent,
    AllGroupsComponent,
    GroupControlComponent,
    PersonControlComponent,
    AddPersonComponent,
    AddFaceComponent,
  ],
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
