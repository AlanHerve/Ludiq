import { NgModule } from '@angular/core';
import {MessagesRoutingModule} from "./messages-routing.module";
import {CoreModule} from "../../../core/core.module";
import {RouterOutlet} from "@angular/router";
import {MessagesComponent} from "./messages.component";
@NgModule({
  declarations: [MessagesComponent],
  imports: [
    MessagesRoutingModule,
    RouterOutlet,
    CoreModule,
  ],
  exports: [
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
