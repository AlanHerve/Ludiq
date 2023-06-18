import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendRequestDTO} from "../../../../models/friend-request-dto";
import {FriendService} from "../../services/friend.service";
import {Image} from "../../../../models/image";
import {imagesUrl} from "../../../../services/urls";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css', '../messages/messages.component.css']
})
export class FriendComponent implements OnInit, Image {
  @Input() friendDTO!: FriendRequestDTO;

  constructor(private router: Router, private friendService: FriendService) {
  }

  ngOnInit(): void {
  }

  // Method that redirects the user to the page of the activity
  onClickFriend(): void {
    this.router.navigateByUrl('messages/'+this.friendDTO.user.id);
  }

  // Method that check if the user is waiting for a response
  isWaiting(): boolean {
    return this.friendDTO.status == 1;
  }

  // Method that check if the user is waiting for a response
  formatStatus(): string {
    if(this.friendDTO.status==1) return "waiting..."

    return "";
  }

  isRequester(): boolean {
    return this.friendDTO.requester == this.friendDTO.user.id;
  }

  // Method that accept a friend request
  acceptFriendship() {
    const user_id = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    this.friendService.acceptFriendship(this.friendDTO.user.id, user_id).subscribe({
      next: (response) => {
        if(response == "success") this.friendDTO.status = 0;
        else console.error("Could not accept friendship");
      },
      error: (error) => {
        console.log('error while accessing to profile informations : ', error);
      }
    });
  }

  // Method that remove a friend
  removeFriend() {
    const user_id = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    this.friendService.removeFriend(user_id, this.friendDTO.user.id).subscribe({
      next: (response) => {
        if(response == "success") this.friendDTO.status = 0;
        else console.error("Could not remove friendship");
      },
      error: (error) => {
        console.log('error while accessing to profile informations : ', error);
      }
    });
  }

  // Method that load the image of the user
  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }
}
