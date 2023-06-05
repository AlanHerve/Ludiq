import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "../../../core/core.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {NgIf} from "@angular/common";
import {PostsModule} from "../../../posts/posts.module";

@NgModule({
  declarations: [ProfileComponent],
    imports: [
        ProfileRoutingModule,
        RouterOutlet,
        CoreModule,
        NgIf,
        PostsModule
    ],
  exports: [
    ProfileRoutingModule
  ]
})
export class ProfileModule {}
