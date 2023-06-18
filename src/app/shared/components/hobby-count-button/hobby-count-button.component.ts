import {Component, Input, OnInit} from '@angular/core';
import {HobbyCountDTO} from "../../../models/hobby-count-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hobby-count-button',
  templateUrl: './hobby-count-button.component.html',
  styleUrls: ['./hobby-count-button.component.css']
})
/**
 * Component that represents the hobby button on the right of the website on the suggestions
 * It owns a HobbyCountDTO, that is composed of a HobbyDTO and a number, representing the number of users related to this hobby
 */
export class HobbyCountButtonComponent implements OnInit {
  //Input of the hobbyCountDTO stocked on this component :
  @Input() hobbyCountDTO!: HobbyCountDTO;

  constructor(private router: Router) {  }

  /**
   * Method the redirects the user on the section of the hobby when the user clicks on the button
   */
  onClick(): void {
    this.router.navigateByUrl(`home/hobby/${this.hobbyCountDTO.hobbyDTO.id}`)
  }

  ngOnInit(): void {
  }

}
