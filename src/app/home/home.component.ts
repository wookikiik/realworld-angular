import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleListConfig, Articles, Tags } from '../core/models';
import { TagsService } from '../core/services/tags.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private tagsService: TagsService, //
    private userService: UserService,
    private router: Router
  ) {}

  tags$: Observable<Tags>;
  articles$: Observable<Articles>;

  isLogined = false;

  listConfig = {
    type: 'all',
    filters: {},
  } as ArticleListConfig;

  ngOnInit(): void {
    this.tags$ = this.tagsService.getTags();
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isLogined = isAuthenticated;
      this.setListTo(isAuthenticated ? 'feed' : 'all', this.listConfig.filters);
    });
  }

  setListTo(type: string, filters: object = {}): void {
    if (this.needLoginArtile(type)) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listConfig = {
      type,
      filters,
    };
  }

  private needLoginArtile(type: string): boolean {
    return type === 'feed' && !this.isLogined;
  }
}
