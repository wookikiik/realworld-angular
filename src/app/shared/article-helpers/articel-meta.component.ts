import { Component, Input } from '@angular/core';
import { Article } from 'src/app/models';

@Component({
  selector: 'article-meta',
  templateUrl: './articel-meta.component.html',
  styleUrls: ['./articel-meta.component.css'],
})
export class ArticelMetaComponent {
  @Input() article: Article;
}
