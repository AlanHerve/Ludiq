import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {LudiqFormsModule} from "./ludiq-forms/ludiq-forms.module";
import {CoreModule} from "./core/core.module";
import {HomeRoutingModule} from "./pages/components/home/home-routing.module";
import {HomeModule} from "./pages/components/home/home.module";
import {ProfileModule} from "./pages/components/profile/profile.module";
import {FormCreateAccountModule} from "./ludiq-forms/components/form-create-account/form-create-account.module";
import {HubRoutingModule} from "./pages/components/hub/hub-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PostsModule} from "./posts/posts.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    HomeRoutingModule,
    HomeModule,
    HubRoutingModule,
    ProfileModule,
    FormCreateAccountModule,
    PostsModule,
    LudiqFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
