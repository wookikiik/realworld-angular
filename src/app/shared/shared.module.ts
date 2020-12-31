import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FollowButtonComponent } from './buttons';
import { ShowAuthedDirective } from './directive';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [ListErrorsComponent, ShowAuthedDirective, FollowButtonComponent],
})
export class SharedModule {}
