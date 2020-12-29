import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors, User } from 'src/app/models';
import { UserService } from 'src/app/shared';

@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user = {} as User;
  settingsForm: FormGroup;
  errors = {} as Errors;
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    } as User);
  }

  ngOnInit(): void {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.updateUser(this.settingsForm.value);
    this.userService.update(this.user).subscribe(
      (updatedUser) =>
        this.router.navigateByUrl('/profile/' + updatedUser.username),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  private updateUser(user: User): void {
    Object.assign(this.user, user);
  }
}
