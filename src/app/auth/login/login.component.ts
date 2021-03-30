import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
          Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ],
      password: ['', Validators.required]
    });

    this.authService.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit = () => {
    this.submitted = true;
    this.authService.login(this.email.value, this.password.value)
      .subscribe((data) => {
        if (this.authService.isLoggedIn) {
          const redirect = '/admin';
          this.router.navigate([redirect]);
        } else {
          this.loginError = 'Email or password is incorrect.';
          this.submitted = false;
        }
      },
        (error) => {
          this.error = error;
          this.submitted = false;
      }
      );
  }

}
