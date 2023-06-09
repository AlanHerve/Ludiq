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
    this.loadImages();
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


  onClose() {

  }
}
