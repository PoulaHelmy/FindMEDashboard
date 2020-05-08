import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CatCreateComponent } from './pages/cat-create/cat-create.component';
import { CatDetailsComponent } from './pages/cat-details/cat-details.component';
import { CatUpdateComponent } from './pages/cat-update/cat-update.component';
import { ApiResolver } from '@@core/guards/resolvers/api.resolver';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'create', component: CatCreateComponent, pathMatch: 'full' },
  {
    path: 'view/:id',
    component: CatDetailsComponent,
    resolve: { item: ApiResolver },
  },
  {
    path: 'update/:id',
    component: CatUpdateComponent,
    resolve: { item: ApiResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
