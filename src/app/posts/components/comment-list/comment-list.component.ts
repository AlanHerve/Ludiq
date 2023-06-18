// Import necessary modules and interfaces
import {Component, Input, OnInit} from '@angular/core';
import {CommentDTO} from "../../models/comment-dto";
import {PostService} from "../../services/post.service";
import {UserDTO} from "../../../models/user-dto";

/*
CommentListComponent is a component to display a list of comments.
It is used to handle all the functionalities for the comment list.
*/
@Component({
  // The name of the component that will be used in the templates
  selector: 'app-comment-list',
  // Link to the HTML template for this component
  templateUrl: './comment-list.component.html',
  // Link to the CSS styles for this component
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  // Input property to get the list of comments data from the parent component
  @Input() commentsDTO: CommentDTO[] = [];

  // Constructor for the component. It injects one service: PostService
  constructor(private postService: PostService) {
  }

  // ngOnInit method gets called once, immediately after the default constructor, when Angular finishes initializing the component
  ngOnInit(): void {
    this.postService.currentDeleteStateComment.subscribe({
      next: (response) => {
        const index_remove = this.findIndexCommentById(response);
        if(index_remove != -1){
          this.commentsDTO.splice(index_remove, 1);
        }
      }
    });

    this.postService.
    currentneedAddComment.subscribe({
      next: (response) => {
        this.commentsDTO.push(new CommentDTO(response.id, response.userDTO, response.content, response.postID, response.time));
      }
    })
  }

  // Method to find a comment in the list by its id
  findIndexCommentById(id_comment: number): number{
    let i = 0;
    while(this.commentsDTO[i].id != id_comment){
      i++;
      if(i == this.commentsDTO.length){
        i = -1;
        break;
      }
    }
    return i;
  }
}
