import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const authpageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    authpageRouter,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
