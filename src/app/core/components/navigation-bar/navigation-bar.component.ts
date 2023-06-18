import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
/**
 * CLass that represents the component of the navigation bar at the left of the website
 */
export class NavigationBarComponent implements  OnInit{

  public id: number;
  protected currentMonth!: number;
  constructor(private router: Router, private userService: UserService) {
    this.id = this.userService.getCurrentId();

    // Getting the current month, in order to display the pride month if the month is equal the juin (=7)
    this.currentMonth = new Date().getMonth() + 1;
  }
  ngOnInit(): void {
  }

  /**
   * Method that displays the new post form when clicking on the button of creating a new post
   */
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
