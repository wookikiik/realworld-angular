import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ShowAuthedDirective } from './directives/show-authed.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ShowAuthedDirective],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, ShowAuthedDirective],
})
export class SharedModule {}
