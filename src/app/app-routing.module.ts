import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './@core/guards/auth.guard';
import { IsAdminGuard } from './@core/guards/isAdmin.guard';

import { FooterComponent } from './@shared';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { ItemsModule } from './modules/items/items.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('app/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('app/@auth/auth.module').then((m) => m.AuthModule),
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivateChild: [IsAdminGuard],
    loadChildren: () =>
      import('app/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('app/modules/tags/tags.module').then((m) => m.TagsModule),
  },
  {
    path: 'inputs',
    loadChildren: () =>
      import('app/modules/inputs/inputs.module').then((m) => m.InputsModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('app/modules/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'items',
    loadChildren: () =>
      import('app/modules/items/items.module').then((m) => m.ItemsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
