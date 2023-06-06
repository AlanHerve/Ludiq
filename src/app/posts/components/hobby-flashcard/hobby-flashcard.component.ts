import {Component, Input} from '@angular/core';
import {HobbyPostDTO} from "../../../models/hobby-post-dto";

@Component({
  selector: 'app-hobby-flashcard',
  templateUrl: './hobby-flashcard.component.html',
  styleUrls: ['./hobby-flashcard.component.css']
})
export class HobbyFlashcardComponent {

  @Input() hobbyPost: HobbyPostDTO = {
    id_hobby_post: 0,
    id_user: 0,
    id_hobby: 0,
    advancement: '',
    frequency: '',
    availability: 0
  };


}
