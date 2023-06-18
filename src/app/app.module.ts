import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PagesModule} from "./pages/pages.module";
import {CommonModule} from "@angular/common";
import { OrganizationButtonComponent } from './shared/components/organization-button/organization-button.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    PagesModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
    exports: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
