import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'article-comment',
  templateUrl: './article-comment.component.html',
})
export class ArticleCommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleted = new EventEmitter<boolean>();

  isUser: boolean;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.isUser = this.comment.author.username === user.username;
    });
  }

  deleteClicked(): void {
    this.deleted.emit(true);
  }
}
