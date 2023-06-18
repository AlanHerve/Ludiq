import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PagesModule} from "./pages/pages.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // We import all the modules that we need for our projet :
    // Animations for our forms :
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    // HttpClient for our http requests
    HttpClientModule,
    // CommonModule for directives such as ngFor, ngIf ...
    CommonModule,
    // PagesModule for the components of the pages
    PagesModule,
  ],
  providers: [
    {
      // In order to display the local date on our website, we use the value fr-FR
      provide: LOCALE_ID, useValue: 'fr-FR'
    },
  ],
    exports: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
