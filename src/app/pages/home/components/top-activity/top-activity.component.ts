import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../../../posts/models/activity-dto";
import {ActivityComponent} from "../../../activity/components/activity.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-activity',
  templateUrl: './top-activity.component.html',
  styleUrls: ['./top-activity.component.css']
})
export class TopActivityComponent implements OnInit{

  constructor(private router: Router) {
  }

  @Input() activityDTO!: ActivityDTO;

  ngOnInit(): void {
  }

  onActivityClicked(): void {
    this.router.navigateByUrl(`activity/${this.activityDTO.id}`)
  }

}
