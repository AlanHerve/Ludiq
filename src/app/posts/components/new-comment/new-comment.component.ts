// Import necessary modules and interfaces
import {Component, Input, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {UserService} from "../../../services/user.service";
import {PostService} from "../../services/post.service";
import {CommentDTO} from "../../models/comment-dto";
import {UserDTO} from "../../../models/user-dto";

/**
 * NewCommentComponent is a component to create new comments.
 * It is used to handle all the functionalities for creating a new comment.
 */
@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() postDTO!: PostDTO;

  protected comment!: string;
  protected commentDTO!: CommentDTO;

  // Constructor for the component. It injects two services: UserService and PostService
  constructor(private userService: UserService,
              private postsService: PostService) {
  }

  // ngOnInit method gets called once, immediately after the default constructor, when Angular finishes initializing the component
  ngOnInit(): void {
    // Initialize commentDTO
    this.commentDTO = {
      id: -1,
      userDTO: new UserDTO(-1, '', ''),
      content: this.comment,
      postID: this.postDTO.id,
      time: '',
    };

    // Get the current user
    this.userService.findUserById(this.userService.getCurrentId()).subscribe({
      next: (user) => {
        this.commentDTO.userDTO = user;
      },
      error: (error) => {
        console.log("Error while finding user of the new comment : ", error);
      }
    })
  }

  // Method to add a new comment
  addComment() {
    this.commentDTO.content = this.comment;

    // Call the addComment method from the PostService
    this.postsService.addComment(this.commentDTO).subscribe(response => {
      if (response) {
        // Reset the comment
        this.comment = '';
      } else {
        // Handle the error
        console.error('Erreur lors de l\'ajout du commentaire');
      }
    });
  }
}
