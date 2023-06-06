import {Component, Input} from '@angular/core';
import {HobbyService} from "../../../services/hobby.service";
import {HobbyFlashcardComponent} from "../hobby-flashcard/hobby-flashcard.component";
import {ActivatedRoute} from "@angular/router";
import {HobbyPostDTO} from "../../../models/hobby-post-dto";

@Component({
  selector: 'app-hobby-flashcard-list',
  templateUrl: './hobby-flashcard-list.component.html',
  styleUrls: ['./hobby-flashcard-list.component.css']
})
export class HobbyFlashcardListComponent {

  private id_user: number = 0;
  public hobby_flashcardsDTOs: HobbyPostDTO[] = [];
    constructor(private hobbyService:HobbyService, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => {
        this.id_user = parseInt(params['id']);
      });

      this.hobbyService.getHobbiesFlashcardsOfUser(this.id_user).subscribe({

        next: (response) => {
          // in case of success
          for (let i = 0; i < response.length; i++) {
            this.hobby_flashcardsDTOs.push(response[i]);
          }
        },
        error: (error) => {
          // in case of failure
          console.error('Could not get flashcards', error);
        }
      });



    }
}
