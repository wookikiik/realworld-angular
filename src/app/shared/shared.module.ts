import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  ApiService,
  AuthGuardGuard,
  JwtService,
  ShowAuthedDirective,
  UserService,
} from './index';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
  declarations: [ListErrorsComponent, ShowAuthedDirective],
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, UserService, JwtService, AuthGuardGuard],
  exports: [ListErrorsComponent, ShowAuthedDirective],
})
export class SharedModule {}
