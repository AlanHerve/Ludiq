import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LudiqFormsModule} from "../ludiq-forms/ludiq-forms.module";
import {RouterOutlet} from "@angular/router";
import {HubComponent} from "./hub/hub.component";
import { BlankComponent } from './blank/blank.component';


@NgModule({
  declarations: [
    HubComponent,
    BlankComponent
  ],
  exports: [
    HubComponent

  ],
  imports: [
    CommonModule,
    LudiqFormsModule,
    RouterOutlet
  ]
})
export class PagesModule { }
