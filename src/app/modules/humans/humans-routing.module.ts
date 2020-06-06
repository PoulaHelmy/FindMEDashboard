import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { HumansMainComponent } from './pages/humans-main/humans-main.component';

const routes: Routes = [
  { path: '', component: HumansMainComponent },
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
