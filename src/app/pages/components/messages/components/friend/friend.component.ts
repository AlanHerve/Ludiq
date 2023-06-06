import {Component, Input, OnInit} from '@angular/core';
import {UserDTO} from "../../../../../models/user-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css', './../../messages.component.css']
})
export class FriendComponent implements OnInit {
  @Input() friendDTO!: UserDTO;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onClickFriend(): void {
    this.router.navigateByUrl('messages/'+this.friendDTO.id);
  }
}
