import {Component, Input, OnInit} from '@angular/core';
import {MessageDTO} from "../../models/message-dto";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageDTO!: MessageDTO;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onVerifySender(): boolean {
    return JSON.parse(localStorage.getItem('currentUser')!).id == this.messageDTO.id_user;
  }

  isDate() {
    return this.messageDTO.time != "";
  }

  isOwner(): boolean {
    return JSON.parse(localStorage.getItem('currentUser')!).id == this.messageDTO.id_user;
  }

  onDelete() {
    this.messageService.deleteMessage(this.messageDTO.id).subscribe({
      next: (response) => {
        console.log("success : " + response);
      },
      error: (error) => {
        console.error("error deleting message ", error);
      }
    })
  }
}
