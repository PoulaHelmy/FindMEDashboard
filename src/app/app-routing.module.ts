import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => AdminModule,
  },

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
