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

  private id_user: number = 0;
  @Input() hobbyFlashcardsDTO!: HobbyFlashcardDTO[];

  @Input() hobbyDTOs!: HobbyDTO[];

    constructor(private hobbyService:HobbyService, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => {
        this.id_user = parseInt(params['id']);
      });

      console.log("list");


    }

    addElementToArray(hobbyFlashcard: HobbyFlashcardDTO){
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
