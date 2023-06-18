import {Component, OnInit} from '@angular/core';
import {FriendService} from "../../services/friend.service";
import {FriendRequestDTO} from "../../../../models/friend-request-dto";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  friendsDTO: FriendRequestDTO[] = [];

  constructor(private friendsService: FriendService) {
    this.friendsService.currentDeleteState.subscribe((data) => {
      console.log("returned Data :" + data);
      this.friendsDTO.splice(this.findfriendsDToWithData(data), 1);
    });
  }

  findfriendsDToWithData(data: number): number{
    for(let i =0; i<this.friendsDTO.length; i++) {
      if (this.friendsDTO[i].user.id == data) return i
    }
    return 0;
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.friendsService.getAllFriends(user).subscribe({
      next: (response: FriendRequestDTO[]) => {
        console.log('success searching all friends :', response);
        this.friendsDTO = response;
        for (let i = 0; i < response.length; i++) {
          console.log(this.friendsDTO[i]);
        }

      },
      error: (error) => {
        console.log('error while searching all friends :', error);
      }
    });
  }
}
