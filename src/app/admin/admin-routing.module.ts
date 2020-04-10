import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminComponent } from './pages/admin.component';
import { TagsComponent } from './pages/tags/tags.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { InputsComponent } from './pages/inputs/inputs.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'tags',
    component: TagsComponent,
  },
  {
    path: 'inputs',
    component: InputsComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'subcategories',
    component: SubCategoriesComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
