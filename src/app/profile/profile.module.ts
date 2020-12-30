import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilesService } from '../shared';
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
    },
  ]
);

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, profilepagRouting],
  providers: [ProfileResolver, ProfilesService],
})
export class ProfileModule {}
