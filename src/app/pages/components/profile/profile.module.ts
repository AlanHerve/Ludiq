import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "../../../core/core.module";
import {ProfileRoutingModule} from "./profile-routing.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    ProfileRoutingModule,
    RouterOutlet,
    CoreModule
  ],
  exports: [
    ProfileRoutingModule
  ]
})
export class ProfileModule {}
