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
import { AddGroupComponent } from './pages/humans-admin/add-group/add-group.component';
import { AllGroupsComponent } from './pages/humans-admin/all-groups/all-groups.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'addgroup', component: AddGroupComponent },
  { path: 'allgroups', component: AllGroupsComponent },

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
