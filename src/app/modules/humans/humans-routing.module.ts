import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { HumansMainComponent } from './pages/humans-main/humans-main.component';
// import { ConfigurationComponent } from './components/configuration/configuration.component';
import { HomeComponent } from './components/home/home.component';
import { FaceTesterComponent } from './components/face-tester/face-tester.component';
import { FaceGroupingComponent } from './components/face-grouping/face-grouping.component';
import { FindSimilarComponent } from './components/find-similar/find-similar.component';
import { ConfigurationComponent } from './pages/humans-admin/configuration/configuration.component';
import { AddGroupComponent } from './pages/humans-admin/groups/add-group/add-group.component';
import { AllGroupsComponent } from './pages/humans-admin/groups/all-groups/all-groups.component';
import { GroupControlComponent } from './pages/humans-admin/groups/group-control/group-control.component';
import { PersonControlComponent } from './pages/humans-admin/persons/person-control/person-control.component';
import { AddPersonComponent } from './pages/humans-admin/persons/add-person/add-person.component';
import { AddFaceComponent } from './pages/humans-admin/persons/add-face/add-face.component';
import { AddFaceResolver } from '@@core/guards/resolvers/Persons/add-face.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'addgroup', component: AddGroupComponent },
  { path: 'addperson/:group', component: AddPersonComponent },
  { path: 'addface/:person/group/:group', component: AddFaceComponent },
  { path: 'allgroups', component: AllGroupsComponent },
  { path: 'group/:id', component: GroupControlComponent },
  { path: 'person/:person/group/:group', component: PersonControlComponent },
  { path: 'test-faces', component: FaceTesterComponent },
  { path: 'face-grouping', component: FaceGroupingComponent },
  { path: 'find-similar', component: FindSimilarComponent },
  // { path: '', component: HumansMainComponent },
  // { path: 'configuration', component: ConfigurationComponent },
  // { path: 'create', component: InputCreateComponent, pathMatch: 'full' },
  // {
  //   path: 'view/:id',
  //   component: InputDetailsComponent,
  //   resolve: { item: ApiResolver },
  // },
  // {
  //   path: 'update/:id',
  //   component: InputUpdateComponent,
  //   resolve: { item: ApiResolver },
  // },
  // {
  //   path: 'test/:id',
  //   component: InputsUpdateDynamcallyComponent,
  //   resolve: { item: AllInputsResolver },
  // },
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
