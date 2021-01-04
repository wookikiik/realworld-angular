import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../core/models';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  isUser: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    zip(
      this.route.data.pipe(
        map((data: { profile: Profile }) => data.profile as Profile)
      ),
      this.userService.currentUser
    ).subscribe(([profile, user]) => {
      this.profile = profile;
      this.isUser = this.profile.username === user.username;
    });
  }

  onToggleFollowing(following: boolean): void {
    this.profile.following = following;
  }
}
