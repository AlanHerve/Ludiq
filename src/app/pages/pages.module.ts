import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "../core/core.module";
import { NotificationsComponent } from './components/notifications/notifications.component';


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
  ]
})
export class PagesModule { }
