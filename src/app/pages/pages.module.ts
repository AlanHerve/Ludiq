import { NgModule } from '@angular/core';
import {CoreModule} from "../core/core.module";
import {TopBarComponent} from "../shared/components/top-bar/top-bar.component";
<<<<<<< HEAD
import { DetailedPostComponent } from './post/components/detailed-post/detailed-post.component';
=======
import {NotificationsComponent} from "./notifications/components/notifications.component";

>>>>>>> alan_routing

@NgModule({
  declarations: [
    NotificationsComponent,
    TopBarComponent,
    DetailedPostComponent
  ],
  exports: [
    CoreModule,
    TopBarComponent
  ],
  imports: [
    CoreModule,
  ]
})
export class PagesModule { }
