// Import necessary modules and interfaces
import {Component, Input, OnInit} from '@angular/core';
import {CommentDTO} from "../../models/comment-dto";
import {Image} from "../../../models/image";
import {imagesUrl} from "../../../services/urls";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

/*
CommentComponent is a component to display comments.
It is used to handle all the functionalities for a comment.
*/
@Component({
  // The name of the component that will be used in the templates
  selector: 'app-comment',
  // Link to the HTML template for this component
  templateUrl: './comment.component.html',
  // Link to the CSS styles for this component
  styleUrls: ['./comment.component.css', '../post/post.component.css']
})
export class CommentComponent implements OnInit, Image {
  // Input property to get the Comment data from the parent component
  @Input() commentDTO!: CommentDTO

  // Constructor for the component. It injects two services: Router and PostService
  constructor(private router: Router, private postService: PostService) {
  }

  // ngOnInit method gets called once, immediately after the default constructor, when Angular finishes initializing the component
  ngOnInit(): void {
  }

  // Method to load the image
  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

  // Method to handle the event when a user is clicked
  onUserClicked(): void {
    this.router.navigateByUrl(`/profile/${this.commentDTO.userDTO.id}`)
  }

  // Method to handle the event when a comment is deleted
  onDelete() {
    this.postService.deleteComment(this.commentDTO.id).subscribe({
      error: (error) => {
        console.error("error deleting comment ", error);
      }
    });
  }

  // Method to check if the current user is the owner of the comment
  isOwner(): boolean {
    return this.commentDTO.userDTO.id == JSON.parse(localStorage.getItem('currentUser')!).id;
  }
}
