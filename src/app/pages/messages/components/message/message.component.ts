import {Component, Input, OnInit} from '@angular/core';
import {MessageDTO} from "../../models/message-dto";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageDTO!: MessageDTO;
  ngOnInit(): void {
  }

  onVerifySender(): boolean {
    return JSON.parse(localStorage.getItem('currentUser')!).id == this.messageDTO.id_user;
  }
}
