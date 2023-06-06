import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
  }

  likePost() {
    this.isLiked = !this.isLiked;
    this.postLiked.emit(this.postDTO);
    if (this.isLiked) {
      this.postDTO.likes++;
    } else {
      this.postDTO.likes--;
    }
  }

  addComment() {
    if (this.newComment.trim() !== '') {
      this.postDTO.comments.push(this.newComment);
      this.newComment = '';
    }
    this.showCommentBox = false;
  }

  ngOnInit(): void {
  }

  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  onUserClicked(): void {
    this.router.navigateByUrl('profile/'+this.postDTO.userDTO.id);
  }
}
