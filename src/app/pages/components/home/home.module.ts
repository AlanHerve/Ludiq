import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {CoreModule} from "../../../core/core.module";
import {PostsModule} from "../../../posts/posts.module";
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CoreModule,
    PostsModule
  ],
  exports: [
    HomeRoutingModule,
    HomeComponent
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
