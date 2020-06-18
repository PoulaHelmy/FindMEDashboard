import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { HumansMainComponent } from './pages/humans-main/humans-main.component';
import { ConfigurationComponent } from './pages/humans-admin/configuration/configuration.component';
import { AddGroupComponent } from './pages/humans-admin/groups/add-group/add-group.component';
import { AllGroupsComponent } from './pages/humans-admin/groups/all-groups/all-groups.component';
import { GroupControlComponent } from './pages/humans-admin/groups/group-control/group-control.component';
import { PersonControlComponent } from './pages/humans-admin/persons/person-control/person-control.component';
import { AddPersonComponent } from './pages/humans-admin/persons/add-person/add-person.component';
import { AddFaceComponent } from './pages/humans-admin/persons/add-face/add-face.component';
import { AddFaceResolver } from '@@core/guards/resolvers/Persons/add-face.resolver';
import { AddFaceUrlComponent } from './pages/humans-admin/persons/add-face-url/add-face-url.component';
import { ListsControlComponent } from './pages/humans-admin/lists/lists-control/lists-control.component';
import { AddListComponent } from './pages/humans-admin/lists/add-list/add-list.component';
import { ListDetailsComponent } from './pages/humans-admin/lists/list-details/list-details.component';
import { AddFromLocalComponent } from './pages/humans-admin/lists/add-from-local/add-from-local.component';
import { AddByUrlComponent } from './pages/humans-admin/lists/add-by-url/add-by-url.component';
import { PersonsCreateComponent } from './pages/humans-user/persons-create/persons-create.component';
import { PersonsOptionsComponent } from './pages/humans-user/persons-options/persons-options.component';
import { AllCategoriesResolver } from '@@core/guards/resolvers/allCats.resolver';
import { AllInputsResolver } from '@@core/guards/resolvers/allInptus.resolver';
import { PersonsQuestionsComponent } from './pages/humans-user/persons-questions/persons-questions.component';
import { PersonsCreateFacesComponent } from './pages/humans-user/persons-create-faces/persons-create-faces.component';
import { TestFaceIdentificationComponent } from './pages/humans-user/test-face-identification/test-face-identification.component';
import { PersonDetailsResolver } from '@@core/guards/resolvers/Persons/person-details.resolver';
import { PersonDetailsComponent } from './pages/humans-user/person-details/person-details.component';
import { UpdatePersonComponent } from './pages/humans-user/update-person/update-person.component';
import { PersonUpdateResolver } from '@@core/guards/resolvers/Persons/person-update.resolver';
import { UpdatePersonValuesComponent } from './pages/humans-user/update-person-values/update-person-values.component';
import { UpdatePersonQuestionsComponent } from './pages/humans-user/update-person-questions/update-person-questions.component';
import { UpdatePersonFacesComponent } from './pages/humans-user/update-person-faces/update-person-faces.component';
import { ItemUpdateOtpionsResolver } from '@@core/guards/resolvers/ItemsResolvers/items-update-options.resolver';
import { ItemUpdateQuestionsResolver } from '@@core/guards/resolvers/ItemsResolvers/items-upqestions.resolver';
import { PersonsUpdateOtpionsResolver } from '@@core/guards/resolvers/Persons/persons-update-options.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'configuration', pathMatch: 'full' },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'addgroup', component: AddGroupComponent },
  { path: 'addperson/:group', component: AddPersonComponent },
  { path: 'addface/:person/group/:group', component: AddFaceComponent },
  { path: 'addfaceurl/:person/group/:group', component: AddFaceUrlComponent },
  { path: 'allgroups', component: AllGroupsComponent },
  { path: 'group/:id', component: GroupControlComponent },
  { path: 'person/:person/group/:group', component: PersonControlComponent },
  { path: 'lists', component: ListsControlComponent },
  { path: 'addlist', component: AddListComponent },
  { path: 'list/:id', component: ListDetailsComponent },
  { path: 'addurl/:id', component: AddByUrlComponent },
  { path: 'addlocal/:id', component: AddFromLocalComponent },
  { path: 'persons/create', component: PersonsCreateComponent },
  {
    path: 'persons/options',
    component: PersonsOptionsComponent,
    resolve: { item: AddFaceResolver },
  },
  {
    path: 'persons/:id1/faces/:id2',
    component: PersonsCreateFacesComponent,
  },
  {
    path: 'persons/questions/:id',
    component: PersonsQuestionsComponent,
  },
  {
    path: 'persons/identfy',
    component: TestFaceIdentificationComponent,
  },
  {
    path: 'persons/details',
    component: PersonDetailsComponent,
    resolve: { item: PersonDetailsResolver },
  },
  {
    path: 'persons/update/:id',
    component: UpdatePersonComponent,
    resolve: { item: PersonUpdateResolver },
  },
  {
    path: 'persons/upoptions',
    component: UpdatePersonValuesComponent,
    resolve: { item: PersonsUpdateOtpionsResolver },
  },
  {
    path: 'persons/upfaces/:id1/faces/:id2',
    component: UpdatePersonFacesComponent,
  },
  {
    path: 'upquestions/:id',
    component: UpdatePersonQuestionsComponent,
    resolve: { item: ItemUpdateQuestionsResolver },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumansRoutingModule {}
