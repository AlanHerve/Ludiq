import {Component, OnInit} from '@angular/core';
import {MessageDTO} from "../../models/message-dto";
import {MessageService} from "../../services/message.service";
import {UserDTO} from "../../../../../models/user-dto";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messagesDTO: MessageDTO[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.messageService.getMessagesBetweenUsers(user, 2).subscribe({
      next: (response: MessageDTO[]) => {
        console.log('success:', response);
        this.messagesDTO = response;

      },
      error: (error) => {
        console.log('error:', error);
      }
    });

  }

}
