import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestDynamicFormComponent } from './pages/test-dynamic-form/test-dynamic-form.component';
import { Test2Component } from './pages/test2/test2.component';
import { InputsSubcatsComponent } from './pages/inputs-subcats/inputs-subcats.component';
import { AllInputsResolver } from '@@core/guards/resolvers/allInptus.resolver';
import { AllSubCatResolver } from '@@core/guards/resolvers/allSubCats.resolver copy';

const routes: Routes = [
  {
    path: 'test',
    component: TestDynamicFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'test2',
    component: Test2Component,
    pathMatch: 'full',
  },
  {
    path: 'inputscats',
    component: InputsSubcatsComponent,
    pathMatch: 'full',
    resolve: { allSubCats: AllSubCatResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
