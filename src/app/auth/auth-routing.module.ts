import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './guards/auth.guard.provider';

const routes: Routes = [
  {
    path: 'register', //
    component: AuthComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'login', //
    component: AuthComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
