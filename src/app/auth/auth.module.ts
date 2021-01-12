import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AUTH_TYPE } from './guards/auth.guard';
import {
  AuthGuard,
  AuthGuardFactory,
  NoAuthGuard
} from './guards/auth.guard.provider';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule, //
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {
  static withGuard(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AuthGuard,
          useFactory: AuthGuardFactory(AUTH_TYPE.CUSTOMER),
          deps: [UserService],
        },
        {
          provide: NoAuthGuard,
          useFactory: AuthGuardFactory(AUTH_TYPE.ANONYMOUS),
          deps: [UserService],
        },
      ],
    };
  }
}
