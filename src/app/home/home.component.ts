import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticleListConfig } from '../models';
import { TagsService, UserService } from '../shared';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit(): void {
    this.route.data
      .pipe(map((data) => data.isAuthenticated))
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        isAuthenticated ? this.setListTo('feed') : this.setListTo('feed');
      });

    this.tagsService.getAll().subscribe((tags) => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }

  setListTo(type: string = '', filters: object = {}): void {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('login');
      return;
    }

    this.listConfig = { type, filters } as ArticleListConfig;
  }
}
