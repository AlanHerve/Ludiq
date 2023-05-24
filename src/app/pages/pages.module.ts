import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LudiqFormsModule} from "../ludiq-forms/ludiq-forms.module";
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "../core/core.module";


@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    LudiqFormsModule,
    RouterOutlet,
    CoreModule,
  ]
})
export class PagesModule { }
