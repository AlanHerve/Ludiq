import { NgModule } from '@angular/core';
import { PostComponent } from "./components/post/post.component";
import { ActivityComponent } from './components/activity/activity.component';
import { PostListComponent } from './components/post-list/post-list.component';
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PostComponent,
    ActivityComponent,
    PostListComponent
  ],
    exports: [
        PostComponent,
        PostListComponent

    ],
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    FormsModule
  ]
})
export class PostsModule { }
