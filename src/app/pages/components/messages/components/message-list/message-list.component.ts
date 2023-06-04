import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageDTO} from "../../models/message-dto";
import {MessageService} from "../../services/message.service";
import {UserDTO} from "../../../../../models/user-dto";
import {Observable, Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messagesDTO: MessageDTO[] = [];
  id_friend!: number;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private messageService: MessageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (typeof id === "string") {
        this.id_friend = parseInt(id, 10);
      }
    });
    // We call this function one time in order to display the messages the first time we navigate to this page
    this.refreshMessageList();

    // We add an Observable in order to observe if there are new messages, to display them without refreshing the window
    this.messageService
      .getMessageListUpdates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.refreshMessageList();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  refreshMessageList(): void {
    let user = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.messageService
      .getMessagesBetweenUsers(user, this.id_friend)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response: MessageDTO[]) => {
          console.log('success:', response);
          this.messagesDTO = response;
        },
        error: (error) => {
          console.log('error:', error);
        }
      });
  }

}
