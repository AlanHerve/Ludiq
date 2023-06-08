import {Component, Input, OnInit} from '@angular/core';
import {ConversationDTO} from "../../models/conversation-dto";

@Component({
  selector: 'app-suggestion-conversation',
  templateUrl: './suggestion-conversation.component.html',
  styleUrls: ['./suggestion-conversation.component.css']
})
export class SuggestionConversationComponent implements OnInit {

  @Input() conversationDTO!: ConversationDTO;

  ngOnInit() {
  }

}
