import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Article, Errors } from '../core/models';
import { ArticleService } from '../core/services/article.service';

@Component({
  selector: 'editor-page',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors = {} as Errors;
  isSubmitting = false;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: '',
    });

    this.article.tagList = [];
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.article),
        filter((article) => article)
      )
      .subscribe((article) => {
        console.log(article);
        this.article = article;
        this.articleForm.patchValue(article);
      });
  }

  addTag(): void {
    const tag = this.tagField.value;
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }

    this.tagField.reset('');
  }

  removeTag(tagName: string): void {
    this.article.tagList = this.article.tagList.filter(
      (tag) => tag !== tagName
    );
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.article = {
      ...this.article,
      ...this.articleForm.value,
    };
    this.articleService.save(this.article).subscribe(
      (article) => this.router.navigateByUrl(`/article/${article.slug}`),
      (err) => {
        this.isSubmitting = false;
        this.errors = err;
      }
    );
  }
}
