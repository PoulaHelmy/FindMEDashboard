import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputsComponent } from './pages/inputs/inputs.component';
import { InputCreateComponent } from './pages/input-create/input-create.component';
import { InputUpdateComponent } from './pages/input-update/input-update.component';
import { InputDetailsComponent } from './pages/input-details/input-details.component';
import { TestinputsComponent } from './pages/testinputs/testinputs.component';

const routes: Routes = [
  { path: '', component: InputsComponent },
  { path: 'create', component: InputCreateComponent, pathMatch: 'full' },
  { path: 'view/:id', component: InputDetailsComponent },
  { path: 'update/:id', component: InputUpdateComponent },
  { path: 'pola', component: TestinputsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputsRoutingModule {}
