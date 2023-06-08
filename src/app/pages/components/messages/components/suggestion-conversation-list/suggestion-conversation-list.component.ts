import {Component, Input, OnInit} from '@angular/core';
import {ConversationDTO} from "../../models/conversation-dto";
import {UserDTO} from "../../../../../models/user-dto";
import {MessageDTO} from "../../models/message-dto";
import {MessageService} from "../../services/message.service";
import {ConversationService} from "../../services/conversation.service";

@Component({
  selector: 'app-suggestion-conversation-list',
  templateUrl: './suggestion-conversation-list.component.html',
  styleUrls: ['./suggestion-conversation-list.component.css']
})
export class SuggestionConversationListComponent implements OnInit {

  conversationsDTO: ConversationDTO[] = [];

  public constructor(private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    let id_user = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    this.conversationService.getAllConversations(id_user).subscribe({
      next: (conversations) => {
        this.conversationsDTO = conversations;
        console.log("Conversations successfully loaded");
      },
      error: (error) => {
        console.log("Error while loading conversations : ", error);
      }
    });
  }
}
