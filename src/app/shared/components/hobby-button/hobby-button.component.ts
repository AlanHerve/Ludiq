import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-hobby-button',
  templateUrl: './hobby-button.component.html',
  styleUrls: ['./hobby-button.component.css']
})
/**
 * Class that represents the button of a hobby
 */
export class HobbyButtonComponent implements OnInit{
  // Input of the hobby stocked on this component
  @Input() hobbyDTO!: HobbyDTO;

  constructor(private router: Router) {  }

  /**
   * Method that redirects the user to the section of the hobby when the user clicks on the button
   */
  onClick(): void {
    this.router.navigateByUrl(`home/hobby/${this.hobbyDTO.id}`)
  }

  ngOnInit(): void {
  }


}
