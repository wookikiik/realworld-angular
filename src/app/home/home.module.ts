import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const homepageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    homepageRouter
  ]
})
export class HomeModule { }
