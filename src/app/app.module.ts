import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormHobbyPostComponent } from './ludiq-forms/form-hobby-post/form-hobby-post.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import {HttpClientModule} from "@angular/common/http";
import {LudiqFormsModule} from "./ludiq-forms/ludiq-forms.module";


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LudiqFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
