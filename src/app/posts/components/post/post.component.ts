import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {PostDTO} from "../../models/post-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {UserService} from "../../../services/user.service";
import {CommentDTO} from "../../models/comment-dto";
import {imagesUrl} from "../../../services/urls";
import {Image} from "../../../models/image";
import {Location} from "@angular/common";


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
  protected detailedPost: boolean = false;

  protected commentsDTO: CommentDTO[] = [];


  constructor(private userService: UserService,
              private router: Router,
              private postService: PostService,
              private location: Location) {
  }

  ngOnInit(): void {

    this.determineDetailedPostOrNot();

    this.postService.hasLiked(this.postDTO.id).subscribe(hasLiked => {
      this.isLiked = hasLiked;
      console.log("Has liked : " + hasLiked);
    });
  }

  /**
   * Function that checks if the user is currently reading a post on a detailed post page or not
   *
   * @private
   */
  private determineDetailedPostOrNot(): void {
    /*
    Creation of a pattern that checks if there is "post" at the location of the user on the current route
     */
    const pattern = /post/;
    /*
    We take the url that the user is currently on
     */
    const url = this.location.path();

    /*
    We test the pattern in order to check if this is a detailed post or not
     */
    this.detailedPost = pattern.test(url);

    /*
    If this is a detailed post, we need to display all the comments of the post
     */
    if(this.detailedPost) {
      this.getAllComments()
    }
    /*
    However, if the user is only reading the post on home/a profile... we only display 3 comments
     */
    else {
      this.getThreeComments()
    }
  }

  /**
   * Method implemented by the interface Image in order to load an image from the imagesURL path
   *
   * @param image
   */
  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

  // Method to toggle the comment box visibility
  onCommentClicked(): void {
    this.showCommentBox = !this.showCommentBox;
  }

  // Method to navigate to post details
  onPostClicked(): void {
    this.router.navigateByUrl(`/post/${this.postDTO.id}`)
  }

  // Method to navigate to the user's profile
  onUserClicked(): void {
    this.router.navigateByUrl('profile/' + this.postDTO.userDTO.id);
  }

  // Method to like or unlike the post
  likePost() {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.postService.likePost(this.postDTO.id,  this.userService.getCurrentId()).subscribe(() => {
        this.postDTO.likes++;
      });
    } else {
      this.postService.unlikePost(this.postDTO.id, this.userService.getCurrentId()).subscribe(() => {
        this.postDTO.likes--;
      });
    }
  }

  // Method to get the first three comments
  private getThreeComments(): void {
    this.postService.getThreeComments(this.postDTO.id).subscribe({
      next: (comments) => {
        this.commentsDTO = comments;
      },
      error: (error) => {
        console.log("Error while finding all comments of post : " + this.postDTO.id, ". Error : ", error)
      }
    })
  }

  // Method to get all comments
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

  // Method to check if the current user is the post's owner
  isOwner(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser')!).id;
    return user == this.postDTO.userDTO.id;
  }

  // Method to delete the post
  onDelete(): void {
    console.log("attempting delete");
    this.postService.deletePost(this.postDTO.id).subscribe({
      next: (response) => {

      },
      error: (error) => {
        console.error("could not delete post", error);
      }
    });
  }
}
