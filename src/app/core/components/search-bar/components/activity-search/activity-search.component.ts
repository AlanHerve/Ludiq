import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../../../../posts/models/activity-dto";

@Component({
  selector: 'app-activity-search',
  templateUrl: './activity-search.component.html',
  styleUrls: ['./activity-search.component.css']
})
export class ActivitySearchComponent implements OnInit {
  @Input() activityDTO!: ActivityDTO;
  ngOnInit(): void {
  }


}
