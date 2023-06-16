import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PostDTO } from "../../models/post-dto";
import { Router } from "@angular/router";
import { PostService } from "../../services/post.service";
import {UserService} from "../../../services/user.service";
import { CommentDTO } from "../../models/comment-dto";

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

  protected commentsDTO!: CommentDTO[];


  constructor(private userService: UserService, private router: Router, private postService: PostService) {
  }
  ngOnInit(): void {
    /*this.postsService.getPost(this.postDTO.id.toString()).subscribe({
      next: (response) => {
        this.postDTO = response;
        this.postDTO.comments = response.comments; // Ajoutez cette ligne
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du post : ', error);
      }
    });*/

    this.postsService.hasLiked(this.postDTO.id).subscribe(hasLiked => {
      this.isLiked = hasLiked;
      console.log("Has liked : " + hasLiked);
    });
    this.loadImages();
  }

  onCommentClicked(): void {
    this.showCommentBox = !this.showCommentBox;
  }

  onPostClicked(): void {
    this.router.navigateByUrl(`/post/${this.postDTO.id}`)
  }

  private displayThreeComments(): void {

  }

  private getAllComments(): void {
    this.postService.getAllComments(this.postDTO.id).subscribe({
      next: (comments) => {
        this.commentsDTO = comments;
      },
      error: (error) => {
        console.log("Error while finding all comments of post : " + this.postDTO.id, ". Error : ", error)
    }
    })
  }

  loadImages(): void {
    const images: File[] = [];
    for (const image of this.postDTO.images) {
      // @ts-ignore
      this.postService.getImage(image).subscribe({
        next: (response: Blob) => {
          // @ts-ignore
          const file = new File([response], image, { type: response.type });
          images.push(file);
        }
      });
    }
    this.postDTO.images = images;
    console.log(this.postDTO.images);
  }


  /*getComments(postId: number): void {
    this.postsService.getPost(postId.toString()).subscribe({
      next: (response: PostDTO) => {
        this.postDTO = response;
        this.comments = response.comments;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du post : ', error);
      }
    });
  }*/


  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  onUserClicked(): void {
    this.router.navigateByUrl('profile/'+this.postDTO.userDTO.id);
  }

  likePost() {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.postService.likePost(this.postDTO.id, this.userService.getCurrentId()).subscribe(() => {
        this.postDTO.likes++;
      });
    } else {
      this.postService.unlikePost(this.postDTO.id, this.userService.getCurrentId()).subscribe(() => {
        this.postDTO.likes--;
      });
    }
  }

  onClose() {

  }
}