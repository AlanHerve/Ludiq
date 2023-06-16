import {Component, Input, OnInit} from '@angular/core';
import {PostDTO} from "../../../../../posts/models/post-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @Input() postDTO!: PostDTO;
  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  onPostClicked(): void {
    this.router.navigateByUrl(`post/${this.postDTO.id}`)
  }

}
