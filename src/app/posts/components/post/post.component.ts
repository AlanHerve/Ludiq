import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postDTO!: PostDTO;
  @Output() postLiked: EventEmitter<PostDTO> = new EventEmitter<PostDTO>();

  likePost() {
    //this.postLiked.emit(this.postDTO);
  }

  ngOnInit(): void {
  }

  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

}
