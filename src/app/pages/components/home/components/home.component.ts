import {Component, OnInit} from '@angular/core';
import {PostDTO} from "../../../../posts/models/post-dto";
import {PostsService} from "../../../../posts/services/posts.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ActivityDTO} from "../../../../posts/models/activity-dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../pages.css']
})
export class HomeComponent implements OnInit {
  postsDTO: PostDTO[] = [];
  activitiesDTO: ActivityDTO[] = [];
  protected type: string = 'posts';
  protected id_hobby!: number;

  constructor(private postsService: PostsService,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.displayPosts();

  }

  displayPosts(): void {
    if (this.location.path() == '/home') {
      this.displayAllPosts();
    } else {
      this.findHobbyId();
      this.displayHobbyPosts();
    }
  }

  findHobbyId(): void {
    this.activatedRoute.paramMap.subscribe(params => {
        const id = params.get('id');
        if (!id) return;
        this.id_hobby = parseInt(id);
      }
    );
  }

  onSwitchTo(type: string): void {
    this.type = type;
  }

  displayAllPosts() : void {
    this.postsService.getAllPosts().subscribe({
      next: (response: PostDTO[]) => {
        console.log('success while finding all posts :', response);
        this.postsDTO = response;
      },
      error: (error) => {
        console.log('error:', error);
      }
    });
  }

  displayHobbyPosts() {
    this.postsService.getHobbyPosts(this.id_hobby).subscribe({
      next: (response: PostDTO[]) => {
        console.log("successfully finded all hobbies posts : ", response);
        this.postsDTO = response;
      },
      error: (error) => {
        console.log('error:', error);
      }
    })
  }



}
