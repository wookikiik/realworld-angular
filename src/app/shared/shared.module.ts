import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { FollowProfileButtonComponent } from './buttons/follow-profile-button/follow-profile-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShowAuthedDirective,
    ListErrorsComponent,
    FollowProfileButtonComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ShowAuthedDirective,
    ListErrorsComponent,
    FollowProfileButtonComponent,
  ],
})
export class SharedModule {}
