import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../models/activity-dto";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input() activityDTO!: ActivityDTO;

  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
  }

  onActivityClicked(): void {
    this.router.navigateByUrl(`activity/${this.activityDTO.id}`)
  }



}
