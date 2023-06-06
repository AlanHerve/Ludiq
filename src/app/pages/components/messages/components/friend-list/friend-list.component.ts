import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../../../../../models/user-dto";
import {PostDTO} from "../../../../../posts/models/post-dto";
import {FriendService} from "../../services/friend.service";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  friendsDTO: UserDTO[] = [];

  constructor(private friendsService: FriendService) {
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.friendsService.getAllFriends(user).subscribe({
      next: (response: UserDTO[]) => {
        console.log('success:', response);
        this.friendsDTO = response;

      },
      error: (error) => {
        console.log('error:', error);
      }
    });
    this.friendsDTO.push(new UserDTO(3, "Eileen", "teg", '', ''));
    this.friendsDTO.push(new UserDTO(2, "Alan", "alan", '', ''));
  }
}