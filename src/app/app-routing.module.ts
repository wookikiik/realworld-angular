import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'article',
    loadChildren: () =>
      import('./article/article.module').then((module) => module.ArticleModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((module) => module.ProfileModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(
        (module) => module.SettingsModule
      ),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./editor/editor.module').then((module) => module.EditorModule),
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preload all modules; optionally we could
      // implement a custom preloading strategy for just some
      // of the modules
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
