import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleModule } from '../article/article.module';
import { SharedModule } from '../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ArticleModule,
  ],
})
export class EditorModule {}
