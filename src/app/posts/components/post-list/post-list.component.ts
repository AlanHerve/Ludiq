import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() postsDTO: PostDTO[] = [];

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    for (const post of this.postsDTO) {
      this.loadImages(post);
    }
  }

  loadImages(post: PostDTO): void {
    const images: File[] = [];
    for (const imageName of post.images) {
      // @ts-ignore
      this.postsService.getImage(imageName).subscribe({
        next: (response: Blob) => {
          if (typeof imageName === "string") {
            const file = new File([response], imageName);
            // @ts-ignore
            images.push(file);
          }
        },
        error: (error) => {
          console.log('Error loading image:', error);
        }
      });
    }
    post.files = images;
    console.log(post.files);
  }

}
