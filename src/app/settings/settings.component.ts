import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors, User } from '../core/models';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  user: User;
  error: Errors;
  isSubmitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.user = {
        ...user,
      };
      this.form.patchValue(this.user);
    });
  }

  logout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.error = null;
    this.userService.updateUser(this.form.value as User).subscribe(
      (user) => this.router.navigateByUrl(`/profile/${user.username}`),
      (err) => {
        this.error = err;
        this.isSubmitting = false;
      }
    );
  }
}
