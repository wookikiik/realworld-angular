import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { EditorModule } from './editor/editor.module';

const rounter = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    rounter,
    HomeModule,
    AuthModule,
    SharedModule,
    SettingsModule,
    ProfileModule,
    EditorModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
