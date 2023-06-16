import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {UserService} from "../../../services/user.service";
import {CommentDTO} from "../../models/comment-dto";
import {imagesUrl} from "../../../services/urls";
import {Image} from "../../../models/image";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, Image {
  @Input() postDTO!: PostDTO;
  @Output() postLiked: EventEmitter<PostDTO> = new EventEmitter<PostDTO>();
  isLiked: boolean = false;
  showCommentBox: boolean = false;

  protected commentsDTO!: CommentDTO[];


  constructor(private userService: UserService, private router: Router, private postService: PostService) {
  }

  ngOnInit(): void {
    this.getAllComments()
    console.log(this.postDTO.images)
  }

  /**
   * Method implemented by the interface Image in order to load an image from the imagesURL path
   *
   * @param image
   */
  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

  onCommentClicked(): void {
    this.showCommentBox = !this.showCommentBox;
  }

  onPostClicked(): void {
    this.router.navigateByUrl(`/post/${this.postDTO.id}`)
  }

  onUserClicked(): void {
    this.router.navigateByUrl('profile/' + this.postDTO.userDTO.id);
  }

  likePost() {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.postService.likePost(this.postDTO.id).subscribe(() => {
        this.postDTO.likes++;
      });
    } else {
      this.postService.unlikePost(this.postDTO.id).subscribe(() => {
        this.postDTO.likes--;
      });
    }
  }

  onClose() {

  }

  private getThreeComments(): void {

  }

  private getAllComments(): void {
    this.postService.getAllComments(this.postDTO.id).subscribe({
      next: (comments) => {
        this.commentsDTO = comments;
      },
      error: (error) => {
        console.log("Error while finding all comments of post : " + this.postDTO.id, ". Error : ", error)
      }
    })
  }
}
