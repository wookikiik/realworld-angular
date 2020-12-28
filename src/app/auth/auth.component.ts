import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from '../models';
import { UserService } from '../shared';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  isSubmitting = false;
  authForm: FormGroup;
  errors: Errors;

  constructor(
    private activatedRoute: ActivatedRoute,
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
    this.activatedRoute.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;

      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign In' : 'Sign Up';

      // add form control for username if this is the register page
      this.authForm.addControl(
        'username',
        new FormControl('', Validators.required)
      );
    });
  }

  submitForm(): void {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (_) => this.router.navigate(['/']),
      (err) => {
        // console.log(err as Errors);
        this.errors = err as Errors;
        this.isSubmitting = false;
      }
    );
  }
}
