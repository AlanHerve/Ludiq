import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tests';
  buttonRegister: boolean = false;
  buttonLogin: boolean = false;

  ngOnInit(): void {
  }

  onRegister(): void {
    this.buttonRegister = true;
  }
  onLogin(): void {
    this.buttonLogin = true;
  }


}
