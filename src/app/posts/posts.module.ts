import {NgModule} from '@angular/core';
import {PostComponent} from "./components/post/post.component";
import {ActivityFlashcardComponent} from './components/activity-flashcard/activity-flashcard.component';
import {PostListComponent} from './components/post-list/post-list.component';
import {CommonModule, DatePipe} from "@angular/common";
import {ActivityFlashcardListComponent} from './components/activity-flashcard-list/activity-flashcard-list.component';
import {HobbyFlashcardComponent} from "./components/hobby-flashcard/hobby-flashcard.component";
import {HobbyFlashcardListComponent} from "./components/hobby-flashcard-list/hobby-flashcard-list.component";
import {PagesModule} from "../pages/pages.module";
import {FormsModule} from "@angular/forms";
import {NewCommentComponent} from "./components/new-comment/new-comment.component";
import {CommentComponent} from './components/comment/comment.component';
import {CommentListComponent} from './components/comment-list/comment-list.component';

@NgModule({
  declarations: [
    PostComponent,
    ActivityFlashcardComponent,
    PostListComponent,
    ActivityFlashcardListComponent,
    HobbyFlashcardComponent,
    HobbyFlashcardListComponent,
    NewCommentComponent,
    CommentComponent,
    CommentListComponent
  ],
  exports: [
    PostComponent,
    PostListComponent,
    ActivityFlashcardListComponent,
    HobbyFlashcardListComponent
  ],
  imports: [
    DatePipe,
    CommonModule,
    PagesModule,
    FormsModule
  ]
})
export class PostsModule {
}
