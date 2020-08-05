import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './pages/users/users.component';
import {NotFoundComponent} from '../../@shared/pages/not-found/not-found.component';
import {UserDetailsResolver} from '../../@core/guards/resolvers/userDetails.resolver';
import {UserDetailsComponent} from './pages/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'view/:id',
    component: UserDetailsComponent,
    resolve: {item: UserDetailsResolver},
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
