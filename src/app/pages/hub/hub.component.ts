import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css', '../pages.css']
})
export class HubComponent {
  buttonRegister: boolean = false;
  buttonLogin: boolean = false;

  @Output("login") loginEventHome: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.buttonRegister = false;
    this.buttonLogin = false;
  }
  onRegister(): void {
    this.buttonRegister = true;
  }
  onLogin(): void {
    this.buttonLogin = true;
  }

  loginEvent(): void{
    //this.onClose();
    console.log("event called");
    this.router.navigateByUrl('blank');
    //this.loginEventHome.emit();
  }
}
