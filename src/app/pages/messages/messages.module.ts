import { NgModule } from '@angular/core';
import {MessagesRoutingModule} from "./messages-routing.module";
import {RouterOutlet} from "@angular/router";
import {MessagesComponent} from "./components/messages/messages.component";
import { MessageComponent } from './components/message/message.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import {AsyncPipe, CommonModule, DatePipe} from "@angular/common";
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { MessageBarComponent } from './components/message-bar/message-bar.component';
import { FriendComponent } from './components/friend/friend.component';
import {FormsModule} from "@angular/forms";
import { SuggestionConversationListComponent } from './components/suggestion-conversation-list/suggestion-conversation-list.component';
import { SuggestionConversationComponent } from './components/suggestion-conversation/suggestion-conversation.component';
import {PagesModule} from "../pages.module";
@NgModule({
  declarations: [MessagesComponent, MessageComponent, MessageListComponent, FriendListComponent, MessageBarComponent, FriendComponent, SuggestionConversationListComponent, SuggestionConversationComponent],
  imports: [
    MessagesRoutingModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    PagesModule
  ],
  exports: [
    MessagesRoutingModule,
    MessageComponent
  ]
})
export class MessagesModule { }
