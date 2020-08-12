import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './pages/users/users.component';
import {NotFoundComponent} from '../../@shared/pages/not-found/not-found.component';
import {UserDetailsComponent} from './pages/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'view/:id',
    component: UserDetailsComponent,
  }, {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
