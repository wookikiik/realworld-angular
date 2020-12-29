import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardGuard, SharedModule } from '../shared';
import { SettingsComponent } from './settings.component';

const settingspageRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'settings',
      component: SettingsComponent,
      canActivate: [AuthGuardGuard],
    },
  ]
);

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    settingspageRouter,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
