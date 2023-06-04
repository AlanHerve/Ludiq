import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PostDTO } from "../../models/post-dto";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postDTO!: PostDTO;
  @Output() postLiked: EventEmitter<PostDTO> = new EventEmitter<PostDTO>();
  isLiked: boolean = false;

  likePost() {
    this.isLiked = !this.isLiked;
    this.postLiked.emit(this.postDTO);
    if (this.isLiked) {
      this.postDTO.likes++;
    } else {
      this.postDTO.likes--;
    }
  }

  ngOnInit(): void {
  }

  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }
}
