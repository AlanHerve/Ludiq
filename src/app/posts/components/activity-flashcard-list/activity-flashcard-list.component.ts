import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../models/activity-dto";

@Component({
  selector: 'app-activity-flashcard-list',
  templateUrl: './activity-flashcard-list.component.html',
  styleUrls: ['./activity-flashcard-list.component.css']
})
export class ActivityFlashcardListComponent implements OnInit {
  @Input() activitiesDTO: ActivityDTO[] = [];

  constructor() {

  }
  ngOnInit(): void {
  }
}
