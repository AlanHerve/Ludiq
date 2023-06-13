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
  }

}
