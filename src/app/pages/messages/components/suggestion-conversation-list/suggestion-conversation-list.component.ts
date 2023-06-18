import {Component, OnInit} from '@angular/core';
import {ConversationDTO} from "../../models/conversation-dto";
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
    const id_user = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    this.conversationService.getAllConversations(id_user).subscribe({
      next: (conversations) => {
        this.conversationsDTO = conversations.filter(conversation => conversation.messagesDTO.some(message => message.content !== null));
        console.log("Conversations successfully loaded");
      },
      error: (error) => {
        console.log("Error while loading conversations : ", error);
      }
    });
  }
}
