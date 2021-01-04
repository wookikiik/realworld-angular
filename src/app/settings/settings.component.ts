import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../core/models';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
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
    //
  }

  logout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
