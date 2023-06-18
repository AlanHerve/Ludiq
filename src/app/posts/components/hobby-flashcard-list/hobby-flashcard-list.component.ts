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
export class HobbyFlashcardListComponent implements OnInit {

  @Input() hobbyFlashcardsDTO!: HobbyFlashcardDTO[];
  @Input() hobbyDTOs!: HobbyDTO[];
  private id_user: number = 0;

  constructor(private hobbyService: HobbyService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.id_user = parseInt(params['id']);
    });

    this.hobbyService.currentDeleteState.subscribe({
      next: (response) => {
        // in case of success
        let index_to_remove: number;
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

    this.hobbyService.currentNeedToAddHobby.subscribe({
      next: (init_response) => {
        this.hobbyService.getHobbyById(init_response.id_hobby).subscribe({
          next: (response) => {

            this.hobbyDTOs.push(response);
            this.hobbyFlashcardsDTO.push(init_response);
          }
        });
      }
    });
  }

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

  addElementToArray(hobbyFlashcard: HobbyFlashcardDTO) {
    console.log("adding");
    this.hobbyFlashcardsDTO.push(hobbyFlashcard);
  }

  ngOnInit(): void {
    console.log("ONINIT");
    for (let i = 0; i < this.hobbyDTOs.length; i++) {
      console.log(this.hobbyDTOs[i]);
    }
  }
}
