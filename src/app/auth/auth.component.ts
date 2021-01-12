import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iif, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Errors, User } from '../core/models';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  authType: string;
  title: string;
  error: Errors;

  isSubmitting = false;

  constructor(
    private fb: FormBuilder, //
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      this.authType = data[data.length - 1].path;
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';

      if (this.authType === 'register') {
        this.authForm.addControl(
          'username',
          new FormControl('', Validators.required)
        );
      }
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    const user = this.authForm.value as User;
    of(this.authType).pipe(
      mergeMap((type) =>
        iif(
          () => type === 'login',
          this.userService.login(user),
          this.userService.regist(user)
        )
      ),
    ).subscribe(
      _ => this.router.navigateByUrl('/'),
      err => {
        this.error = err;
        this.isSubmitting = false;
      }
    );
  }
}
