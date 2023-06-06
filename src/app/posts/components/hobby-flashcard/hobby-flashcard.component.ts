import {Component, Input, OnInit} from '@angular/core';
import {HobbyPostDTO} from "../../../models/hobby-post-dto";

@Component({
  selector: 'app-hobby-flashcard',
  templateUrl: './hobby-flashcard.component.html',
  styleUrls: ['./hobby-flashcard.component.css']
})
export class HobbyFlashcardComponent implements OnInit {

  @Input() hobbyPost!: HobbyPostDTO;

  protected clicked: boolean = false;

  ngOnInit(): void {
  }

  onClick(): void {
    this.clicked = !this.clicked;
  }

}
