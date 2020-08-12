import {Component, OnInit, Input} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {OverlayContainer} from '@angular/cdk/overlay';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  @Input() themeColor = '';
  // use this to set correct theme class on app holder
  // eg: <div [class]="themeClass">...</div>
  // 'my-dark-theme',
  //     'my-light-theme',
  //     'purple-green',
  /*-------------------AllNotifications------------------------*/
  notificationsNumber = '';
  AllNotifications = [];
  /*---------------------BreakPoints Ratio---------------------------*/
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  /*---------------- -------------------*/
  themeClass: string = localStorage.getItem('defaultTheme')
    ? localStorage.getItem('defaultTheme')
    : 'findme-theme';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private snackbar: SnackbarService,
    private overlayContainer: OverlayContainer,
  ) {
  }

  ngOnInit(): void {
    /*---------------- For Theming-------------------*/
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from(
      overlayContainerClasses
    ).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add('my-theme');
  } //end Of NgONInit
  changeTheme(value: string) {
    this.themeClass = value;
    localStorage.setItem('defaultTheme', value);
  }

  /*------------------------------------------------ */
} //end of class
