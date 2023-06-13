import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HobbyDTO} from "../../../models/hobby-dto";

@Component({
  selector: 'app-hobby-button',
  templateUrl: './hobby-button.component.html',
  styleUrls: ['./hobby-button.component.css']
})
export class HobbyButtonComponent implements OnInit{
  @Input() hobbyDTO!: HobbyDTO;

  constructor(private router: Router) {  }

  onClick(): void {
    this.router.navigateByUrl(`home/hobby/${this.hobbyDTO.id}`)
  }

  ngOnInit(): void {
  }


}
