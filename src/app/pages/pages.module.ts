import { NgModule } from '@angular/core';
import {CoreModule} from "../core/core.module";
import { NotificationsComponent } from './notifications/notifications.component';
import { ActivityComponent } from './activity/components/activity.component';



@NgModule({
  declarations: [
    NotificationsComponent,
    ActivityComponent
  ],
  exports: [
    CoreModule,
  ],
  imports: [
    CoreModule,
  ]
})
export class PagesModule { }
