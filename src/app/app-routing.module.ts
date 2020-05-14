import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './@core/guards/auth.guard';
import { IsAdminGuard } from './@core/guards/isAdmin.guard';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { ItemsModule } from './modules/items/items.module';
import { GuestGuardService } from '@@core/guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: 'home',
    loadChildren: () =>
      import('app/modules/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('app/@auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [GuestGuardService],
    // outlet: 'authOutlet',
  },
  {
    path: 'admin',
    canActivateChild: [IsAdminGuard],
    loadChildren: () =>
      import('app/modules/admin/admin.module').then((m) => m.AdminModule),
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
    path: 'subcategories',
    loadChildren: () =>
      import('app/modules/sub-categories/sub-categories.module').then(
        (m) => m.SubCategoriesModule
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
