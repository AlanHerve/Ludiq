import {NgModule} from '@angular/core';
import {CoreModule} from "../../core/core.module";
import {CommonModule} from "@angular/common";
import {ActivityComponent} from "./components/activity.component";
import {ActivityRoutingModule} from "./activity-routing.module";
import {PagesModule} from "../pages.module";
import {
  ActivityParticipantsListComponent
} from "../../shared/components/activity-participants-list/activity-participants-list.component";

@NgModule({
  declarations: [
    ActivityComponent,
    ActivityParticipantsListComponent,
  ],
  imports: [
    PagesModule,
  ],
  exports: [
    ActivityRoutingModule,
  ],
  providers: [],
})
export class ActivityModule {
}
