import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../models/activity-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input() activityDTO!: ActivityDTO;

  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  onActivityClicked(): void {
    this.router.navigateByUrl(`activity/${this.activityDTO.id}`)
  }


}
