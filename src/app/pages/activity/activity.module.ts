import {NgModule} from '@angular/core';
import {CoreModule} from "../../core/core.module";
import {CommonModule} from "@angular/common";
import {ActivityComponent} from "./components/activity.component";
import {ActivityRoutingModule} from "./activity-routing.module";

@NgModule({
  declarations: [
    ActivityComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
  ],
  exports: [
    ActivityRoutingModule
  ],
  providers: [],
})
export class ActivityModule {
}
