import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../models/activity-dto";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-activity-flashcard',
  templateUrl: './activity-flashcard.component.html',
  styleUrls: ['./activity-flashcard.component.css']
})
export class ActivityFlashcardComponent implements OnInit {

  @Input() activityDTO!: ActivityDTO;

  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
  }

  onActivityClicked(): void {
    this.router.navigateByUrl(`/activity/${this.activityDTO.id}`)
  }


  isAble(): boolean {
    return true;
  }

}
