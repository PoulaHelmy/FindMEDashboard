import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './@core/guards/auth.guard';
import { IsAdminGuard } from './@core/guards/isAdmin.guard';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { GuestGuardService } from '@@core/guards/guest.guard';
import { UserDetailsResolver } from '@@core/guards/resolvers/UserAuthResolvers/user-details.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    // canActivate: [AuthGuard],
  },

  {
    path: 'home',
    loadChildren: () =>
      import('app/modules/home/home.module').then((m) => m.HomeModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('app/@auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [GuestGuardService],
    // outlet: 'authOutlet',
  },
  {
    path: 'dashboard',
    // canActivateChild: [IsAdminGuard],
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
    path: 'requests',
    loadChildren: () =>
      import('app/modules/requests/requests.module').then(
        (m) => m.RequestsModule
      ),
  },
  {
    path: 'humans',
    loadChildren: () =>
      import('app/modules/humans/humans.module').then((m) => m.HumansModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('app/modules/users/users.module').then((m) => m.UsersModule),
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
