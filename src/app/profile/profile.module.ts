import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilesService, SharedModule } from '../shared';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile.resolver';

const profilepagRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'profile/:username',
      component: ProfileComponent,
      resolve: {
        profile: ProfileResolver,
      },
      children: [
        {
          path: '',
          component: ProfileArticlesComponent,
        },
        {
          path: 'favorites',
          component: ProfileFavoritesComponent,
        },
      ],
    },
  ]
);

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent,
  ],
  imports: [CommonModule, profilepagRouting, SharedModule],
  providers: [ProfileResolver, ProfilesService],
})
export class ProfileModule {}
