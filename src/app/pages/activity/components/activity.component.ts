import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityDTO} from "../../../posts/models/activity-dto";
import {ActivityService} from "../../../posts/services/activity.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css', '../../pages.css']
})
export class ActivityComponent implements OnInit{
  protected activityDTO!: ActivityDTO;
  constructor(private activatedRoute: ActivatedRoute,
              private activityService: ActivityService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.activityService.findActivityById(parseInt(params['id'])).subscribe({
        next: (response) => {
          if(!response) this.router.navigateByUrl('/home');
          this.activityDTO = response;
        },
        error: (error) => {
          console.log("Error while finding the activity : ", error)
        }
      });
    });
  }
}
