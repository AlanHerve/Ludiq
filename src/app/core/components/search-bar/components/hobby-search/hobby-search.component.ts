import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HobbyDTO} from "../../../../../models/hobby-dto";

@Component({
  selector: 'app-hobby-search',
  templateUrl: './hobby-search.component.html',
  styleUrls: ['./hobby-search.component.css']
})
export class HobbySearchComponent implements OnInit {

  @Input() hobbyDTO!: HobbyDTO;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onHobbyClicked(): void {
    this.router.navigateByUrl(`/home/hobby/${this.hobbyDTO.id}`);
  }
}
