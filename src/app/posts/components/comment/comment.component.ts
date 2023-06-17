import {Component, Input, OnInit} from '@angular/core';
import {CommentDTO} from "../../models/comment-dto";
import {Image} from "../../../models/image";
import {imagesUrl} from "../../../services/urls";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css', '../post/post.component.css']
})
export class CommentComponent implements OnInit, Image {
  @Input() commentDTO!: CommentDTO

  constructor(private router: Router) {
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

}
