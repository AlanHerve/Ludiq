import { NgModule } from '@angular/core';
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {CoreModule} from "../../../core/core.module";
import {PostsModule} from "../../../posts/posts.module";
import {CommonModule} from "@angular/common";
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { TopActivityListComponent } from './components/top-activity-list/top-activity-list.component';
import { TopActivityComponent } from './components/top-activity/top-activity.component';
@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    UserComponent,
    TopActivityListComponent,
    TopActivityComponent
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
