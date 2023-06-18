import {Component, OnInit} from '@angular/core';
import {PostDTO} from "../../../posts/models/post-dto";
import {PostService} from "../../../posts/services/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../pages.css']
})
export class HomeComponent implements OnInit {
  postsDTO: PostDTO[] = [];
  constructor(private postsService: PostService) {
  }
  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe({
      next: (response: PostDTO[]) => {
        console.log('success:', response);
        this.postsDTO = response;
      },
      error: (error) => {
        console.log('error:', error);
      }
    });

  }


}
