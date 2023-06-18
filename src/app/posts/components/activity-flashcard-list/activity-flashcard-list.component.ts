import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../models/activity-dto";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-activity-flashcard-list',
  templateUrl: './activity-flashcard-list.component.html',
  styleUrls: ['./activity-flashcard-list.component.css']
})
/**
 * components used to store and display activity flaschards
 */
export class ActivityFlashcardListComponent implements OnInit {
  @Input() activitiesDTO: ActivityDTO[] = [];

  constructor(private activityService: ActivityService) {

    //subscribe to an observer to see if an activity needs to be deleted from the view
    this.activityService.currentDeleteState.subscribe({
      next: (response) => {
        let index_remove:number;
        //checks if the activity to remove is really in this list
        if((index_remove = this.findActivityIndexByID(response))!=-1){
          this.activitiesDTO.splice(index_remove, 1);
        }
      },
      error: (error) => {
        console.error("Could not delete activity flashcard", error);
      }
    });
  }

  ngOnInit(): void {
  }

  /**
   * find the index of the activity to remove depending on its ID
   * @param id_activity
   */
  findActivityIndexByID(id_activity: number){

    let i = 0;

    while (this.activitiesDTO[i].id != id_activity){
      i++;
      if(i == this.activitiesDTO.length){
        i = -1;
        break;
      }
    }

    return i;
  }
}
