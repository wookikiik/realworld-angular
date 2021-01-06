import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, ArticleListConfig } from '../core/models';
import { TagService } from '../core/services/tag.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  isLoadingTags = false;
  listConfig: ArticleListConfig;
  articles: Article[];
  tags: string[];

  constructor(
    private userService: UserService,
    private tagService: TagService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      console.log(isAuthenticated);
      this.isAuthenticated = isAuthenticated;
      this.isAuthenticated ? this.setListTo('feed') : this.setListTo('all');
    });

    this.getAllTags();
  }

  getAllTags(): void {
    this.isLoadingTags = true;
    this.tagService.getAllTag().subscribe((tags) => {
      this.isLoadingTags = false;
      this.tags = tags;
    });
  }

  setListTo(type: string, filters: object = {}): void {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listConfig = { type, filters };
    console.log(this.listConfig);
  }
}
