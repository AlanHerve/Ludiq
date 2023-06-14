import {Component, Input, OnInit} from '@angular/core';
import {HobbyFlashcardDTO} from "../../../models/hobby-flashcard-dto";
import {HobbyService} from "../../../services/hobby.service";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-hobby-flashcard',
  templateUrl: './hobby-flashcard.component.html',
  styleUrls: ['./hobby-flashcard.component.css']
})
export class HobbyFlashcardComponent implements OnInit {
  @Input() hobbyPost!: HobbyFlashcardDTO;
  protected hobbyDTO!: HobbyDTO;

  protected clicked: boolean = false;

  constructor(private hobbyService: HobbyService) {
  }

  ngOnInit(): void {
    this.hobbyService.findHobbyById(this.hobbyPost.id_hobby).subscribe({
      next: (hobby) => {
        this.hobbyDTO = hobby;
      },
      error: (error) => {
        console.log("Error while trying to find hobbyDTO on hobby flashcard : ", error)
      }
    })
  }

  onClick(): void {
    this.clicked = !this.clicked;
  }

  isOwner(): boolean{
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id) == this.hobbyPost.id_user;
  }

  onClose() {
    this.hobbyService.destroyHobbyPost(this.hobbyPost.id_hobby_post).subscribe({

      next: (response) => {
        // in case of success
        console.log(response);
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get flashcards', error);
      }
    });
  }
}
