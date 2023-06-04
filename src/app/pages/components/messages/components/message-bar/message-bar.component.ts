import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {MessageDTO} from "../../models/message-dto";

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.css']
})
export class MessageBarComponent implements OnInit {
  messageContent : string = '';
  messageDTO: MessageDTO = {
    id: -1,
    id_user: -1,
    id_user2: -1,
    content: '',
    time: ''
  }
  constructor(private messageService: MessageService) {
  }
  ngOnInit(): void {
  }

  onCreateMessage(): void {
    let user = JSON.parse(localStorage.getItem('currentUser')!).id;
    let user2 = 2;
    this.messageDTO = new MessageDTO(-1, user, user2, this.messageContent,'')
    this.messageService.createMessage(this.messageDTO).subscribe({
      next: (response) => {
        console.log('success:', response);

      },
      error: (error) => {
        console.log('error:', error);
      }
    });
  }

}
