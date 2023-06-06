import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements  OnInit{

  public id: number;
  constructor(private router: Router, private userService: UserService) {
    this.id = this.userService.getCurrentId();
  }
  ngOnInit(): void {
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
