import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { AuthComponent } from './auth.component';
import { NoAuthGuardGuard } from './no-auth-guard.guard';

const authpageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'login',
      component: AuthComponent,
      canActivate: [NoAuthGuardGuard],
    },
    {
      path: 'register',
      component: AuthComponent,
      canActivate: [NoAuthGuardGuard],
    },
  ]
);

@NgModule({
  declarations: [AuthComponent],
  providers: [NoAuthGuardGuard],
  imports: [CommonModule, authpageRouter, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
