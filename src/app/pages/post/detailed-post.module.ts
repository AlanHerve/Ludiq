import {NgModule} from "@angular/core";
import {PagesModule} from "../pages.module";
import {DetailedPostComponent} from "./components/detailed-post/detailed-post.component";
import {DetailedPostRoutingModule} from "./detailed-post-routing.module";
import {PostsModule} from "../../posts/posts.module";

@NgModule({
  declarations: [
    DetailedPostComponent
  ],
  imports: [
    PagesModule,
    PostsModule
  ],
  exports: [
    DetailedPostRoutingModule
  ],
})
export class DetailedPostModule {

}
