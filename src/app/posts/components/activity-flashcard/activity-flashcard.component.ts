import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../models/activity-dto";
import {Router} from "@angular/router";

import {UserService} from "../../../services/user.service";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-activity-flashcard',
  templateUrl: './activity-flashcard.component.html',
  styleUrls: ['./activity-flashcard.component.css']
})
export class ActivityFlashcardComponent implements OnInit {

  @Input() activityDTO!: ActivityDTO;

  constructor(private router: Router, private userService: UserService, private activityService: ActivityService) {

  }
  ngOnInit(): void {
  }

  onActivityClicked(): void {
    this.router.navigateByUrl(`/activity/${this.activityDTO.id}`)
  }

  isAble(): boolean {
    return this.userService.isAbleToDelete(this.activityDTO.userDTO.id);
  }

  onDelete() {
    this.activityService.deleteActivity(this.activityDTO.id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error("could not delete activity flashcard", error);
      }
    });
  }
}
