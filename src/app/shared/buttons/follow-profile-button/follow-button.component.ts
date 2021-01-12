import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { iif, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Profile } from 'src/app/core/models';
import { ProfilesService } from 'src/app/core/services/profiles.service';

@Component({
  selector: 'follow-button',
  templateUrl: './follow-button.component.html',
})
export class FollowButtonComponent {
  profile: Profile;

  @Input()
  set author(profile: Profile) {
    this.profile = profile;
  }

  @Input() needLogin: boolean;

  @Output() trigger = new EventEmitter<boolean>();

  constructor(
    private profilesService: ProfilesService, //
    private router: Router
  ) {}

  onTrigger(): void {
    if (this.needLogin) {
      this.router.navigateByUrl('/login');
      return;
    }

    of(this.profile) //
      .pipe(
        mergeMap((author) =>
          iif(
            () => author.following,
            this.profilesService.unfollowUser(author.username),
            this.profilesService.followUser(author.username)
          )
        )
      )
      .subscribe((author) => {
        this.trigger.emit(author.following);
      });
  }
}
