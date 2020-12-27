import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import {
  ApiService,
  FooterComponent,
  HeaderComponent,
  UserService,
} from './shared';

const rounter = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [BrowserModule, rounter, HomeModule, AuthModule, HttpClientModule],
  providers: [ApiService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
