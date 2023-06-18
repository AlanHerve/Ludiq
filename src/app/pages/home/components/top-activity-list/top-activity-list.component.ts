import {Component, OnInit} from '@angular/core';
import {ActivityDTO} from "../../../../posts/models/activity-dto";
import {ActivityService} from "../../../../posts/services/activity.service";

@Component({
  selector: 'app-top-activity-list',
  templateUrl: './top-activity-list.component.html',
  styleUrls: ['./top-activity-list.component.css']
})
/**
 * Class that represents a list of activities on trends
 */
export class TopActivityListComponent implements OnInit {
  activitiesDTO: ActivityDTO[] = [];
  constructor(private activityService: ActivityService) {
  }
  ngOnInit(): void {
    // We load the top 3 activities
    this.activityService.getTop3Activities().subscribe({
      next: (response) => {
        // We stock them into the activities array
        this.activitiesDTO = response;
      },
      error: (error) => {
        console.log("Error while loading TOP 3 activies : ", error);
      }
    })
  }



}
