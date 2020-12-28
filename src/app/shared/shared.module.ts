import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ShowAuthedDirective } from './directive';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ApiService, JwtService, UserService } from './services';

@NgModule({
  declarations: [ListErrorsComponent, ShowAuthedDirective],
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, UserService, JwtService],
  exports: [ListErrorsComponent, ShowAuthedDirective],
})
export class SharedModule {}
