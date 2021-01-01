import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleListConfig, Profile } from 'src/app/models';

@Component({
  selector: 'profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.css'],
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  profile: Profile;
  favoritesConfig: ArticleListConfig = new ArticleListConfig();

  ngOnInit(): void {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
      this.favoritesConfig.filters.favorited = this.profile.username;
    });
  }
}
