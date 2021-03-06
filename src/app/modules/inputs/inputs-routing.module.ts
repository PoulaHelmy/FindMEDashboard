import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputsComponent } from './pages/inputs/inputs.component';
import { InputCreateComponent } from './pages/input-create/input-create.component';
import { InputUpdateComponent } from './pages/input-update/input-update.component';
import { InputDetailsComponent } from './pages/input-details/input-details.component';
import { InputsUpdateDynamcallyComponent } from './pages/inputs-update-dynamcally/inputs-update-dynamcally.component';
import { ApiResolver } from '@@core/guards/resolvers/api.resolver';
import { AllInputsResolver } from '@@core/guards/resolvers/allInptus.resolver';

const routes: Routes = [
  { path: '', component: InputsComponent },
  { path: 'create', component: InputCreateComponent, pathMatch: 'full' },
  {
    path: 'view/:id',
    component: InputDetailsComponent,
    resolve: { item: ApiResolver },
  },
  {
    path: 'update/:id',
    component: InputUpdateComponent,
    resolve: { item: ApiResolver },
  },
  {
    path: 'test/:id',
    component: InputsUpdateDynamcallyComponent,
    resolve: { item: AllInputsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputsRoutingModule {}
