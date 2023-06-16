import {Component, OnInit} from '@angular/core';
import {PostDTO} from "../../../posts/models/post-dto";
import {PostService} from "../../../posts/services/post.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ActivityDTO} from "../../../posts/models/activity-dto";
import {ActivityService} from "../../../posts/services/activity.service";
import {TabService} from "../../../shared/service/tab.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../pages.css']
})
export class HomeComponent implements OnInit {
  postsDTO: PostDTO[] = [];
  activitiesDTO: ActivityDTO[] = [];
  protected type: string = 'posts';
  protected id_hobby!: number;

  constructor(private postsService: PostService,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private activityService: ActivityService,
              private tabService: TabService) {
    this.tabService.tabChange$.subscribe(tab => {
      this.onTabChange(tab);
    });
  }

  ngOnInit(): void {
    this.displayPosts();
    this.getAllActivities();
  }

  onTabChange(tab: string): void {
    this.type = tab.toLowerCase();
  }

  getAllActivities(): void {
    this.activityService.getAllActivites().subscribe({
      next: (response) => {
        this.activitiesDTO = response;
        console.log("Successfully got all activities :", response)
      },
      error: (error) => {
        console.log("Error while trying to find all activities : ", error)
      }
    })
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

  displayAllPosts(): void {
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
