import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticleListConfig } from 'src/app/core/models';

@Component({
  selector: 'profile-favorites',
  templateUrl: './profile-favorites.component.html',
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  config: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  ngOnInit(): void {
    this.route.parent.data
      .pipe(map((data) => data.profile))
      .subscribe((profile) => {
        this.config.filters.favorited = profile.username;
      });
  }
}
