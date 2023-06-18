import {Component, Input, OnInit} from '@angular/core';
import {HobbyService} from "../../../services/hobby.service";
import {ActivatedRoute} from "@angular/router";
import {HobbyFlashcardDTO} from "../../../models/hobby-flashcard-dto";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-hobby-flashcard-list',
  templateUrl: './hobby-flashcard-list.component.html',
  styleUrls: ['./hobby-flashcard-list.component.css']
})
/**
 * class to contain all the hobby flashcards of a user
 */
export class HobbyFlashcardListComponent implements OnInit {

  //store informations of theflaschard
  @Input() hobbyFlashcardsDTO!: HobbyFlashcardDTO[];
  //store informations of the hobbies
  @Input() hobbyDTOs!: HobbyDTO[];
  private id_user: number = 0;

  constructor(private hobbyService: HobbyService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.id_user = parseInt(params['id']);
    });

    //subscribe to an observer to know when a hobby flashcard has been deleted
    this.hobbyService.currentDeleteState.subscribe({
      next: (response) => {
        // in case of success
        let index_to_remove: number;
        //checks if flashcard to be removed exists in the list
        if ((index_to_remove = this.findIndexByIDHobbyPost(response)) != -1) {
            this.hobbyFlashcardsDTO.splice(index_to_remove, 1);
            this.hobbyDTOs.splice(index_to_remove, 1);
        }

      },
      error: (error) => {
        // in case of failure
        console.error('Could not delete flashcards', error);
      }
    });

    //subscribe to an observer to know when a hobby flashcard has been added
    this.hobbyService.currentNeedToAddHobby.subscribe({
      next: (init_response) => {
        //get information of the hobby in the hobby flashcard (especially the image)
        this.hobbyService.getHobbyById(init_response.id_hobby).subscribe({
          next: (response) => {
            this.hobbyDTOs.push(response);
            this.hobbyFlashcardsDTO.push(init_response);
          }
        });
      }
    });
  }

  //find the index of a hobby flashcard needing to be removed depending of its id
  findIndexByIDHobbyPost(id_hobby_post: number): number {
    let i = 0;
    while (this.hobbyFlashcardsDTO[i].id_hobby_post != id_hobby_post) {
      i++;
      if (i == this.hobbyFlashcardsDTO.length) {
        i = -1;
        break;
      }
    }

    return i;

  }

  ngOnInit(): void {
    console.log("ONINIT");
    for (let i = 0; i < this.hobbyDTOs.length; i++) {
      console.log(this.hobbyDTOs[i]);
    }
  }
}
