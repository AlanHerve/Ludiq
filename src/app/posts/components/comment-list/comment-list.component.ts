import {Component, Input, OnInit} from '@angular/core';
import {CommentDTO} from "../../models/comment-dto";
import {PostService} from "../../services/post.service";
import {UserDTO} from "../../../models/user-dto";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() commentsDTO: CommentDTO[] = [];

  constructor(private postService: PostService) {
  }

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
        console.log("added commnt");
        this.commentsDTO.push(new CommentDTO(response.id, response.userDTO, response.content, response.postID, response.time));
        for (let i = 0; i < this.commentsDTO.length; i++) {
          console.log(this.commentsDTO[i]);
        }
      }
    })
  }

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
