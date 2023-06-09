import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "../core/core.module";
import { NotificationsComponent } from './components/notifications/notifications.component';

import { MessagesComponent } from './components/messages/messages.component';

import { OrganizationComponent } from './components/organization/organization.component';
import {MessagesModule} from "./components/messages/messages.module";



@NgModule({
  declarations: [
    NotificationsComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    CoreModule,
    MessagesModule
  ]
})
export class PagesModule { }
