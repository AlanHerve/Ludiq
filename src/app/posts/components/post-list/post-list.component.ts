import {Component, OnInit} from '@angular/core';
import {PostComponent} from "../post/post.component";
import {PostDTO} from "../../models/post-dto";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postsDTO: PostDTO[] = [];
  constructor(private postsService: PostsService) {
  }
  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe({
      next: (response) => {
        console.log("success : ", response);
        this.postsDTO = response;
      },
      error: (response) => {
        console.log("error : ", response);
      }
    });
  }
}
