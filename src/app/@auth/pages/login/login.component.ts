import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@@core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    //   this.subscription = this.authService
    //     .login(this.myForm.value.email, this.loginForm.value.password)
    //     .subscribe((response: any) => {
    //       this.router.navigate(['/new']);
    //     });
  }
  ngOnInit() {
    //     this.loginForm = new FormGroup({
    //       email: new FormControl(null, [
    //          Validators.required,
    //          Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")
    //       ]),
    //       password: new FormControl(null, Validators.required)
    //     });
  }
  ngOnDestroy() {
    //      if(this.subscription) this.subscription.unsubscribe();
  }
} //end of class
