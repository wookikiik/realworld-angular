import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard.provider';
import { ProfileResolver } from '../core/resolver/profile.resolver';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
