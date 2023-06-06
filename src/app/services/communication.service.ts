import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() {
  }

  changeMessage(message: string){
    this.messageSource.next(message);
  }

}
