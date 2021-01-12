import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';
import { FollowButtonComponent } from './buttons/follow-profile-button/follow-button.component';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShowAuthedDirective,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    ArticleListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ShowAuthedDirective,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    ArticleListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
  ],
})
export class SharedModule {}
