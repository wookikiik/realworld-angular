import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthType, Errors, User } from '../core/models';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  authTypeEnum = AuthType;
  isSubmitting: boolean;
  erorrs: Errors;
  authType: AuthType;
  title: string;
  errors: Errors = { errors: {} };
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((segment) => {
      this.authType =
        segment[segment.length - 1].path === 'login'
          ? AuthType.LOGIN
          : AuthType.REGISTER;

      this.title = AuthType.LOGIN === this.authType ? 'Sign in' : 'Sign up';

      if (AuthType.REGISTER === this.authType) {
        this.authForm.addControl(
          'username',
          new FormControl('', Validators.required)
        );
      }
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.userService
      .attemptAuth(this.authType, this.authForm.value as User)
      .subscribe(
        (user: User) => {
          this.router.navigateByUrl('/');
        },
        (err) => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }
}
