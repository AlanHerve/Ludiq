import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormCreateAccountComponent} from "../form-create-account/form-create-account.component";
import {FormLoginComponent} from "../form-login/form-login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    FormCreateAccountComponent,
    FormLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormCreateAccountComponent,
    FormLoginComponent
  ]
})
export class AuthModule { }
