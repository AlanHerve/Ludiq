import { NgModule } from '@angular/core';
import {CoreModule} from "../core/core.module";
import { NotificationsComponent } from './notifications/components/notifications.component';

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  exports: [
    CoreModule,
  ],
  imports: [
    CoreModule,
  ]
})
export class PagesModule { }
