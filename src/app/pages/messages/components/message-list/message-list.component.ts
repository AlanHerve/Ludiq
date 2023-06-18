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
    this.messageService.currentNeedToAddMessage.subscribe({
      next: (response) => {
        this.messagesDTO.push(response);
      }
    });

    this.messageService.currentNeedToDeleteMessage.subscribe({
      next: (response) => {
        const index_to_remove = this.findMessageIndexByID(response);
        if(index_to_remove!=-1){
          this.messagesDTO.splice(index_to_remove, 1);
        }
      }
    })
    this.loadMessages();
  }

  findMessageIndexByID(id:number) :number{
    let i = 0;
    while (this.messagesDTO[i].id != id){
      i++;
      if(i == this.messagesDTO.length){
        i = -1;
        break;
      }
    }

    return i;
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
