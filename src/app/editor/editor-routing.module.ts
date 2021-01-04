import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleResolver } from '../article/article.resolver';
import { AuthGuard } from '../core/guards/auth.guard';
import { EditorComponent } from './editor.component';

const routes: Routes = [
  { path: '', component: EditorComponent, canActivate: [AuthGuard] },
  {
    path: ':slug',
    component: EditorComponent,
    resolve: {
      article: ArticleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
