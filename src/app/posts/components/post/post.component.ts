import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PostDTO } from "../../models/post-dto";
import { Router } from "@angular/router";
import { PostsService } from "../../services/posts.service";

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

  constructor(private router: Router, private postService: PostsService) {
  }
  ngOnInit(): void {
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
      this.postService.likePost(this.postDTO.id_regular_post).subscribe(() => {
        this.postDTO.likes++;
      });
    } else {
      this.postService.unlikePost(this.postDTO.id_regular_post).subscribe(() => {
        this.postDTO.likes--;
      });
    }
  }



}
