import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {PostsModule} from "../../posts/posts.module";
import {PagesModule} from "../pages.module";
import {HomeModule} from "../home/home.module";

@NgModule({

  declarations: [
    ProfileComponent
  ],

    imports: [
        ProfileRoutingModule,
        PostsModule,
        PagesModule,
        HomeModule
    ],
  exports: [
    ProfileRoutingModule
  ]
})
export class ProfileModule {
}
