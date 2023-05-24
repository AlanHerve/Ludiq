import { NgModule } from '@angular/core';
import {PostComponent} from "./components/post-hobby/post.component";


@NgModule({
  declarations: [
    PostComponent
  ],
  exports: [
    PostComponent

  ],
  imports: [
  ]
})
export class PostsModule { }
