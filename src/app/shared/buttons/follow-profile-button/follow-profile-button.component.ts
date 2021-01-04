import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iif, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Profile } from 'src/app/core/models';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'follow-profile-button',
  templateUrl: './follow-profile-button.component.html',
})
export class FollowProfileButtonComponent implements OnInit {
  isSubmitting = false;
  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {}

  toggleFollowing(): void {
    this.isSubmitting = true;

    of(this.profile)
      .pipe(
        mergeMap((profile) =>
          iif(
            () => profile.following,
            this.profileService.unfollow(profile.username),
            this.profileService.follow(profile.username)
          )
        )
      )
      .subscribe(
        (profile) => {
          this.isSubmitting = false;
          this.toggle.emit(profile.following);
        },
        (err) => (this.isSubmitting = false)
      );
  }
}
