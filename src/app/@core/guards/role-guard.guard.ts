import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router,
  CanActivate,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/@auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // // this will be passed from the route config
    // // on the data property
    // const expectedRole = route.data.expectedRole;
    // const token = localStorage.getItem('token');
    // // decode the token to get its payload
    // const tokenPayload = decode(token);
    // if (
    // !this.auth.isAuthenticated() ||
    // tokenPayload.role !== expectedRole
    // ) {
    // this.router.navigate(['login']);
    // return false;
    // }
    return true;
  }
}
// {
//   path: 'admin',
//   component: AdminComponent,
//   canActivate: [RoleGuard],
//   data: {
//   expectedRole: 'admin'
//   }
//   },
