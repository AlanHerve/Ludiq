import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements  OnInit{
  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }


  /**
   * Method that displays a form in order to create a new post
   */
  onClickNewHobbyPost(): void {
    /*
    We determine the route that we are currently on
     */
    const currentRoute = this.router.url;
    /*
    We navigate to the pop-up's route in order to display it
     */
    this.router.navigateByUrl(`${currentRoute}/hobby_post`);
  }
  onClickNewRegularPost(): void {
    /*
    We determine the route that we are currently on
     */
    const currentRoute = this.router.url;
    /*
    We navigate to the pop-up's route in order to display it
     */
    this.router.navigateByUrl(`${currentRoute}/regular_post`);
  }

}
