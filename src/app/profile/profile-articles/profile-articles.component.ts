import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleListConfig, Profile } from 'src/app/models';

@Component({
  selector: 'profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css'],
})
export class ProfileArticlesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  profile: Profile;
  articlesConfig: ArticleListConfig = new ArticleListConfig();

  ngOnInit(): void {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
      this.articlesConfig.filters.author = this.profile.username;
    });
  }
}
