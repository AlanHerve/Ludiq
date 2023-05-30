import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import { FormService } from 'src/app/form.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css', '../../pages.css']
})
export class HubComponent implements OnInit {
  constructor(private router: Router,
              private formService: FormService) {
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
}
