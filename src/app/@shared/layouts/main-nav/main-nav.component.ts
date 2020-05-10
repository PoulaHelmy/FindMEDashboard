import { Component, ElementRef, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'app/@auth/services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  logOutLoading = false;
  isLoggedIn$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  logout() {
    if (localStorage.getItem('isAuth') == 'false') {
      this.snackbar.show(
        '   Unauthorized Request You Not Logged in yet   ',
        'danger'
      );
    } else {
      this.authService
        .logout()
        .toPromise()
        .then((res) => {
          this.router.navigate(['/auth/login']);
          localStorage.removeItem('access_token');
          localStorage.setItem('isAuth', 'false');
        })
        .catch((err) => {
          this.snackbar.show(err['error']['message'], 'danger');
        })
        .finally(() => {});
    }
  }
} //end of class
