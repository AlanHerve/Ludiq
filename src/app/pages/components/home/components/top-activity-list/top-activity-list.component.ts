import {Component, OnInit} from '@angular/core';
import {ActivityDTO} from "../../../../../posts/models/activity-dto";
import {ActivityService} from "../../../../../posts/services/activity.service";

@Component({
  selector: 'app-top-activity-list',
  templateUrl: './top-activity-list.component.html',
  styleUrls: ['./top-activity-list.component.css']
})
export class TopActivityListComponent implements OnInit {
  activitiesDTO: ActivityDTO[] = [];
  constructor(private activityService: ActivityService) {
  }
  ngOnInit(): void {
    this.activityService.getTop3Activities().subscribe({
      next: (response) => {
        this.activitiesDTO = response;
        console.log("Loaded TOP 3 activites successfully !");
      },
      error: (error) => {
        console.log("Error while loading TOP 3 activies : ", error);
      }
    })
  }



}
