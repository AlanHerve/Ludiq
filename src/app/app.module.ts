import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {LudiqFormsModule} from "./ludiq-forms/ludiq-forms.module";
import {CoreModule} from "./core/core.module";
import {HomeRoutingModule} from "./pages/components/home/home-routing.module";
import {PagesModule} from "./pages/pages.module";
import {HomeModule} from "./pages/components/home/home.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    LudiqFormsModule,
    CoreModule,
    HomeRoutingModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
