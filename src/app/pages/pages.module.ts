import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "../core/core.module";
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagesComponent } from './components/messages/messages.component';


@NgModule({
  declarations: [
    NotificationsComponent,
    MessagesComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    CoreModule,
  ]
})
export class PagesModule { }
