import {NgModule} from "@angular/core";
import {ProfileComponent} from "./components/profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {PostsModule} from "../../posts/posts.module";
import {PagesModule} from "../pages.module";
import {HomeModule} from "../home/home.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent
  ],
    imports: [
        ProfileRoutingModule,
        PostsModule,
        PagesModule,
        HomeModule,
        FormsModule
    ],
  exports: [
    ProfileRoutingModule
  ]
})
export class ProfileModule {
}
