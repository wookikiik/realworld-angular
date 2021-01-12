import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Profile } from '../core/models';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  selfProfile = false;

  constructor(
    private route: ActivatedRoute, //
    private userService: UserService //
  ) {}

  ngOnInit(): void {
    this.route.data //
      .pipe(map((data) => data.profile))
      .subscribe((profile) => {
        this.profile = profile;
      });

    this.userService.currentUser
      .pipe(filter((user) => user != null))
      .subscribe((user) => {
        this.selfProfile = user.username === this.profile.username;
      });
  }

  onTriggerFollow(followed: boolean): void {
    this.profile.following = followed;
  }
}
