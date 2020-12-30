import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, User } from '../models';
import { UserService } from '../shared';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  profile: Profile;
  currentUser: User;
  isUser: boolean;

  ngOnInit(): void {
    this.route.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
    });

    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.isUser = this.currentUser.username === this.profile.username;
    });
  }

  onToggleFollowing(following: boolean): void {
    this.profile.following = following;
  }
}
