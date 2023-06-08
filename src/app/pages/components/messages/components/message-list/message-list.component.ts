import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageDTO } from "../../models/message-dto";
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnChanges {
  messagesDTO: MessageDTO[] = [];
  @Input() id_friend!: number;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id_friend']) {
      this.loadMessages();
    }
  }

  loadMessages(): void {
    let user = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.messageService.getMessagesBetweenUsers(user, this.id_friend).subscribe({
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
