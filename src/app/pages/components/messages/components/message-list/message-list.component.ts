import {Component, OnInit} from '@angular/core';
import {MessageDTO} from "../../models/messageDTO";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messagesDTO: MessageDTO[] = [];

  ngOnInit(): void {
    this.messagesDTO.push(new MessageDTO(1, 1, 5, "Raphael","tact", "Coucou Monsieur 2!"));
    this.messagesDTO.push(new MessageDTO(2, 5, 1, "Eileen","teg","Coucou Monsieur 1!"));
    this.messagesDTO.push(new MessageDTO(3, 5, 1, "Eileen","teg","Ca va ?"));
    this.messagesDTO.push(new MessageDTO(4, 1, 5, "Raphael","tact","Oui et toi ?"));
    this.messagesDTO.push(new MessageDTO(4, 5, 1, "Eileen","teg","Tranquille !"));
  }

}
