import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  isOpen = false;
  toggleForm() {
    console.log(this.isOpen, "toggle service 1");
    this.isOpen = !this.isOpen;
    console.log(this.isOpen,"toggle 2 form du service");
  }
}
