import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminComponent } from './pages/admin.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { LoadingGuard } from '../@core/guards/loading.guard';
import { ItemResolver } from '../@core/guards/item.resolver';

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
    path: 'subcategories',
    component: SubCategoriesComponent,
    canDeactivate: [LoadingGuard],
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
