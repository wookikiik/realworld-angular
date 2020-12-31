import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ArticelMetaComponent } from './article-helpers';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ShowAuthedDirective } from './directive';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    ArticelMetaComponent,
    FavoriteButtonComponent,
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    FavoriteButtonComponent,
    ArticelMetaComponent,
  ],
})
export class SharedModule {}
