import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormHobbyPostComponent } from './form-hobby-post/form-hobby-post.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormCreateAccountComponent } from './form-create-account/form-create-account.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import {HttpClientModule} from "@angular/common/http";
import { FormLoginComponent } from './form-login/form-login.component';
import {AuthModule} from "./auth/auth.module";


@NgModule({
  declarations: [
    AppComponent,
    FormHobbyPostComponent,
    ProfileComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
