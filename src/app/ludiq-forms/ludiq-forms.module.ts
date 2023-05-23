import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormCreateAccountComponent} from "./components/form-create-account/form-create-account.component";
import {FormHobbyPostComponent} from "./components/form-hobby-post/form-hobby-post.component";
import {FormLoginComponent} from "./components/form-login/form-login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import { FormNewPostComponent } from './components/form-new-post/form-new-post.component';



@NgModule({
  declarations: [
    FormCreateAccountComponent,
    FormHobbyPostComponent,
    FormLoginComponent,
    FormNewPostComponent
  ],
    exports: [
        FormCreateAccountComponent,
        FormLoginComponent,
        FormNewPostComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink
  ]
})
export class LudiqFormsModule { }