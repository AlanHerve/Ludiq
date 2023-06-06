import { NgModule } from '@angular/core';
import { PostComponent } from "./components/post/post.component";
import { ActivityComponent } from './components/activity/activity.component';
import { PostListComponent } from './components/post-list/post-list.component';
import {DatePipe, NgFor, NgIf} from "@angular/common";
import { HobbyFlashcardComponent } from './components/hobby-flashcard/hobby-flashcard.component';


@NgModule({
  declarations: [
    PostComponent,
    ActivityComponent,
    PostListComponent,
    HobbyFlashcardComponent
  ],
    exports: [
        PostComponent,
        PostListComponent

    ],
  imports: [
    NgFor,
    NgIf,
    DatePipe
  ]
})
export class PostsModule { }
