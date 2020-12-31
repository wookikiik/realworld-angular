import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Errors } from '../models';
import { ArticlesService } from '../shared';

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
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: '',
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(this.article);
      }
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

  updateArticle(article: Article): void {
    Object.assign(this.article, article);
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.updateArticle(this.articleForm.value);
    this.articlesService.save(this.article).subscribe(
      (article) => this.router.navigateByUrl(`editor/${article.slug}`),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
