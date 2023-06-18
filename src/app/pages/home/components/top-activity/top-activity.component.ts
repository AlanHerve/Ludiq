import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../../../posts/models/activity-dto";
import {ActivityComponent} from "../../../activity/components/activity.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-activity',
  templateUrl: './top-activity.component.html',
  styleUrls: ['./top-activity.component.css']
})
/**
 * Class that corresponds to a top activity (on trends)
 */
export class TopActivityComponent implements OnInit{

  constructor(private router: Router) {
  }

  // A top activity component owns an activityDTO
  @Input() activityDTO!: ActivityDTO;

  ngOnInit(): void {
  }

  /**
   * Method that redirects the user to the page of the activity
   */
  onActivityClicked(): void {
    // When the top activity is clicked, we need to redirect the user to the page of the activity
    this.router.navigateByUrl(`activity/${this.activityDTO.id}`)
  }

}
