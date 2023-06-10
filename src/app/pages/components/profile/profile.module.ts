import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {RouterOutlet} from "@angular/router";
import {CoreModule} from "../../../core/core.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {PostsModule} from "../../../posts/posts.module";
import {
  HobbyFlashcardListComponent
} from "../../../posts/components/hobby-flashcard-list/hobby-flashcard-list.component";
import {HobbyFlashcardComponent} from "../../../posts/components/hobby-flashcard/hobby-flashcard.component";
import {PagesModule} from "../../pages.module";

@NgModule({

  declarations: [ProfileComponent],

  imports: [
    ProfileRoutingModule,
    PostsModule,
    PagesModule
  ],
  exports: [
    ProfileRoutingModule
  ]
})
export class ProfileModule {
}
