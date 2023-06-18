import {Component, Input, OnInit} from '@angular/core';
import {HobbyFlashcardDTO} from "../../../models/hobby-flashcard-dto";
import {HobbyService} from "../../../services/hobby.service";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-hobby-flashcard',
  templateUrl: './hobby-flashcard.component.html',
  styleUrls: ['./hobby-flashcard.component.css']
})
/**
 * component containing :
 * - name of a hobby
 * - advancement or experience in that hobby
 * - if user would be available to take part in this hobby with others
 * - the frequency at which a user take part in the hobby
 *
 * allows user to add hobbies in his bio
 */
export class HobbyFlashcardComponent implements OnInit {

  //DTO to store informations of a hobby flashcard
  @Input() hobbyPost!: HobbyFlashcardDTO;

  //DTO to store the informations of a hobby (id, name, image)
  @Input() hobbyDTO!: HobbyDTO;

  protected clicked: boolean = false;

  constructor(private hobbyService: HobbyService) {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clicked = !this.clicked;
  }

  /**
   * checks if user is owner of the flashcard
   */
  isOwner(): boolean{
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id) == this.hobbyPost.id_user;
  }

  /**
   * When flashcard is deleted
   */
  onDelete() {
    this.hobbyService.destroyHobbyPost(this.hobbyPost.id_hobby_post).subscribe({
      next: (response) => {
        // in case of success

      },
      error: (error) => {
        // in case of failure
        console.error('Could not get flashcards', error);
      }
    });
  }
}
