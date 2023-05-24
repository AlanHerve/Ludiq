import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css', '../../pages.css']
})
export class HubComponent implements OnInit {


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.router.navigateByUrl('hub/register');
  }
  onLogin(): void {
    this.router.navigateByUrl('hub/login');
  }
}
