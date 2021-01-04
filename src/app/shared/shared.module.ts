import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';
import { FollowProfileButtonComponent } from './buttons/follow-profile-button/follow-profile-button.component';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShowAuthedDirective,
    ListErrorsComponent,
    FollowProfileButtonComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
  ],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ShowAuthedDirective,
    ListErrorsComponent,
    FollowProfileButtonComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
  ],
})
export class SharedModule {}
