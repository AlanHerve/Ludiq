import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PostDTO } from "../../models/post-dto";
import { Router } from "@angular/router";
import { PostsService } from "../../services/posts.service";
import {UserService} from "../../../services/user.service";
import { PostComment } from "../comment/comment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postDTO!: PostDTO;
  @Output() postLiked: EventEmitter<PostDTO> = new EventEmitter<PostDTO>();
  isLiked: boolean = false;
  showCommentBox: boolean = false;
  newComment: string = '';
  comments: PostComment[] = [];


  constructor(private userService: UserService,private postsService: PostsService, private router: Router, private postService: PostsService) {
  }
  ngOnInit(): void {
    this.getComments(this.postDTO.id);
  }

  getComments(postId: number): void {
    this.postsService.getPost(postId).subscribe({
      next: (response: PostDTO) => {
        this.postDTO = response;
        this.comments = response.comments;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du post : ', error);
      }
    });
  }


  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  onUserClicked(): void {
    this.router.navigateByUrl('profile/'+this.postDTO.userDTO.id);
  }

  likePost() {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.postService.likePost(this.postDTO.id).subscribe(() => {
        this.postDTO.likes++;
      });
    } else {
      this.postService.unlikePost(this.postDTO.id).subscribe(() => {
        this.postDTO.likes--;
      });
    }
  }

  addComment() {
    const comment = {
      id_user: this.userService.getCurrentId(),
      content: this.newComment,
      id_regular_post: this.postDTO.id,
      type: 'addComment'
    };


    this.postsService.addComment(comment).subscribe(response => {
      if (response.success) {
        // Ajoute le nouveau commentaire à la liste des commentaires
        this.comments.push(comment);
        // Réinitialise newComment pour vider le champ de saisie
        this.newComment = '';
      } else {
        // Gére l'erreur
        console.error('Erreur lors de l\'ajout du commentaire');
      }
    });
  }

}
