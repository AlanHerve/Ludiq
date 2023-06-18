import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ConversationDTO} from "../../models/conversation-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-suggestion-conversation',
  templateUrl: './suggestion-conversation.component.html',
  styleUrls: ['./suggestion-conversation.component.css']
})
export class SuggestionConversationComponent implements OnInit {

  @Input() conversationDTO!: ConversationDTO;

  protected croppedContent!: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if(this.conversationDTO.messagesDTO[this.conversationDTO.messagesDTO.length - 1].content)
      this.croppedContent = this.cropContent(this.conversationDTO.messagesDTO[this.conversationDTO.messagesDTO.length - 1].content);
  }

  //function to crop the content of the last message
  cropContent(content: string): string {
    let cropped = content.substring(0, 40);
    if(content.length > cropped.length) cropped += '...'
    return cropped;
  }

  //function to navigate to the conversation page
  onConversationClicked(): void {
    this.router.navigateByUrl('messages/'+this.conversationDTO.userDTO.user.id);
  }

}
