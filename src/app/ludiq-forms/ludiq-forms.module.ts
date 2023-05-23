import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormCreateAccountComponent} from "./form-create-account/form-create-account.component";
import {FormHobbyPostComponent} from "./form-hobby-post/form-hobby-post.component";
import {FormLoginComponent} from "./form-login/form-login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";




@NgModule({
  declarations: [
    FormCreateAccountComponent,
    FormHobbyPostComponent,
    FormLoginComponent
  ],
  exports: [
    FormCreateAccountComponent,
    FormLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,

  ]
})
export class LudiqFormsModule { }
