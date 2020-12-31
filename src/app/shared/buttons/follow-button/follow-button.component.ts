import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models';
import { ProfilesService, UserService } from '../../services';

@Component({
  selector: 'follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit {
  constructor(
    private profileService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();

  isSubmitting = false;

  ngOnInit(): void {}

  toggleFollowing(): void {
    this.isSubmitting = true;
    this.userService.isAuthenticated.subscribe((authenticated) => {
      if (!authenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      if (!this.profile.following) {
        this.profileService.follow(this.profile.username).subscribe(
          (data) => {
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
          (err) => (this.isSubmitting = false)
        );
      } else {
        this.profileService.unfollow(this.profile.username).subscribe(
          (data) => {
            this.isSubmitting = false;
            this.toggle.emit(false);
          },
          (err) => (this.isSubmitting = false)
        );
      }
    });
  }
}
