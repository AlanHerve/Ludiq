import {Component, Input, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {UserService} from "../../../services/user.service";
import {PostService} from "../../services/post.service";
import {CommentDTO} from "../../models/comment-dto";
import {UserDTO} from "../../../models/user-dto";

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() postDTO!: PostDTO;

  protected comment!: string;
  protected commentDTO!: CommentDTO;

  constructor(private userService: UserService,
              private postsService: PostService) {
  }

  ngOnInit(): void {
    this.commentDTO = {
      id: -1,
      userDTO: new UserDTO(-1, '', ''),
      content: this.comment,
      postID: this.postDTO.id,
      time: '',
    };

    this.userService.findUserById(this.userService.getCurrentId()).subscribe({
      next: (user) => {
        this.commentDTO.userDTO = user;
      },
      error: (error) => {
        console.log("Error while finding user of the new comment : ", error);
      }
    })
  }

  addComment() {

    this.commentDTO.content = this.comment;

    this.postsService.addComment(this.commentDTO).subscribe(response => {
      if (response.success) {
        this.comment = '';
      } else {
        // Gére l'erreur
        console.error('Erreur lors de l\'ajout du commentaire');
      }
    });
  }
}
