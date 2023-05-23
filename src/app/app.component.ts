
import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ludiq';
  buttonRegister: boolean = false;
  buttonLogin: boolean = false;

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
}
