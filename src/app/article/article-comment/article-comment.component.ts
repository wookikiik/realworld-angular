import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models';

@Component({
  selector: 'article-comment',
  templateUrl: './article-comment.component.html',
})
export class ArticleCommentComponent implements OnInit {
  @Input() comment: Comment;

  constructor() {}

  ngOnInit(): void {}
}
