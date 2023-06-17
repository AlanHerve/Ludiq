import {Component, Input, OnInit} from '@angular/core';
import {ActivityParticipantsDTO} from "../../../pages/activity/models/activity-participants-dto";

@Component({
  selector: 'app-activity-participants-list',
  templateUrl: './activity-participants-list.component.html',
  styleUrls: ['./activity-participants-list.component.css']
})
export class ActivityParticipantsListComponent implements OnInit {
  @Input() activityParticipants!: ActivityParticipantsDTO;

  ngOnInit(): void {

  }

}
