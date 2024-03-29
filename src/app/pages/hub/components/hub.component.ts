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

  ngOnInit(): void {
    this.formService.isOpen = false;
  }

  onRegister(): void {
    this.router.navigateByUrl('hub/register');
  }
  onLogin(): void {
    this.router.navigateByUrl('hub/login');
  }

  onLogout(): void {
    this.userService.logoutUser();
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  onHome(): void {
    this.router.navigateByUrl('/home');
  }
}
