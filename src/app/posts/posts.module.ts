import { NgModule } from '@angular/core';
import {PostComponent} from "./components/post-hobby/post.component";
import { ActivityComponent } from './components/activity/activity.component';


@NgModule({
  declarations: [
    PostComponent,
    ActivityComponent
  ],
  exports: [
    PostComponent

  ],
  imports: [
  ]
})
export class PostsModule { }
