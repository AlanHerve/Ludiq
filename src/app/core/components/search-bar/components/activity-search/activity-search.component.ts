import {Component, Input, OnInit} from '@angular/core';
import {ActivityDTO} from "../../../../../posts/models/activity-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activity-search',
  templateUrl: './activity-search.component.html',
  styleUrls: ['./activity-search.component.css']
})
export class ActivitySearchComponent implements OnInit {
  @Input() activityDTO!: ActivityDTO;

  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  onActivityClicked(): void {
    this.router.navigateByUrl(`activity/${this.activityDTO.id}`)
  }

}
