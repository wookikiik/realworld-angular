import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Article } from '../core/models';
import { ArticleService } from '../core/services/article.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'article-page',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: Article;
  isAuthor: boolean;
  isDeleting = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(map((data) => data.article))
      .subscribe((article) => (this.article = article));

    this.userService.currentUser.subscribe((user) => {
      this.isAuthor = this.article.author.username === user.username;
    });
  }

  deleteArticle(): void {
    this.isDeleting = true;
    this.articleService.destory(this.article.slug).subscribe((_) => {
      this.router.navigateByUrl('/');
    });
  }
}
