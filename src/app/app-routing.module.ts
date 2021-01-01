import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'editor',
    loadChildren: () =>
      import('./editor/editor.module').then((moduel) => moduel.EditorModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(
        (moduel) => moduel.SettingsModule
      ),
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./article/article.module').then((moduel) => moduel.ArticleModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((moduel) => moduel.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
