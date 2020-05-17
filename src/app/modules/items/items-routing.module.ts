import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestDynamicFormComponent } from './pages/test-dynamic-form/test-dynamic-form.component';
import { Test2Component } from './pages/test2/test2.component';
import { InputsSubcatsComponent } from './pages/inputs-subcats/inputs-subcats.component';
import { AllCategoriesResolver } from '@@core/guards/resolvers/allCats.resolver';
import { ItemsCreateComponent } from './pages/items-create/items-create.component';
import { AllSubCatResolver } from '@@core/guards/resolvers/allSubCats.resolver copy 2';
import { ItemsImagesComponent } from './pages/items-images/items-images.component';
import { ItemsOptionsComponent } from './pages/items-options/items-options.component';
import { AllInputsResolver } from '@@core/guards/resolvers/allInptus.resolver';

const routes: Routes = [
  {
    path: 'test',
    component: TestDynamicFormComponent,
    pathMatch: 'full',
  },

  {
    path: 'options',
    component: ItemsOptionsComponent,
    pathMatch: 'full',
    resolve: { item: AllInputsResolver },
  },
  {
    path: 'create',
    component: ItemsCreateComponent,
    pathMatch: 'full',
    resolve: { item: AllCategoriesResolver },
  },

  {
    path: 'inputscats',
    component: InputsSubcatsComponent,
    pathMatch: 'full',
    resolve: { allSubCats: AllSubCatResolver },
  },

  {
    path: 'images',
    component: ItemsImagesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
