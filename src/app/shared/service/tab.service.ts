import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  // Creation of a Subject to handle tab change events
  private tabChangeSource = new Subject<string>();
  // Observable that send information when the user changes the tab of the binder
  tabChange$ = this.tabChangeSource.asObservable();

  /**
   *
   *   Method to emit a tab change event with the provided tab value
   *
   */
  emitTabChange(tab: string) {
    this.tabChangeSource.next(tab);
  }

}
