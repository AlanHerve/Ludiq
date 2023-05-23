import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormHobbyPostComponent } from './ludiq-forms/form-hobby-post/form-hobby-post.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import {HttpClientModule} from "@angular/common/http";
import {LudiqFormsModule} from "./ludiq-forms/ludiq-forms.module";
import {NavigationBarComponent} from "./core/components/navigation-bar/navigation-bar.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SearchBarComponent} from "./core/components/search-bar/search-bar.component";
import {CoreModule} from "./core/core.module";


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LudiqFormsModule,
    RouterLink,
    RouterLinkActive,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
