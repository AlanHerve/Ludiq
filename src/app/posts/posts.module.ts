import { NgModule } from '@angular/core';
import { PostComponent } from "./components/post/post.component";
import { ActivityComponent } from './components/activity/activity.component';
import { PostListComponent } from './components/post-list/post-list.component';
import {CommonModule, DatePipe} from "@angular/common";
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import {HobbyFlashcardComponent} from "./components/hobby-flashcard/hobby-flashcard.component";
import {HobbyFlashcardListComponent} from "./components/hobby-flashcard-list/hobby-flashcard-list.component";
import {PagesModule} from "../pages/pages.module";
import {FormsModule} from "@angular/forms";
import {NewCommentComponent} from "./components/new-comment/new-comment.component";
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';

@NgModule({
    declarations: [
        PostComponent,
        ActivityComponent,
        PostListComponent,
        ActivityListComponent,
        HobbyFlashcardComponent,
        HobbyFlashcardListComponent,
        NewCommentComponent,
        CommentComponent,
        CommentListComponent
    ],
  exports: [
    PostComponent,
    PostListComponent,
    ActivityListComponent,
    HobbyFlashcardListComponent
  ],
  imports: [
    DatePipe,
    CommonModule,
    PagesModule,
    FormsModule
  ]
})
export class PostsModule { }
