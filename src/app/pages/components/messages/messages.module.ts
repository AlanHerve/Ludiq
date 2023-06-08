import { NgModule } from '@angular/core';
import {MessagesRoutingModule} from "./messages-routing.module";
import {CoreModule} from "../../../core/core.module";
import {RouterOutlet} from "@angular/router";
import {MessagesComponent} from "./messages.component";
import { MessageComponent } from './components/message/message.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import {AsyncPipe, DatePipe, NgClass, NgFor, NgIf} from "@angular/common";
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { MessageBarComponent } from './components/message-bar/message-bar.component';
import { FriendComponent } from './components/friend/friend.component';
import {FormsModule} from "@angular/forms";
import { SuggestionConversationListComponent } from './components/suggestion-conversation-list/suggestion-conversation-list.component';
import { SuggestionConversationComponent } from './components/suggestion-conversation/suggestion-conversation.component';
@NgModule({
  declarations: [MessagesComponent, MessageComponent, MessageListComponent, FriendListComponent, MessageBarComponent, FriendComponent, SuggestionConversationListComponent, SuggestionConversationComponent],
  imports: [
    MessagesRoutingModule,
    RouterOutlet,
    CoreModule,
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    AsyncPipe,
    DatePipe
  ],
  exports: [
    MessagesRoutingModule,
    MessageComponent
  ]
})
export class MessagesModule { }
