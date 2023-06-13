import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private tabChangeSource = new Subject<string>();
  tabChange$ = this.tabChangeSource.asObservable();

  emitTabChange(tab: string) {
    this.tabChangeSource.next(tab);
  }

}
