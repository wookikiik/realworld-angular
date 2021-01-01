import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ShowAuthedDirective],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, ShowAuthedDirective],
})
export class SharedModule {}
