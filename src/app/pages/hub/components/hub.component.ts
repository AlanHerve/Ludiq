import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {FormService} from "../../../form.service";

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css', '../../pages.css']
})
export class HubComponent implements OnInit {
  protected currentMonth;
  constructor(private router: Router,
              private formService: FormService,
              private userService: UserService) {
    this.currentMonth = new Date().getMonth() + 1;
  }

  // We need to check if the user is logged in or not
  ngOnInit(): void {
    this.formService.isOpen = false;
  }

  // We need to redirect the user to the register page
  onRegister(): void {
    this.router.navigateByUrl('hub/register');
  }

  // We need to redirect the user to the login page
  onLogin(): void {
    this.router.navigateByUrl('hub/login');
  }

  // We need to redirect the user to the home page
  onLogout(): void {
    this.userService.logoutUser();
  }

  // We need to check if the user is logged in or not
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  // We need to redirect the user to the home page
  onHome(): void {
    this.router.navigateByUrl('/home');
  }
}
