import {Component, Input, OnInit} from '@angular/core';
import {CommentDTO} from "../../models/comment-dto";
import {Image} from "../../../models/image";
import {imagesUrl} from "../../../services/urls";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css', '../post/post.component.css']
})
export class CommentComponent implements OnInit, Image {
  @Input() commentDTO!: CommentDTO

  constructor(private router: Router, private postService: PostService) {
  }

  ngOnInit(): void {
  }

  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

  onUserClicked(): void {
    this.router.navigateByUrl(`/profile/${this.commentDTO.userDTO.id}`)
  }

  onDeleteComment(): void {

  }

  onDelete() {
    this.postService.deleteComment(this.commentDTO.id).subscribe({
      error: (error) => {
        console.error("error deleting comment ", error);
      }
    });
  }

  isOwner(): boolean {
    return this.commentDTO.userDTO.id == JSON.parse(localStorage.getItem('currentUser')!).id;
  }
}
