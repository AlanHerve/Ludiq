import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "../../../core/core.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [ProfileComponent],
    imports: [
        ProfileRoutingModule,
        RouterOutlet,
        CoreModule,
        NgIf
    ],
  exports: [
    ProfileRoutingModule
  ]
})
export class ProfileModule {}
