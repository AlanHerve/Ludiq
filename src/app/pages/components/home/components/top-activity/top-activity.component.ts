import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../../../../posts/models/activity-dto";

@Component({
  selector: 'app-top-activity',
  templateUrl: './top-activity.component.html',
  styleUrls: ['./top-activity.component.css']
})
export class TopActivityComponent implements OnInit{

  @Input() activityDTO!: ActivityDTO;

  ngOnInit(): void {
  }

}
