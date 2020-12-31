import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, User } from 'src/app/models';
import { UserService } from 'src/app/shared';

@Component({
  selector: 'article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css'],
})
export class ArticleCommentComponent implements OnInit {
  constructor(private userService: UserService) {}

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();
  canModify: boolean;

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user: User) => {
      this.canModify = user.username === this.comment.author.username;
    });
  }

  deleteClicked(): void {
    this.deleteComment.emit(true);
  }
}
