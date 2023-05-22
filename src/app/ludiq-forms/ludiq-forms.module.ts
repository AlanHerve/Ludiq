import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormCreateAccountComponent} from "./form-create-account/form-create-account.component";
import {FormHobbyPostComponent} from "./form-hobby-post/form-hobby-post.component";
import {FormLoginComponent} from "./form-login/form-login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "../app-routing/app-routing.module"



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
    AppRoutingModule
  ]
})
export class LudiqFormsModule { }
