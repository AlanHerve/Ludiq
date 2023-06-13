import {Component, Input, OnInit} from '@angular/core';
import {HobbyCountDTO} from "../../../models/hobby-count-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hobby-count-button',
  templateUrl: './hobby-count-button.component.html',
  styleUrls: ['./hobby-count-button.component.css']
})
export class HobbyCountButtonComponent implements OnInit {
  @Input() hobbyCountDTO!: HobbyCountDTO;

  constructor(private router: Router) {  }

  onClick(): void {
    this.router.navigateByUrl(`home/hobby/${this.hobbyCountDTO.hobbyDTO.id}`)
  }

  ngOnInit(): void {
  }

}
