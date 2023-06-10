import {Component, Input, OnInit} from '@angular/core';
import {PostDTO} from "../../../../../posts/models/post-dto";

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @Input() postDTO!: PostDTO;
  ngOnInit(): void {
  }

  onPostClicked(): void {
    console.log("poney");
  }

}
