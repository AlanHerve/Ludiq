import {Component, Input, OnInit} from '@angular/core';
import {ActivityParticipantsDTO} from "../../../pages/activity/models/activity-participants-dto";

@Component({
  selector: 'app-activity-participants-list',
  templateUrl: './activity-participants-list.component.html',
  styleUrls: ['./activity-participants-list.component.css']
})
/**
 * Class that represents a component for displaying the participants of an activity
 */
export class ActivityParticipantsListComponent implements OnInit {
  // We stock the activity participants
  @Input() activityParticipants!: ActivityParticipantsDTO;

  ngOnInit(): void {

  }

}
