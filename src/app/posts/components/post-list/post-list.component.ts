import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() postsDTO: PostDTO[] = [];

  constructor(private postsService: PostService) {
  }

  ngOnInit(): void {
  }

}
