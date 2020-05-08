import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubcatCreateComponent } from './pages/subcat-create/subcat-create.component';
import { SubcatUpdateComponent } from './pages/subcat-update/subcat-update.component';
import { SubcatDetailsComponent } from './pages/subcat-details/subcat-details.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { ApiResolver } from '@@core/guards/resolvers/api.resolver';

const routes: Routes = [
  { path: '', component: SubCategoriesComponent },
  {
    path: 'create',
    component: SubcatCreateComponent,
    pathMatch: 'full',
  },
  {
    path: 'view/:id',
    component: SubcatDetailsComponent,
    resolve: { item: ApiResolver },
  },
  {
    path: 'update/:id',
    component: SubcatUpdateComponent,
    resolve: { item: ApiResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoriesRoutingModule {}
