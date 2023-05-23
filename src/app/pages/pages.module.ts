import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LudiqFormsModule} from "../ludiq-forms/ludiq-forms.module";
import {RouterOutlet} from "@angular/router";
import {HubComponent} from "./hub/hub.component";
import { BlankComponent } from './blank/blank.component';
import {CoreModule} from "../core/core.module";
import {PostModule} from "../post/post.module";


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
    RouterOutlet,
    CoreModule,
    PostModule
  ]
})
export class PagesModule { }
