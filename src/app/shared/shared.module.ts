import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FooterComponent, HeaderComponent } from './layout';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ApiService, UserService } from './services';

@NgModule({
  declarations: [ListErrorsComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, UserService],
  exports: [ListErrorsComponent, FooterComponent, HeaderComponent],
})
export class SharedModule {}
