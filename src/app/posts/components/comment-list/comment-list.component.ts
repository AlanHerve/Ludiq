import {Component, Input, OnInit} from '@angular/core';
import {CommentDTO} from "../../models/comment-dto";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() commentsDTO!: CommentDTO[];

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
        this.commentsDTO.push(response);
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
