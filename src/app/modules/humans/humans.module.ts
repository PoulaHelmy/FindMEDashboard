import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SharedModule } from '@@shared/shared.module';
import { MaterialModule } from '@@shared/material/material.module';
import { DatePipe } from '@angular/common';

import { HumansRoutingModule } from './humans-routing.module';
import { HumansMainComponent } from './pages/humans-main/humans-main.component';
import { AdminMainComponent } from './pages/humans-admin/admin-main/admin-main.component';
import { UserMainComponent } from './pages/humans-user/user-main/user-main.component';
import { ConfigurationComponent } from './pages/humans-admin/configuration/configuration.component';
import { AddGroupComponent } from './pages/humans-admin/groups/add-group/add-group.component';
import { AllGroupsComponent } from './pages/humans-admin/groups/all-groups/all-groups.component';
import { GroupControlComponent } from './pages/humans-admin/groups/group-control/group-control.component';
import { PersonControlComponent } from './pages/humans-admin/persons/person-control/person-control.component';
import { AddPersonComponent } from './pages/humans-admin/persons/add-person/add-person.component';
import { AddFaceComponent } from './pages/humans-admin/persons/add-face/add-face.component';
import { AddFaceUrlComponent } from './pages/humans-admin/persons/add-face-url/add-face-url.component';
import { AddListComponent } from './pages/humans-admin/lists/add-list/add-list.component';
import { ListsControlComponent } from './pages/humans-admin/lists/lists-control/lists-control.component';
import { ListDetailsComponent } from './pages/humans-admin/lists/list-details/list-details.component';
import { AddByUrlComponent } from './pages/humans-admin/lists/add-by-url/add-by-url.component';
import { AddFromLocalComponent } from './pages/humans-admin/lists/add-from-local/add-from-local.component';
import { PersonsCreateComponent } from './pages/humans-user/persons-create/persons-create.component';
import { PersonsOptionsComponent } from './pages/humans-user/persons-options/persons-options.component';
import { PersonsQuestionsComponent } from './pages/humans-user/persons-questions/persons-questions.component';
import { PersonsCreateFacesComponent } from './pages/humans-user/persons-create-faces/persons-create-faces.component';
import { TestFaceIdentificationComponent } from './pages/humans-user/test-face-identification/test-face-identification.component';
import { PersonDetailsComponent } from './pages/humans-user/person-details/person-details.component';
import { UpdatePersonComponent } from './pages/humans-user/update-person/update-person.component';
import { UpdatePersonValuesComponent } from './pages/humans-user/update-person-values/update-person-values.component';
import { UpdatePersonFacesComponent } from './pages/humans-user/update-person-faces/update-person-faces.component';
import { UpdatePersonQuestionsComponent } from './pages/humans-user/update-person-questions/update-person-questions.component';
@NgModule({
  declarations: [
    HumansMainComponent,
    AdminMainComponent,
    UserMainComponent,
    ConfigurationComponent,
    AddGroupComponent,
    AllGroupsComponent,
    GroupControlComponent,
    PersonControlComponent,
    AddPersonComponent,
    AddFaceComponent,
    AddFaceUrlComponent,
    AddListComponent,
    ListsControlComponent,
    ListDetailsComponent,
    AddByUrlComponent,
    AddFromLocalComponent,
    PersonsCreateComponent,
    PersonsOptionsComponent,
    PersonsQuestionsComponent,
    PersonsCreateFacesComponent,
    TestFaceIdentificationComponent,
    PersonDetailsComponent,
    UpdatePersonComponent,
    UpdatePersonValuesComponent,
    UpdatePersonFacesComponent,
    UpdatePersonQuestionsComponent,
  ],
  imports: [
    CommonModule,
    HumansRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [HumansMainComponent, AdminMainComponent, UserMainComponent],
  providers: [
    DatePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class HumansModule {}
