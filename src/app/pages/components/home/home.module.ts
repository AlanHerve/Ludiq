import { NgModule } from '@angular/core';
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {CoreModule} from "../../../core/core.module";
import {PostsModule} from "../../../posts/posts.module";
import {CommonModule} from "@angular/common";
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    HomeRoutingModule,
    CoreModule,
    CommonModule,
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
