import { NgModule } from '@angular/core';
import {MessagesRoutingModule} from "./messages-routing.module";
import {CoreModule} from "../../../core/core.module";
import {RouterOutlet} from "@angular/router";
import {MessagesComponent} from "./messages.component";
import { MessageComponent } from './components/message/message.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import {NgClass, NgFor} from "@angular/common";
@NgModule({
  declarations: [MessagesComponent, MessageComponent, MessageListComponent],
  imports: [
    MessagesRoutingModule,
    RouterOutlet,
    CoreModule,
    NgFor,
    NgClass
  ],
  exports: [
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
