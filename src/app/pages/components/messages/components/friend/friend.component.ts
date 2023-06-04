import {Component, Input, OnInit} from '@angular/core';
import {UserDTO} from "../../../../../models/user-dto";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css', './../../messages.component.css']
})
export class FriendComponent implements OnInit {
  @Input() friendDTO!: UserDTO;

  ngOnInit(): void {
  }

}
