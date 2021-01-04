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
  errors: Errors = {} as Errors;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  private user: User;
  isSubmitting = false;
  setting: FormGroup;

  ngOnInit(): void {
    this.user = { ...this.userService.getCurrentUser() };
    this.setting = this.fb.group({
      image: this.user.image || '',
      username: this.user.username || '',
      bio: this.user.bio || '',
      email: this.user.email || '',
      password: '',
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.user = { ...this.setting.value };
    this.userService.update(this.user).subscribe(
      //
      (updatedUser) => {
        this.isSubmitting = false;
        this.router.navigateByUrl(`/profile/${updatedUser.username}`);
      },
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  logout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
