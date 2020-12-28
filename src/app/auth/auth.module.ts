import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from '../shared';
import { AuthComponent } from './auth.component';

const authpageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'login',
      component: AuthComponent,
    },
    {
      path: 'register',
      component: AuthComponent,
    },
  ]
);

@NgModule({
  declarations: [AuthComponent, ListErrorsComponent],
  imports: [CommonModule, authpageRouter, ReactiveFormsModule],
})
export class AuthModule {}
