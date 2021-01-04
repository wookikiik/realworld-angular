import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticleListConfig } from 'src/app/core/models';

@Component({
  selector: 'profile-articles',
  templateUrl: './profile-articles.component.html',
})
export class ProfileArticlesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  config: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  ngOnInit(): void {
    this.route.parent.data
      .pipe(map((data) => data.profile))
      .subscribe((profile) => {
        this.config.filters.author = profile.username;
      });
  }
}
