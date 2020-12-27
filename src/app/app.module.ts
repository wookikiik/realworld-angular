import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './shared';
import { HomeModule } from './home/home.module';

const rounter = RouterModule.forRoot([], {useHash: true});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    rounter,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
