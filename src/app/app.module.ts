import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared';

const rounter = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, rounter, HomeModule, AuthModule, SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
