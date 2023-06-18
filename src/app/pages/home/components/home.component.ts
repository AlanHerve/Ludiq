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
/**
 * Class that represents the component of the home
 */
export class HomeComponent implements OnInit {
  // The home has a list of posts and a list of activities
  postsDTO: PostDTO[] = [];
  activitiesDTO: ActivityDTO[] = [];
  protected type: string = 'posts';
  protected id_hobby!: number;

  constructor(private postsService: PostService,
              private location: Location,
              private activityService: ActivityService,
              private tabService: TabService,
              private activatedRoute: ActivatedRoute) {
    this.tabService.tabChange$.subscribe(tab => {
      this.onTabChange(tab);
    });
  }

  ngOnInit(): void {
    // We display all the content
    this.displayContent();
  }

  /**
   * Method that changes the tab by clicking on a new one on the binder
   * @param tab
   */
  onTabChange(tab: string): void {
    this.type = tab.toLowerCase();
  }

  /**
   * Method that displays all activities on home
   */
  displayAllActivities(): void {
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

  /**
   * Method that displays all activities in relation to a certain hobby
   * @param id
   */
  displayHobbyActivities(id: number): void {
    this.activityService.getHobbyActivities(id).subscribe({
      next: (response) => {
        this.activitiesDTO = response;
        console.log("Got all related Activities", response)
      },
      error: (error) => {
        console.log("Error while trying to find related activities:", error)
      }
    })
  }

  /**
   * Method that display the content, depending to the location on the website
   */
  displayContent(): void {
    if (this.location.path() == '/home') {
      this.displayAllPosts();
      this.displayAllActivities()
    } else {
      this.findHobbyId();
      this.displayHobbyPosts();
    }
  }

  /**
   * Method that find the id of a hobby thanks to the current route
   */
  findHobbyId(): void {
    this.activatedRoute.paramMap.subscribe(params => {
        const id = params.get('id');
        // If the id is null, it means that we are on /home, so we don't need to display hobby activities
        if (!id) return;
        else {
          this.id_hobby = parseInt(id);
          // Otherwise, we display them
          this.displayHobbyActivities(this.id_hobby)
        }
      }
    );
  }

  /**
   * Method that displays all posts on home
   */
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

  /**
   * Method that displays all posts related to a certain hobby on home
   */
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
